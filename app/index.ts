import "./configs/env";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import verifyWebhook from "./utils/verifyWebhook";
import dynamoDb from "./services/storage/dynamoDb";
import SnsMessage from "./services/notifications/sns";
import SnsUtility from "./utils/snsMessage";

/**
 *
 */
export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  try {
    console.log("Event ======> ", event);
    const body: any = event.body;
    const jsonBody: any = JSON.parse(body);
    const { timestamp, token, signature } = jsonBody.signature
    
    const verify: boolean = verifyWebhook.verify(
      timestamp,
      token,
      signature
    );

    if (!verify) {
      return {
        statusCode: 200,
        body: 'We could not verify this webhook',
      };
    }

    const isSaved = await dynamoDb.save(jsonBody);
    
    if(!isSaved){
      return {
        statusCode: 500,
        body: 'Webhook could not be saved, check storage service',
      };
    }

    //send sns
    const messageBody = SnsUtility.createMessageBody(jsonBody);

    SnsMessage.notify(messageBody);

    console.log("messageBody =====> ", messageBody);

    return {
      statusCode: 200,
      body: 'Webhook verified and saved',
    };
  } catch (error) {
    console.log("Index Error =====> ", error);
    return {
      statusCode: 500,
      body: 'Something went wrong while processing request',
    };
  }
};
