import {
  APIGatewayClient,
  CreateApiKeyCommand,
  CreateApiKeyCommandInput,
  CreateUsagePlanKeyCommand,
  CreateUsagePlanKeyCommandInput,
  DeleteApiKeyCommandInput,
  DeleteApiKeyCommand,
} from '@aws-sdk/client-api-gateway';
import { v4 as uuidv4 } from 'uuid';

class ApiGatewayService {
  client: APIGatewayClient;
  constructor() {
    this.client = new APIGatewayClient({});
  }

  /**
   * Create an API key
   */
  async createApiKey(name = '') {
    const keyName = `Ragt-${name || uuidv4()}`;
    const params: CreateApiKeyCommandInput = {
      enabled: true,
      generateDistinctId: true,
      name: keyName,
    };
    const command = new CreateApiKeyCommand(params);
    const res = await this.client.send(command);
    return res;
  }
  async addApiKeyToUsagePlan(keyId: string) {
    const params: CreateUsagePlanKeyCommandInput = {
      keyId: keyId,
      keyType: 'API_KEY',
      usagePlanId: process.env.API_USAGE_PLAN_ID,
    };
    const command = new CreateUsagePlanKeyCommand(params);
    const res = await this.client.send(command);
    return res;
  }

  async deleteApiKeyAndRemoveFromUsagePlan(apiKeyId: string) {
    const params: DeleteApiKeyCommandInput = {
      apiKey: apiKeyId,
    };
    const command = new DeleteApiKeyCommand(params);
    const res = await this.client.send(command);
    return res;
  }
}
const apiGatewayService = new ApiGatewayService();
export default apiGatewayService;
