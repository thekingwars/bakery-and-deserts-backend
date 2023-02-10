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

  @Prop({ type: Date, default: Date.now() })
  createdAt: Date;

  @Prop({ type: Boolean, default: false })
  haveStock?: number;

  @Prop({ type: Number, default: 0 })
  stock?: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true })
  truePrice: number;

  @Prop([
    { type: mongoose.Schema.Types.ObjectId, ref: 'categories', required: true },
  ])
  categories: CategoryEntity[];

  @Prop({
    type: String,
    required: true,
  })
  productImage: string;
}

export const ProductSchema = SchemaFactory.createForClass(ProductEntity);
