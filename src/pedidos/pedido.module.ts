import { CartService } from './../cart/services/cart.service';
import { PedidoEntity, PedidoSchema } from './entities/pedido';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CartEntity, CartSchema } from 'src/cart/entities/cart';
import { PedidoService } from './services/pedidos.service';
import { PedidoController } from './controller/pedido.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PedidoEntity.name, schema: PedidoSchema },
    ]),
    MongooseModule.forFeature([{ name: CartEntity.name, schema: CartSchema }]),
  ],
  controllers: [PedidoController],
  providers: [PedidoService, CartService],
  exports: [PedidoService],
})
export class PedidoModule {}
