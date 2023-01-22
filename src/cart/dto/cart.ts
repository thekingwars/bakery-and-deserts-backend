import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { Product } from 'src/products/models/product';

export class CartDto {
  @IsString({ message: 'El userID debe ser un string' })
  @IsNotEmpty({ message: 'El userID no puede estar vacio o ser nulo' })
  _id: string;
  @IsArray({ message: 'los productos debe ser un array' })
  products: Array<Product>;
  createdAt: Date;
  status?: string;

  static cartJSON(obj: Record<string, any>) {
    return new CartDto(
      obj['userID'],
      obj['products'],
      obj['createdAt'],
      obj['status'],
    );
  }

  constructor(
    _id: string,
    products: Array<Product>,
    createdAt: Date,
    status: string,
  ) {
    this._id = _id;
    this.products = products;
    this.createdAt = createdAt;
    this.status = status;
  }
}
