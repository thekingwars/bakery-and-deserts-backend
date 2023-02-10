import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  Delete,
  Param,
  UseGuards,
  Put,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { BehaviorSubject, firstValueFrom, map } from 'rxjs';
import { JwtGuard } from 'src/users/guards/jwt.guard';
import { ProductDto } from '../dto/products';
import { ProductUpdateDto } from '../dto/productUpdate';
import { ProductImagePipe } from '../pipes/product-image.pipe';
import { ProductService } from '../services/product.service';

@Controller('/api/product')
export class ProductController {
  fileImage$ = new BehaviorSubject<Express.Multer.File>(null);

  constructor(private productService: ProductService) {}

  @Post('productImage')
  @UseInterceptors(FileInterceptor('productImage'))
  @UsePipes(ProductImagePipe)
  getProductImage(@UploadedFile() file: Express.Multer.File) {
    try {
      this.fileImage$.next(file);

      return file;
    } catch (err) {
      console.log(err);
    }
  }

  @Post('create')
  async createProduct(@Body() payload: ProductDto) {
    try {
      const product = await firstValueFrom(
        this.fileImage$.pipe(
          map((file) => {
            return this.productService.createProduct({
              ...payload,
              productImage: file,
            });
          }),
        ),
      );

      return product;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  @Get('all')
  findAllProduct() {
    return this.productService.findAllProduct();
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updateProduct(@Body() payload: ProductUpdateDto) {
    try {
      return await firstValueFrom(
        this.fileImage$.pipe(
          map((file) => {
            return this.productService.updateProduct({
              ...payload,
              productImage: file,
            });
          }),
        ),
      );
    } catch (err) {
      console.log(err);
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteProduct(@Param() id: string) {
    return await this.productService.deleteProduct(id);
  }
}
