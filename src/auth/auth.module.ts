import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { BcryptService } from './services/bcrypt.service';
import { AuthController } from './controller/auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthEntity, AuthSchema } from './entities/auth-entity';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from 'src/users/user.module';
import { PassportModule } from '@nestjs/passport/dist';
import { LocalStrategy } from './strategy/local-strategy';
import { JwtStrategy } from './strategy/jwt-strategy';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: AuthEntity.name, schema: AuthSchema }]),
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: () => {
        return {
          secret: process.env.SECRET_KEY,
          signOptions: { expiresIn: '604800s' },
        };
      },
    }),
  ],
  providers: [AuthService, BcryptService, LocalStrategy, JwtStrategy],
  exports: [AuthService, BcryptService],
  controllers: [AuthController],
})
export class AuthModule {}
