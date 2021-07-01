import * as AwsSdk from "aws-sdk";
import {v4 as uuidv4} from 'uuid';

class DynamoDBStorage {
  private tableName: string;
  private apiVersion: string;

  constructor( tableName: string, apiVersion: string, region: string ) {
    this.apiVersion = apiVersion;
    this.tableName = tableName;
    AwsSdk.config.update({ region })
  }

  async save( data:any ) {
    const id: string = uuidv4();
    /**
     * using document to remove the S key value in dynamo DB
     */
    const documentClient = new AwsSdk.DynamoDB.DocumentClient({ apiVersion: this.apiVersion });

    const params: AwsSdk.DynamoDB.DocumentClient.PutItemInput = {
      TableName: this.tableName,
      Item: {
        id: id,
        meta: data
      }
    }

    try {
      await documentClient.put(params).promise();
      return true;
    } catch (error) {
      console.log("Dynamo DB error ======> ", error);
      return false;
    }
  }
}

export default new DynamoDBStorage( process.env.TABLE_NAME!, process.env.API_VERSION!, process.env.REGION! );
