import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomConfigService {
  constructor(private readonly configService: ConfigService) {}

  public get NODE_ENV(): string {
    return String(this.configService.get('NODE_ENV'));
  }

  public get PORT(): number {
    return Number(this.configService.get('PORT'));
  }

  public get S3_BUCKET(): string {
    return String(this.configService.get('S3_BUCKET'));
  }

  public get REGION(): string {
    return String(this.configService.get('REGION'));
  }

  public get DDB_USER_TABLE(): string {
    return String(this.configService.get('DDB_USER_TABLE'));
  }

  public get DDB_APP_TABLE(): string {
    return String(this.configService.get('DDB_APP_TABLE'));
  }

  public get API_USAGE_PLAN_ID(): string {
    return String(this.configService.get('API_USAGE_PLAN_ID'));
  }
}
