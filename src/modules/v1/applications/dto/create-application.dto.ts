import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty } from 'class-validator';

export class CreateApplicationDto {
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
  uid: string;

  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  status: string;

  @ApiProperty()
  @IsDate()
  created: Date;
}
