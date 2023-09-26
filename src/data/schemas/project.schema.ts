import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ProjectDocument = HydratedDocument<Project>;
@Schema({ timestamps: true })
export class Project {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  agencyId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  clientId: User;

  @Prop({ type: String })
  projectName: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: Number })
  hours: number;

  @Prop({ type: Date })
  startDate: Date;

  @Prop({ type: Date })
  endDate: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
