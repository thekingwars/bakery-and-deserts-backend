import { Cart } from 'src/cart/models/cart';
import { User } from 'src/users/model/user';

export class UpdatePedidoDto {
  user: User;
  cart: Cart;
  createdAt: Date;
  status: number;
}
