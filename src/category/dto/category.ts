import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio o ser nulo' })
  name: string;

  createdAt: Date;

  categoryImage: Express.Multer.File;

  constructor(
    name: string,
    createdAt: Date,
    categoryImage: Express.Multer.File,
  ) {
    this.name = name;
    this.createdAt = createdAt;
    this.categoryImage = categoryImage;
  }
}
