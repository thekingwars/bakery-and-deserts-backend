import { Product } from 'src/products/models/product';

export interface Cart {
  _id: string;
  products: Product[];
  createdAt: Date;
  status: string;
}
