import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ContactUsDocument = HydratedDocument<ContactUs>;
@Schema({ timestamps: true })
export class ContactUs {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: User.name })
  userId: User;

  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  subject: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: [String] })
  media: [string];
}

export const ContactUsSchema = SchemaFactory.createForClass(ContactUs);
