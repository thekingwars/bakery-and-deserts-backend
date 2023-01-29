import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtGuard } from 'src/users/guards/jwt.guard';
import { CategoryDto } from '../dto/category';
import { CategoryUpdateDto } from '../dto/category.update';
import { CategoryPipe } from '../pipes/category.pipe';
import { CategoryService } from '../services/category.service';

@Controller('/api/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @UseGuards(JwtGuard)
  @Post('create')
  @UseInterceptors(FileInterceptor('categoryImage'))
  @UsePipes(CategoryPipe)
  createCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() payload: CategoryDto,
  ) {
    const category = this.categoryService.saveCategory({
      ...payload,
      categoryImage: file,
    });

    return category;
  }

  @Get()
  findAllCategory() {
    return this.categoryService.findAllCategory();
  }

  @UseGuards(JwtGuard)
  @Put('update')
  @UseInterceptors(FileInterceptor('categoryImage'))
  @UsePipes(CategoryPipe)
  updateCategory(
    @Body() payload: CategoryUpdateDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.updateCategory({
      ...payload,
      categoryImage: file,
    });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async deleteCategory(@Param() id: string) {
    return await this.categoryService.deleteCategory(id);
  }
}
