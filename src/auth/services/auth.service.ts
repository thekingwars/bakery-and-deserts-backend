import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserService } from 'src/users/services/user.service';
import { AuthDto } from '../dto/auth-dto';
import { AuthEntity } from '../entities/auth-entity';
import { PayloadJwt } from '../models/jwt';
import { BcryptService } from './bcrypt.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(AuthEntity.name) private authModel: Model<AuthEntity>,
    private usersService: UserService,
    private bcryptService: BcryptService,
    private jwtService: JwtService,
  ) {}

  async registerUser(payload: AuthDto): Promise<{
    access_token: string;
    user: AuthEntity;
  }> {
    const createdUser = new this.authModel(payload);

    const saveUser = await createdUser.save();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rta } = saveUser.toJSON();

    return this.generateJWT(rta as AuthEntity);
  }

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Partial<AuthEntity> | null> {
    const user = await this.usersService.findUserByEmail(email);

    if (!user) {
      throw new HttpException(
        'El usuario no existe, por favor registrese',
        HttpStatus.FORBIDDEN,
      );
    }

    if (user) {
      const isMatch = await this.bcryptService.comparePassword(
        pass,
        user.password,
      );

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user.toJSON();

      return isMatch ? result : null;
    }
  }

  async generateJWT(user: AuthEntity) {
    const payload: PayloadJwt = { role: user.role, currentUser: user };

    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
