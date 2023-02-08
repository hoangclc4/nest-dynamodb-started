import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateApiKeyDto {
  @ApiProperty()
  @IsNotEmpty()
  pk: string;

  @ApiProperty()
  @IsNotEmpty()
  sk: string;

  @ApiProperty()
  @IsNotEmpty()
  __typename: string;

  @ApiProperty()
  @IsNotEmpty()
  api_key: string;

  @ApiProperty()
  @IsNotEmpty()
  api_key_id: string;

  @ApiProperty()
  @IsNotEmpty()
  uid: string;

  @ApiProperty()
  @IsDate()
  created: string;
}
