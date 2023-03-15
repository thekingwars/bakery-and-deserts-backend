import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UploadApiResponse } from 'cloudinary';
import mongoose, { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/service/cloudinary';
import { ProductDto } from '../dto/products';
import { ProductUpdateDto } from '../dto/productUpdate';
import { ProductEntity } from '../entities/product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(ProductEntity.name)
    private productModel: Model<ProductEntity>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async createProduct(product: ProductDto) {
    const img = await this.cloudinaryService.uploadImage(
      product.productImage,
      'products',
    );

    try {
      const productDB = new this.productModel({
        ...product,
        productImage: img.url,
      });

      const saveProduct = await productDB.save();

      return saveProduct.toJSON();
    } catch (error) {
      await this.cloudinaryService.deleteUploadImage(img.public_id);

      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllProduct() {
    const categories = await this.productModel.find();

    return categories.map((category) => ({ ...category.toJSON() }));
  }

  findOneProduct(id: string) {
    return this.productModel.findById(new mongoose.Types.ObjectId(id)).exec();
  }

  async updateProduct(productDto: ProductUpdateDto) {
    const product = await this.findOneProduct(productDto._id);
    let img: UploadApiResponse;

    const mime: string = product.productImage.split('products')[1];

    const public_id: string = mime.split('/')[1].split('.')[0];

    if (productDto.productImage) {
      img = await this.cloudinaryService.updateImage(
        public_id,
        productDto.productImage?.path,
        'products',
      );
    }

    console.log(img);

    try {
      await this.productModel.updateOne(
        { _id: productDto._id },
        {
          ...productDto,
          productImage: img?.url ?? product.productImage,
        },
      );
      return await this.findOneProduct(productDto._id);
    } catch (err) {
      await this.cloudinaryService.deleteUploadImage(public_id);
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteProduct(id: string) {
    return this.productModel.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
  }

  async findProductStock(id: string, stock: number) {
    const existencia = await this.productModel.findOne({
      _id: id,
      stock: stock,
    });
    return existencia.stock;
  }

  /*async valStock(productDto: ProductDto) {
    const hay = await this.productModel.findOne({ stock: productDto.stock });

    if (productDto.stock <= 0) {
      throw new HttpException(
        'No hay productos agregados',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return hay;
  }*/
}
