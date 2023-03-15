import { CloudinaryService } from './../cloudinary/service/cloudinary';
import { ProductEntity, ProductSchema } from './../products/entities/product';
import { ProductService } from './../products/services/product.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './controller/cart.controller';
import { CartEntity, CartSchema } from './entities/cart';
import { CartService } from './services/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CartEntity.name, schema: CartSchema }]),
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
    ]),
  ],
  controllers: [CartController],
  providers: [CartService, ProductService, CloudinaryService],
  exports: [CartService],
})
export class CartModule {}
