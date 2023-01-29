import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({
  collection: 'categories',
})
export class CategoryEntity extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String, required: true })
  categoryImage: string;
}

export const CategorySchema = SchemaFactory.createForClass(CategoryEntity);
