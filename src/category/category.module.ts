import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryEntity, CategorySchema } from './entities/category';
import { CategoryController } from './controller/category';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { CategoryService } from './services/category.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

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
    CloudinaryModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
