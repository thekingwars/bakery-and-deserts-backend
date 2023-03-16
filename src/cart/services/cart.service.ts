import { ProductDto } from './../../products/dto/products';
import { ProductUpdateDto } from './../../products/dto/productUpdate';
import { ProductService } from './../../products/services/product.service';
import { Product } from './../../products/models/product';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CartDto } from '../dto/cart';
import { CartEntity } from '../entities/cart';
import { Model } from 'mongoose';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartEntity.name) private cartEntity: Model<CartEntity>,
    private productService: ProductService,
  ) {}

  async createCartByRegisterUser(payload: CartDto): Promise<CartDto> {
    const createdCart = new this.cartEntity(payload);

    const saveCart = await createdCart.save();

    return CartDto.cartJSON(saveCart.toJSON);
  }

  async updateCart(cartDto: CartDto) {
    try {
      const findCart = await this.cartEntity.findOne({ _id: cartDto._id });

      const products = [...findCart.products, ...cartDto.products];
      const cart = await this.cartEntity.findOneAndUpdate(
        { _id: cartDto._id },
        { products },
      );
      return cart;
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async emptyCart(cartDto: CartDto) {
    try {
      const cart = await this.cartEntity.findOneAndUpdate(
        { _id: cartDto._id },
        { products: [] },
      );
      return cart;
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findCart(id: string, product: Product[]) {
    const cart = await this.cartEntity
      .find({ _id: id, products: product })
      .populate('products.product');
    return cart;
  }
}

/*async findOneProduct(id: string){
    return this.cartEntity.findOne({_id})
  }

  async findCartProducts(products: Array<Product>) {
    let product;
    try {
      product = await this.cartEntity.findById(products);
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    if (!product) {
      throw new NotFoundException('No se encontraron los productos.');
    }
    return product;
  }

  async updateCartProduct(cartDto: CartDto) {
    const updatedCartProduct = await this.findOne();

    updatedCartProduct.save();
    try {
      await this.cartEntity.updateOne(
        { products: cartDto.products },
        {
          ...cartDto,
        },
      );
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }*/
