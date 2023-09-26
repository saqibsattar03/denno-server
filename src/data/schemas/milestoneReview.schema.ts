import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Milestone } from './milestone.schema';

export type MilestoneReviewDocument = HydratedDocument<MilestoneReview>;
@Schema({ timestamps: true })
export class MilestoneReview {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Milestone.name })
  milestoneId: Milestone;

  @Prop({ type: String })
  experience: string;

  @Prop({ type: Boolean })
  completedOnTime: boolean;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: Boolean })
  completedAsPerRequirements: string;

  @Prop({ type: String })
  comment: string;
}

export const MilestoneReviewSchema =
  SchemaFactory.createForClass(MilestoneReview);
