import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'users',
})
export class AuthEntity extends Document {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  email: string;

  @Prop({ type: Date, required: true })
  birthDate: Date;

  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  phone: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, required: true })
  fullName: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true, enum: ['user', 'admin'] })
  role: string;
}

export const AuthSchema = SchemaFactory.createForClass(AuthEntity);
