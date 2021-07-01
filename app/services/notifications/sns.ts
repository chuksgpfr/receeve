import * as AwsSdk from "aws-sdk";
import { MessageType } from "../../models/eventTypes";

class SnsServcie {
  private apiVersion: string;
  private topic: string;

  constructor(apiVersion: string, topic: string, region: string) {
    this.apiVersion = apiVersion;
    this.topic = topic;
    AwsSdk.config.update({ region });
  }

  async notify(message: MessageType) {
    try {
      console.log("SNS  =====> SENDING ");
      const notificationn = new AwsSdk.SNS({ apiVersion: this.apiVersion });

      const params: AwsSdk.SNS.Types.PublishInput = {
        Message: `Provider: ${message.Provider} \n timestamp: ${message.timestamp} \n type: ${message.type}`,
        TopicArn: this.topic,
      };

      notificationn.publish(params, ((err)=>{
        console.log("SNS ERROR =====> ", err);
      }))
    } catch (error) {
      console.log("SNS ERROR =====> ", error);
      
    }
  }
}

export default new SnsServcie(
  process.env.TABLE_NAME!,
  process.env.TOPIC!,
  process.env.REGION!
);
