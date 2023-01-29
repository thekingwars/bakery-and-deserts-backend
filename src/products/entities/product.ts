import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CategoryEntity } from 'src/category/entities/category';

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

  @Prop({ type: Number, default: null })
  stock: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, default: null })
  truePrice: number;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  ])
  categories: CategoryEntity[];
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
