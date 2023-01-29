import { IsNotEmpty, IsString } from 'class-validator';

export class CategoryUpdateDto {
  @IsString()
  _id: string;

  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio o ser nulo' })
  name: string;

  createdAt: Date;

  categoryImage: Express.Multer.File;

  constructor(
    name: string,
    createdAt: Date,
    categoryImage: Express.Multer.File,
    _id: string,
  ) {
    this.name = name;
    this.createdAt = createdAt;
    this.categoryImage = categoryImage;
    this._id = _id;
  }
}
