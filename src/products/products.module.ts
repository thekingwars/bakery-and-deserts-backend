import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductEntity, ProductSchema } from './entities/product';
import { ProductController } from './controllers/product.controller';
import { ProductService } from './services/product.service';
import { CloudinaryService } from 'src/cloudinary/service/cloudinary';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ProductEntity.name, schema: ProductSchema },
    ]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: './public',
          filename: (req, file, callback) => {
            callback(
              null,
              `${file.originalname.split('.')[0]}-${Date.now()}.${
                file.mimetype.split('/')[1]
              }`,
            );
          },
        }),
      }),
    }),
  ],
  controllers: [ProductController],
  providers: [ProductService, CloudinaryService],
  exports: [ProductService],
})
export class ProductsModule {}
