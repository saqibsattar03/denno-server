// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserDto {
  @ApiProperty({ type: String, name: 'firstName' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, name: 'lastName' })
  lastName: string;

  @ApiProperty({ type: String, name: 'email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ type: String, name: 'password' })
  @IsNotEmpty()
  password: string;

  @ApiProperty({ type: String, name: 'accountType' })
  @IsNotEmpty()
  accountType: string;

  @ApiProperty({ type: String, name: 'contactNumber' })
  contactNumber: string;

  @ApiProperty({ type: [String], name: 'scopes' })
  scopes: [string];

  @ApiProperty({ type: String, name: 'address' })
  address: string;

  @ApiProperty({ type: String, name: 'status' })
  status: string;

  @ApiProperty({ type: String, name: 'profileImage' })
  profileImage: string;
}

export class EditUserDto {
  @ApiProperty({ type: String, name: 'firstName' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ type: String, name: 'lastName' })
  lastName: string;

  @ApiProperty({ type: String, name: 'contactNumber' })
  contactNumber: string;

  @ApiProperty({ type: [String], name: 'scopes' })
  scopes: [string];

  @ApiProperty({ type: String, name: 'address' })
  address: string;

  @ApiProperty({ type: String, name: 'status' })
  status: string;

  @ApiProperty({ type: String, name: 'profileImage' })
  profileImage: string;
}
