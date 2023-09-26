import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Project } from './project.schema';

export type MilestoneDocument = HydratedDocument<Milestone>;
@Schema({ timestamps: true })
export class Milestone {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Project.name })
  projectId: Project;

  @Prop({ type: String })
  milestoneName: string;

  @Prop({ type: String })
  status: string;

  @Prop({ type: [String] })
  media: [string];

  @Prop({ type: [String] })
  tasks: [string];

  @Prop({ type: Number })
  hours: number;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const MilestoneSchema = SchemaFactory.createForClass(Milestone);
