import { CartService } from './../cart/services/cart.service';
import { PedidoEntity, PedidoSchema } from './entities/pedido';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CartEntity, CartSchema } from 'src/cart/entities/cart';
import { PedidoService } from './services/pedidos.service';
import { PedidoController } from './controller/pedido.controller';
import { UserService } from 'src/users/services/user.service';
import { UserEntity, UserSchema } from 'src/users/entities/user-entity';
import { MailingService } from 'src/mailing/service/mailing.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PedidoEntity.name, schema: PedidoSchema },
    ]),
    MongooseModule.forFeature([{ name: CartEntity.name, schema: CartSchema }]),
    MongooseModule.forFeature([{ name: UserEntity.name, schema: UserSchema }]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService, CartService, UserService, MailingService],
  exports: [PedidoService],
})
export class PedidoModule {}
