import { PedidoDto } from './../dto/pedido';
import { JwtGuard } from './../../users/guards/jwt.guard';
import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { PedidoService } from '../services/pedidos.service';

@Controller('/api/pedido')
export class PedidoController {
  constructor(private pedidoService: PedidoService) {}

  @Get()
  @UseGuards(JwtGuard)
  findPedido(@Body() { _id, cart }: PedidoDto) {
    return this.pedidoService.findPedido(_id, cart);
  }

  @Post('create')
  @UseGuards(JwtGuard)
  async createPedido(@Body() payload: PedidoDto) {
    return this.pedidoService.createPedido({ ...payload });
  }

  @UseGuards(JwtGuard)
  @Put('update')
  async updatePedido(@Body() payload: PedidoDto) {
    return this.pedidoService.updatePedido({
      ...payload,
    });
  }
}
