import { Module } from '@nestjs/common';
import { ApiKeysService } from './api-keys.service';
import { ApiKeysController } from './api-keys.controller';
import { ApiKeysRepository } from 'modules/v1/api-keys/api-keys.repository';

@Module({
  controllers: [ApiKeysController],
  providers: [ApiKeysService, ApiKeysRepository],
})
export class ApiKeysModule {}
