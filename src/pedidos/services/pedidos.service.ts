import { PedidoDto } from './../dto/pedido';
import { PedidoEntity } from './../entities/pedido';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart } from 'src/cart/models/cart';
import { UserService } from 'src/users/services/user.service';
import { MailingService } from 'src/mailing/service/mailing.service';
import { use } from 'passport';

@Injectable()
export class PedidoService {
  constructor(
    @InjectModel(PedidoEntity.name) private pedidoEntity: Model<PedidoEntity>,
    private userService: UserService,
    private mailingService: MailingService,
  ) {}

  async createPedido(payload: PedidoDto): Promise<PedidoDto> {
    const user = await this.userService.findUserByID(payload.cart._id);

    const createdPedido = new this.pedidoEntity({
      cart: payload.cart,
      status: 1,
      user,
    });

    const context = {
      correo: user.email,
      fecha: new Date(),
    };

    this.mailingService.sendAdminEmail(context);

    this.mailingService.sendClientMailStatusOne(
      user.email,
      'Verificacion',
      user.fullName,
    );

    const savePedido = await createdPedido.save();
    return PedidoDto.cartJSON(savePedido.toJSON());
  }

  // async updatePedido(pedidoDto: PedidoDto) {
  //   try {
  //     const findPedido = await this.pedidoEntity.findOne({
  //       _id: pedidoDto._id,
  //     });

  //     const cart = [...findPedido.cart, ...pedidoDto.cart];
  //     const pedido = await this.pedidoEntity.findOneAndUpdate(
  //       { _id: pedidoDto._id },
  //       { cart },
  //     );
  //     return pedido;
  //   } catch (err) {
  //     throw new HttpException(
  //       'Ha ocurrido un error, intentalo mas tarde',
  //       HttpStatus.INTERNAL_SERVER_ERROR,
  //     );
  //   }
  // }

  async findPedido(id: string, cart: Cart[]) {
    const pedido = await this.pedidoEntity
      .find({ _id: id, cart: cart })
      .populate('cart.cart');
    return pedido;
  }
}
