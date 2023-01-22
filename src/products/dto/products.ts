import { IsNotEmpty, IsString } from 'class-validator';

export class ProductDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio o ser nulo' })
  name: string;
  createdAt: Date;

  constructor(name: string, createdAt: Date) {
    this.name = name;
    this.createdAt = createdAt;
  }
}
