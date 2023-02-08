import { CreateApiKeyCommandOutput } from '@aws-sdk/client-api-gateway';
import {
  PutCommand,
  DeleteCommand,
  QueryCommand,
  QueryCommandInput,
  DeleteCommandInput,
  PutCommandInput,
} from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { CustomConfigService } from 'config/custom-config.service';
import ddbDocClient from 'lib/dynamodb';
import { CreateApiKeyDto } from 'modules/v1/api-keys/dto/create-api-key.dto';
@Injectable()
export class ApiKeysRepository {
  constructor(private readonly configService: CustomConfigService) {}

  findById = async (apiKey: string) => {
    const params: QueryCommandInput = {
      TableName: this.configService.DDB_APP_TABLE,
      IndexName: `${this.configService.DDB_APP_TABLE}-api_key-gsi`,
      KeyConditionExpression: 'api_key = :api_key',
      ExpressionAttributeValues: {
        ':api_key': apiKey,
      },
    };
    const result = await ddbDocClient.send(new QueryCommand(params));
    if (!result.Count) throw new Error('API Key not found');
    return result.Items?.length && result.Items[0];
  };

  /**
   * List Item
   * @param {string} appId
   */
  find = async (appId: string) => {
    const params: QueryCommandInput = {
      TableName: this.configService.DDB_APP_TABLE,
      KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
      ExpressionAttributeValues: {
        ':pk': `APPLICATION#${appId}`,
        ':sk': 'KEY#',
      },
    };
    const result = await ddbDocClient.send(new QueryCommand(params));
    return result;
  };

  create = async (appId: string, apiKey: CreateApiKeyCommandOutput) => {
    const item: CreateApiKeyDto = {
      pk: `APPLICATION#${appId}`,
      sk: `KEY#${apiKey.id}`,
      api_key: apiKey.value,
      api_key_id: apiKey.id,
      uid: apiKey.id,
      __typename: 'KEY',
      created: new Date().toISOString(),
    };
    const putParams: PutCommandInput = {
      TableName: this.configService.DDB_APP_TABLE,
      Item: item,
      ReturnValues: 'ALL_OLD',
    };
    const result = await ddbDocClient.send(new PutCommand(putParams));
    return result;
  };

  /**
   * Delete Item by id
   * This api is used for Server Side with api key to get data
   * @param {array} names
   * @param {string} names[0]
   */
  destroy = async (appId: string, apiKey: string) => {
    const params: DeleteCommandInput = {
      TableName: this.configService.DDB_APP_TABLE,
      Key: {
        pk: `APPLICATION#${appId}`,
        sk: `KEY#${apiKey}`,
      },
      ReturnValues: 'ALL_OLD',
    };
    const result = await ddbDocClient.send(new DeleteCommand(params));
    return result;
  };
}

ddbDocClient;
