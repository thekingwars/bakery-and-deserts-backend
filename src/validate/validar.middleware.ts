import { validate } from 'class-validator';
import { NextFunction, Request, Response} from 'express';
import { ProductDto } from './../products/dto/products';

export class ProductMiddleware {
  productValidator(req: Request, res: Response, next: NextFunction) {
    const {
      name,
      createdAt,
      haveStock,
      stock,
      price,
      truePrice,
      categories,
      productImage,
    } = req.body;

    const valid = new ProductDto(
      name,
      createdAt,
      haveStock,
      stock,
      price,
      truePrice,
      categories,
      productImage,
    );

    valid.name = name;
    valid.createdAt = createdAt;
    valid.stock = stock;
    valid.haveStock = haveStock;
    valid.price = price;
    valid.truePrice = truePrice;
    valid.categories = categories;
    valid.productImage = productImage;

  }
}
