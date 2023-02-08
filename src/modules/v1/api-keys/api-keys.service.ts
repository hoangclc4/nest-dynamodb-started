import { Injectable } from '@nestjs/common';
import { CustomConfigService } from 'config/custom-config.service';
import apiGatewayService from 'lib/api-gateway';
import { ApiKeysRepository } from 'modules/v1/api-keys/api-keys.repository';

@Injectable()
export class ApiKeysService {
  constructor(
    private readonly configService: CustomConfigService,
    private readonly apikeysRepository: ApiKeysRepository,
  ) {}
  create = async (appId: string) => {
    const apiKey = await apiGatewayService.createApiKey(appId);
    await apiGatewayService.addApiKeyToUsagePlan(apiKey.id as string);
    const result = await this.apikeysRepository.create(appId, apiKey);
    return result;
  };
  find = async (appId: string) => {
    const items = await this.apikeysRepository.find(appId);
    return items;
  };

  destroy = async (appId: string, apiKey: string) => {
    const destroyedItem = await this.apikeysRepository.destroy(appId, apiKey);
    if (destroyedItem.Attributes) {
      await apiGatewayService.deleteApiKeyAndRemoveFromUsagePlan(
        destroyedItem.Attributes.api_key_id as string,
      );
      return destroyedItem;
    }
    return null;
  };
}
