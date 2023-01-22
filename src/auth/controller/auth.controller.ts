import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthDto } from '../dto/auth-dto';
import { AuthService } from '../services/auth.service';
import { BcryptService } from '../services/bcrypt.service';
import { Request } from 'express';
import { AuthEntity } from '../entities/auth-entity';
import { CartService } from 'src/cart/services/cart.service';
import { MongoConectionService } from 'src/database/mongo-conection.service';
import { ClientSession } from 'mongoose';

@Controller('/api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private bcryptService: BcryptService,
    private cartService: CartService,
    private databaseService: MongoConectionService,
  ) {}

  @Post('register')
  async registerUser(@Body() payload: AuthDto) {
    const authPayload = AuthDto.authJson(payload);

    if (authPayload.password.length < 6) {
      throw new HttpException(
        'La contraseña debe tener minimo 6 caracteres',
        HttpStatus.BAD_REQUEST,
      );
    }

    const data: AuthDto = {
      ...authPayload,
      password: await this.bcryptService.passwordEncrypt(authPayload.password),
      fullName: authPayload.fullName,
    };

    const session: ClientSession = await this.databaseService
      .getConnection()
      .startSession();

    session.startTransaction();

    try {
      const user = await this.authService.registerUser(data);

      await this.cartService.createCartByRegisterUser({
        _id: user.user._id,
        status: null,
        products: [],
        createdAt: new Date(),
      });

      await session.commitTransaction();
      await session.endSession();
      return user;
    } catch (err) {
      await session.abortTransaction();

      throw new HttpException(err['message'], HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async loginUser(@Req() req: Request) {
    return this.authService.generateJWT(req.user as AuthEntity);
  }
}
