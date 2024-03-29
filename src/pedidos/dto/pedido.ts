import { IsNotEmpty, IsNumber } from 'class-validator';
import { Cart } from 'src/cart/models/cart';
import { User } from 'src/users/model/user';

export class PedidoDto {
  @IsNotEmpty({ message: 'El valor no puede ser nulo' })
  _id: string;

  @IsNotEmpty({ message: 'El usuario no puede ser nulo' })
  user: User;

  @IsNotEmpty({ message: 'El valor no puede ser nulo' })
  cart: Cart;

  @IsNotEmpty({ message: 'El createdAt no puede ser nulo' })
  createdAt: Date;

  @IsNotEmpty({ message: 'El valor no puede ser nulo' })
  @IsNumber()
  status: number;

  static cartJSON(obj: Record<string, any>) {
    return new PedidoDto(obj['cart'], obj['createdAt'], obj['user']);
  }

  constructor(cart: Cart, createdAt: Date, user: User) {
    this.cart = cart;
    this.createdAt = createdAt;
    this.user = user;
  }
}
