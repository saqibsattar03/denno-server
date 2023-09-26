import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;
@Schema({ timestamps: true })
export class User {
  @Prop({ type: String })
  firstName: string;

  @Prop({ type: String })
  lastName: string;

  @Prop({ type: String })
  email: string;

  @Prop({ type: String, select: false })
  password: string;

  @Prop({
    type: String,
    enum: ['SUPER ADMIN', 'ADMIN', 'CLIENT', 'AGENCY'],
    default: 'CLIENT',
  })
  accountType: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: [String] })
  scopes: [string];

  @Prop({
    type: String,
    enum: ['ACTIVE', 'DELETED'],
    default: 'ACTIVE',
    uppercase: true,
  })
  status: string;

  @Prop({ type: String })
  profileImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
