import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicationsModule } from './modules/v1/applications/applications.module';
import { CustomConfigModule } from 'config/custom-config.module';
import { ApiKeysModule } from './modules/v1/api-keys/api-keys.module';

@Module({
  imports: [CustomConfigModule, ApplicationsModule, ApiKeysModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
