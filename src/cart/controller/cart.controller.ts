import { JwtGuard } from 'src/users/guards/jwt.guard';
import { CartDto } from './../dto/cart';
import { CartService } from 'src/cart/services/cart.service';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';

@Controller('/api/cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get()
  @UseGuards(JwtGuard)
  findCart(@Body() { _id, products }: CartDto) {
    return this.cartService.findCart(_id, products);
  }

  @Post('create')
  @UseGuards(JwtGuard)
  async createCartByRegisterUser(@Body() payload: CartDto) {
    return this.cartService.createCartByRegisterUser({ ...payload });
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updateCartProduct(@Body() payload: CartDto) {
    return this.cartService.updateCart({
      ...payload,
    });
  }

  @UseGuards(JwtGuard)
  @Put('empty')
  async emptyCart(@Body() payload: CartDto) {
    return this.cartService.emptyCart({
      ...payload,
    });
  }
}
