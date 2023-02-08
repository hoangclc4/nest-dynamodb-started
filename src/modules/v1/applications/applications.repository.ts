import {
  PutCommand,
  DeleteCommand,
  QueryCommand,
  QueryCommandInput,
  GetCommand,
  GetCommandInput,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';
import { Injectable } from '@nestjs/common';
import { CustomConfigService } from 'config/custom-config.service';
import { randomUUID } from 'crypto';
import ddbDocClient from 'lib/dynamodb';
@Injectable()
export class ApplicationsRepository {
  constructor(private readonly configService: CustomConfigService) {}
  findById = async ({ userName, uid }: { userName: string; uid: string }) => {
    // Query lexicons from dynamodb by user pk and begin with APPLICATION# sk
    const queryDBParams: GetCommandInput = {
      TableName: this.configService.DDB_USER_TABLE,
      Key: {
        pk: `USER#${userName}`,
        sk: `APPLICATION#${uid}`,
      },
    };
    const queryResult = await ddbDocClient.send(new GetCommand(queryDBParams));
    if (!queryResult.Item) throw new Error('Item not found');
    return queryResult;
  };

  /**
   * List Item
   * This api is used for Server Side with api key to get data
   */
  find = async ({ userName }: { userName: string }) => {
    // Query list from dynamodb by user pk and begin with APPLICATION# sk
    const queryDBParams: QueryCommandInput = {
      TableName: this.configService.DDB_USER_TABLE as string,
      KeyConditionExpression: 'pk = :pk and begins_with(sk, :sk)',
      ExpressionAttributeValues: {
        ':pk': `USER#${userName}`,
        ':sk': 'APPLICATION#',
      },
      // ProjectionExpression: '',
    };
    const queryResult = await ddbDocClient.send(
      new QueryCommand(queryDBParams),
    );
    if (!queryResult.Items) throw new Error('Items not found');
    return queryResult;
  };
  /**
   * create Item
   * This api is used for Server Side with api key to get data
   * @param {object} params
   */
  create = async ({
    userName,
    payload,
  }: {
    userName: string;
    payload: any;
  }) => {
    // Generate uid by name lowercase and replace space with _ and randomUUID
    const uid = `${payload.name
      .toLowerCase()
      .replace(/ /g, '_')}_${randomUUID()}`;
    // Put Item to dynamodb
    const putDbParams = {
      TableName: this.configService.DDB_USER_TABLE as string,
      Item: {
        pk: `USER#${userName}`,
        sk: `APPLICATION#${uid}`,
        __typename: 'APPLICATION',
        uid: uid,
        name: payload.name,
        description: payload.description,
        status: 'ACTIVE',
        created: new Date().toISOString(),
      },
    };
    return await ddbDocClient.send(new PutCommand(putDbParams));
  };

  update = async ({
    userName,
    uid,
    payload,
  }: {
    userName: string;
    uid: string;
    payload: any;
  }) => {
    // Update Item to dynamodb
    const updateDbParams = {
      TableName: this.configService.DDB_USER_TABLE as string,
      Key: {
        pk: `USER#${userName}`,
        sk: `APPLICATION#${uid}`,
      },
      UpdateExpression: 'set #name = :name, #description = :description',
      ExpressionAttributeNames: {
        '#name': 'name',
        '#description': 'description',
      },
      ExpressionAttributeValues: {
        ':name': payload.name,
        ':description': payload.description,
      },
      ReturnValues: 'ALL_NEW',
    };
    const result = await ddbDocClient.send(new UpdateCommand(updateDbParams));
    if (!result.Attributes) throw new Error('Item not found');
    return result;
  };

  /**
   * Delete Item by id
   * This api is used for Server Side with api key to get data
   * @param {array} names
   * @param {string} names[0]
   */
  destroy = async ({
    userName,
    uids,
  }: {
    userName: string;
    uids: string[];
  }) => {
    // foreach name, delete from polly
    const result = await Promise.all(
      uids.map(async (uid) => {
        // Delete lexicon from dynamodb
        const del = await ddbDocClient.send(
          new DeleteCommand({
            TableName: this.configService.DDB_USER_TABLE as string,
            Key: {
              pk: `USER#${userName}`,
              sk: `APPLICATION#${uid}`,
            },
            ReturnValues: 'ALL_OLD',
          }),
        );
        if (!del.Attributes) throw new Error('Item not found');
        return del;
      }),
    );
    return result;
  };
}

ddbDocClient;
