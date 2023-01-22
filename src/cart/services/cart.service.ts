import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CartDto } from '../dto/cart';
import { CartEntity } from '../entities/cart';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(CartEntity.name) private cartEntity: Model<CartEntity>,
  ) {}

  async createCartByRegisterUser(payload: CartDto): Promise<CartDto> {
    const createdCart = new this.cartEntity(payload);

    const saveCart = await createdCart.save();

    return CartDto.cartJSON(saveCart.toJSON);
  }
}
