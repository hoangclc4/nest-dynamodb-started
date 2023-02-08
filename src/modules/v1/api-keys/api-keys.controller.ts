import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TokenGuard } from 'bootstrap/guards/token.guard';
import { ApiKeysService } from './api-keys.service';
@ApiTags('applications')
@ApiBearerAuth()
@UseGuards(TokenGuard)
@Controller('applications/:appId/api-keys')
export class ApiKeysController {
  constructor(private readonly apiKeysService: ApiKeysService) {}

  @Post()
  create(@Param('appId') appId: string) {
    return this.apiKeysService.create(appId);
  }

  @Get()
  find(@Param('appId') appId: string) {
    return this.apiKeysService.find(appId);
  }

  @Delete(':apikey')
  destroy(@Param('appId') appId: string, @Param('apikey') apikey: string) {
    return this.apiKeysService.destroy(appId, apikey);
  }
}
