import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CartDto } from 'src/cart/dto/cart';
import { UserDto } from 'src/users/dto/user';
@Schema({
  collection: 'pedido',
})
export class PedidoEntity extends Document {
  @Prop({ type: Object })
  cart: CartDto;

  @Prop({ type: Object })
  user: UserDto;

  @Prop({ type: Number, required: true })
  status: number;

  @Prop({ type: Date, required: true, default: Date.now() })
  createdAt: Date;
}
export const PedidoSchema = SchemaFactory.createForClass(PedidoEntity);
