import { ApiProperty } from '@nestjs/swagger';

export class ClientDto {
  @ApiProperty({ type: String, name: 'firstName' })
  firstName: string;

  @ApiProperty({ type: String, name: 'lastName' })
  lastName: string;

  @ApiProperty({ type: String, name: 'contactNumber' })
  contactNumber: string;

  @ApiProperty({ type: String, name: 'address' })
  address: string;
}
