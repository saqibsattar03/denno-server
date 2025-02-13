import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PrivacyPolicyDto {
  @ApiProperty({ type: String, name: 'clause' })
  @IsNotEmpty()
  clause: string;

  @ApiProperty({ type: String, name: 'description' })
  @IsNotEmpty()
  description: string;

  @ApiProperty({ type: Date, name: 'lastUpdated' })
  @IsNotEmpty()
  lastUpdated: Date;
}
