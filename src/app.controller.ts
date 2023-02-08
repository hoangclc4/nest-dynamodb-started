import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiSecurity } from '@nestjs/swagger';
import { ApiKeyGuard } from 'bootstrap/guards/apikey.guard';
import { AppService } from './app.service';

@ApiSecurity('api_key', ['x-api-key'])
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @ApiBearerAuth()
  // @UseGuards(TokenGuard)
  @UseGuards(ApiKeyGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
