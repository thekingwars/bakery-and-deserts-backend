import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryEntity, CategorySchema } from './entities/category';
import { CategoryController } from './controller/category';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoryService } from './services/category.service';
import { CloudinaryService } from 'src/cloudinary/service/cloudinary';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CategoryEntity.name, schema: CategorySchema },
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
  controllers: [CategoryController],
  providers: [CategoryService, CloudinaryService],
})
export class CategoryModule {}
