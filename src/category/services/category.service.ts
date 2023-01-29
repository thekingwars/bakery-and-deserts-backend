import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/service/cloudinary';
import { CategoryDto } from '../dto/category';
import { CategoryEntity } from '../entities/category';
import * as fs from 'fs';
import { CategoryUpdateDto } from '../dto/category.update';
import { UploadApiResponse } from 'cloudinary';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryEntity.name)
    private categoryModel: Model<CategoryEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async saveCategory(category: CategoryDto) {
    const img = await this.cloudinaryService.uploadImage(
      category.categoryImage,
      'categories',
    );

    try {
      const categoryDB = new this.categoryModel({
        ...category,
        categoryImage: img.url,
      });

      const saveCategory = await categoryDB.save();

      return saveCategory.toJSON();
    } catch (error) {
      await this.cloudinaryService.deleteUploadImage(img.public_id);

      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllCategory() {
    const categories = await this.categoryModel.find();

    return categories.map((category) => {
      return {
        ...category.toJSON(),
      };
    });
  }

  findOneCategory(id: string) {
    return this.categoryModel.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  async updateCategory(categoryDto: CategoryUpdateDto) {
    const category = await this.findOneCategory(categoryDto._id);
    let img: UploadApiResponse;

    const mime: string = category.categoryImage.split('categories')[1];

    const public_id: string = mime.split('/')[1].split('.')[0];

    if (categoryDto.categoryImage) {
      img = await this.cloudinaryService.updateImage(
        public_id,
        categoryDto.categoryImage?.path,
        'categories',
      );
    }

    try {
      await this.categoryModel.updateOne(
        { _id: categoryDto._id },
        {
          ...categoryDto,
          categoryImage: img?.url ?? category.categoryImage,
        },
      );
      return await this.findOneCategory(categoryDto._id);
    } catch (err) {
      await this.cloudinaryService.deleteUploadImage(public_id);
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteCategory(id: string) {
    return this.categoryModel.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  }
}
