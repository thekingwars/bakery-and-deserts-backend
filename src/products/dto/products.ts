import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ProductDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio o ser nulo' })
  name: string;
  createdAt: Date;

  @IsNumber()
  stock: number;

  @IsNumber()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsNotEmpty()
  truePrice: number;

  @IsNotEmpty()
  @IsArray()
  categories: any[];

  constructor(
    name: string,
    createdAt: Date,
    stock: number,
    price: number,
    truePrice: number,
    categories: any[],
  ) {
    this.name = name;
    this.createdAt = createdAt;
    this.stock = stock;
    this.price = price;
    this.truePrice = truePrice;
    this.categories = categories;
  }
}
