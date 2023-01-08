import { IsNotEmpty, IsEmail, IsString, IsAlphanumeric } from 'class-validator';

export class AuthDto {
  @IsString({ message: 'El nombre debe ser un string' })
  @IsNotEmpty({ message: 'El nombre no puede estar vacio o ser nulo' })
  name: string;

  @IsString({ message: 'El apellido debe ser un string' })
  @IsNotEmpty({ message: 'El apellido no puede estar vacio o ser nulo' })
  lastName: string;

  @IsString({ message: 'El email debe ser un string' })
  @IsNotEmpty({ message: 'El email no puede estar vacio o ser nulo' })
  @IsEmail({}, { message: 'Coloque un email correcto' })
  email: string;

  @IsAlphanumeric()
  @IsNotEmpty({ message: 'La contraseña no puede estar vacio o ser nulo' })
  password: string;

  @IsNotEmpty({
    message: 'La fecha de nacimiento no puede estar vacio o ser nulo',
  })
  birthDate: Date;

  @IsString({ message: 'El telefono debe ser un string' })
  @IsNotEmpty({ message: 'El telefono no puede estar vacio o ser nulo' })
  phone: string;

  @IsString({ message: 'El role debe ser un string' })
  @IsNotEmpty({ message: 'El role no puede estar vacio o ser nulo' })
  role: string;

  createdAt: Date;

  get fullName() {
    return `${this.name} ${this.lastName}`;
  }

  static authJson(obj: Record<string, any>) {
    return new AuthDto(
      obj['name'],
      obj['lastName'],
      obj['email'],
      obj['password'],
      obj['birthDate'],
      obj['phone'],
      obj['role'],
    );
  }

  constructor(
    name: string,
    lastName: string,
    email: string,
    password: string,
    birthDate: Date,
    phone: string,
    role: string,
  ) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.password = password;
    this.birthDate = new Date(birthDate);
    this.phone = phone;
    this.role = role;
  }
}
