import { CloudinaryService } from './../cloudinary/service/cloudinary';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CartController } from './controller/cart.controller';
import { CartEntity, CartSchema } from './entities/cart';
import { CartService } from './services/cart.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: CartEntity.name, schema: CartSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService, CloudinaryService],
  exports: [CartService],
})
export class CartModule {}
