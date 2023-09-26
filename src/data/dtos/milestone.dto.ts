import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class MilestoneDto {
  @ApiProperty({ type: String, name: 'projectId' })
  @IsNotEmpty()
  projectId: string;

  @ApiProperty({ type: String, name: 'milestoneName' })
  @IsNotEmpty()
  milestoneName: string;

  @ApiProperty({ type: String, name: 'status' })
  @IsNotEmpty()
  status: string;

  @ApiProperty({ type: Number, name: 'hours' })
  @IsNotEmpty()
  hours: number;

  @ApiProperty({ type: String, name: 'startDate' })
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty({ type: Date, name: 'endDate' })
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty({ type: [String], name: 'media' })
  media: [string];

  @ApiProperty({ type: [String], name: 'tasks' })
  tasks: [string];
}

export class EditMilestoneDto {
  @ApiProperty({ type: String, name: 'milestoneName' })
  milestoneName: string;

  @ApiProperty({ type: String, name: 'status' })
  status: string;

  @ApiProperty({ type: Number, name: 'hours' })
  hours: number;

  @ApiProperty({ type: String, name: 'startDate' })
  startDate: Date;

  @ApiProperty({ type: Date, name: 'endDate' })
  endDate: Date;

  @ApiProperty({ type: [String], name: 'media' })
  media: [string];

  @ApiProperty({ type: [String], name: 'tasks' })
  tasks: [string];
}
