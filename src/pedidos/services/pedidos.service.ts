import { PedidoDto } from './../dto/pedido';
import { PedidoEntity } from './../entities/pedido';
import { InjectModel } from '@nestjs/mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Cart } from 'src/cart/models/cart';
import { UserService } from 'src/users/services/user.service';
import { MailingService } from 'src/mailing/service/mailing.service';

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

  async updatePedidoStatus(pedidoDto: PedidoDto) {
    try {
      if (pedidoDto.status < 3) {
        const pedido = await this.pedidoEntity.findOneAndUpdate(
          { _id: pedidoDto._id },
          { ...pedidoDto, status: pedidoDto.status + 1 },
        );
        return pedido;
      }
      throw new HttpException('El status maximo es 3', HttpStatus.BAD_REQUEST);
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async rejectPedidoStatus(pedidoDto: PedidoDto) {
    try {
      await this.pedidoEntity.findByIdAndUpdate(pedidoDto._id, {
        ...pedidoDto,
        status: 4,
      });
    } catch (err) {
      throw new HttpException(
        'Ha ocurrido un error, intentalo mas tarde',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findPedido(cart: Cart) {
    const pedido = await this.pedidoEntity
      .find({ scart: cart })
      .populate('cart.cart');
    return pedido;
  }
}
