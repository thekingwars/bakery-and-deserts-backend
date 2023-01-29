import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity, ProductSchema } from './entities/product';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
    ]),
  ],
})
export class ProductsModule {}
