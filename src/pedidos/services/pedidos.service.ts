import { PedidoDto } from './../dto/pedido';
import { PedidoEntity } from './../entities/pedido';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart } from 'src/cart/models/cart';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(PedidoEntity.name) private pedidoEntity: Model<PedidoEntity>,
  ) {}

  async createPedido(payload: PedidoDto): Promise<PedidoDto> {
    const createdPedido = new this.pedidoEntity(payload);
    const savePedido = await createdPedido.save();
    return PedidoDto.cartJSON(savePedido.toJSON);
  }

  async updatePedido(pedidoDto: PedidoDto) {
    try {
      const findPedido = await this.pedidoEntity.findOne({
        _id: pedidoDto._id,
      });

      const cart = [...findPedido.cart, ...pedidoDto.cart];
      const pedido = await this.pedidoEntity.findOneAndUpdate(
        { _id: pedidoDto._id },
        { cart },
      );
      return pedido;
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPedido(id: string, cart: Cart[]) {
    const pedido = await this.pedidoEntity
      .find({ _id: id, cart: cart })
      .populate('cart.cart');
    return pedido;
  }
}
