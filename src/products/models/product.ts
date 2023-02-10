import { Category } from 'src/category/models/category';

export interface Product {
  name: string;
  createdAt: Date;
  haveStock?: number;
  stock: number;
  price: number;
  truePrice: number;
  categories: Category[];
  productImage: Express.Multer.File;
}
