import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'product',
})
export class ProductEntity extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;
}

export const AuthSchema = SchemaFactory.createForClass(ProductEntity);
