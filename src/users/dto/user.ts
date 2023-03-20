import { IsDate, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio o ser nulo' })
  name: string;

  @IsString({ message: 'El apellido debe ser un string' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacio o ser nulo' })
  lastName: string;

  @IsNotEmpty({ message: 'El email no puede estar vacio o ser nulo' })
  email: string;

  @IsDate({ message: 'Debe ser una fecha' })
  birthDate: Date;

  @IsString({ message: 'El número telefónico debe ser un string' })
  @IsNotEmpty({
    message: 'El número telefónico no puede estar vacio o ser nulo',
  })
  phone: string;

  createdAt: Date;

  @IsString({ message: 'El nombre completo debe ser un string' })
  @IsNotEmpty({ message: 'El nombre completo no puede estar vacio o ser nulo' })
  fullName: string;

  @IsString({ message: 'La contraseña debe ser un string' })
  @IsNotEmpty({ message: 'La contraseña no puede estar vacia o ser nulo' })
  password: string;

  static userJSON(obj: Record<string, any>) {
    return new UserDto(
      obj['name'],
      obj['lastName'],
      obj['email'],
      obj['birthDate'],
      obj['phone'],
      obj['createdAt'],
      obj['fullName'],
      obj['password'],
    );
  }

  constructor(
    name: string,
    lastName: string,
    email: string,
    birthDate: Date,
    phone: string,
    createdAt: Date,
    fullName: string,
    password: string,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.birthDate = birthDate;
    this.phone = phone;
    this.createdAt = createdAt;
    this.fullName = fullName;
    this.password = password;
  }
}
