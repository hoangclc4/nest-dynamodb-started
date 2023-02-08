import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import path from 'path';
import { CustomConfigService } from './custom-config.service';
import { validate } from './env.schema';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
    }),
  ],
  providers: [CustomConfigService],
  exports: [CustomConfigService],
})
export class CustomConfigModule {}
