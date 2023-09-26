import { ApiProperty } from '@nestjs/swagger';

export class ContactUsDto {
  @ApiProperty({ type: String, name: 'userId' })
  userId: string;

  @ApiProperty({ type: String, name: 'name' })
  name: string;

  @ApiProperty({ type: String, name: 'subject' })
  subject: string;

  @ApiProperty({ type: String, name: 'description' })
  description: string;

  @ApiProperty({ type: [String], name: 'media' })
  media: [string];
}

export class EditContactUsDto {
  @ApiProperty({ type: String, name: 'subject' })
  description: string;

  @ApiProperty({ type: [String], name: 'media' })
  media: [string];
}
