import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Cart } from 'src/cart/models/cart';

export class PedidoDto {
  @IsString({ message: 'El userID debe ser un string' })
  @IsNotEmpty({ message: 'El userID no puede estar vacio o ser nulo' })
  _id: string;

  @IsArray({ message: 'los productos debe ser un array' })
  cart: Array<Cart>;

  createdAt: Date;

  static cartJSON(obj: Record<string, any>) {
    return new PedidoDto(obj['userID'], obj['cart'], obj['createdAt']);
  }

  constructor(_id: string, cart: Array<Cart>, createdAt: Date) {
    this._id = _id;
    this.cart = cart;
    this.createdAt = createdAt;
  }
}
