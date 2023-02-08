import { Expose, plainToInstance, Type } from 'class-transformer';
import { IsInt, IsNotEmpty, validateSync } from 'class-validator';

export class EnvironmentVariablesSchema {
  @IsNotEmpty()
  @Expose()
  public NODE_ENV = 'local';

  @IsInt()
  @Expose()
  @Type(() => Number)
  public PORT = 3000;

  @Expose()
  @IsNotEmpty()
  public S3_BUCKET = 'ragt-dev';

  @Expose()
  @IsNotEmpty()
  public REGION = 'ap-southeast-1';

  @Expose()
  @IsNotEmpty()
  public DDB_USER_TABLE = 'ragt-dev-user';

  @Expose()
  @IsNotEmpty()
  public DDB_APP_TABLE = 'ragt-dev-application';

  @Expose()
  @IsNotEmpty()
  public API_USAGE_PLAN_ID = 'slnpc3';
}

export const validate = (config: Record<string, unknown>) => {
  const validatedConfig = plainToInstance(
    EnvironmentVariablesSchema,
    {
      ...new EnvironmentVariablesSchema(),
      ...config,
    },
    {
      enableImplicitConversion: true,
    },
  );
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
};
