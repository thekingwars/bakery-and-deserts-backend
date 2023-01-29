import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { ProductEntity } from 'src/products/entities/product';

@Schema({
  collection: 'cart',
})
export class CartEntity extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ProductEntity' }],
    default: [],
  })
  products: ProductEntity[];

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;

  @Prop({ type: String })
  status: string;
}

export const CartSchema = SchemaFactory.createForClass(CartEntity);
