import { CartEntity } from './../../cart/entities/cart';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
@Schema({
  collection: 'pedido',
})
export class PedidoEntity extends Document {
  @Prop({ type: String, required: true })
  _id: string;

  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CartEntity' }],
    default: [],
  })
  cart: CartEntity[];

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;
}
export const PedidoSchema = SchemaFactory.createForClass(PedidoEntity);
