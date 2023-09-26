import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ProjectDto {
  @ApiProperty({ type: String, name: 'agencyId' })
  @IsNotEmpty()
  agencyId: string;

  @ApiProperty({ type: String, name: 'clientId' })
  @IsNotEmpty()
  clientId: string;

  @ApiProperty({ type: String, name: 'projectName' })
  @IsNotEmpty()
  projectName: string;

  @ApiProperty({ type: String, name: 'description' })
  description: string;

  @ApiProperty({ type: Number, name: 'hours' })
  @IsNotEmpty()
  hours: number;

  @ApiProperty({ type: Date, name: 'startDate' })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ type: Date, name: 'endDate' })
  @IsNotEmpty()
  endDate: Date;
}

export class EditProjectDto {
  @ApiProperty({ type: String, name: 'projectName' })
  projectName: string;

  @ApiProperty({ type: Date, name: 'startDate' })
  startDate: Date;

  @ApiProperty({ type: Date, name: 'endDate' })
  endDate: Date;
}
