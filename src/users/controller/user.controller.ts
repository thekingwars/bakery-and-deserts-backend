import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtGuard } from '../guards/jwt.guard';

@UseGuards(JwtGuard)
@Controller('api/user')
export class UserController {
  @Get('current')
  getProfile(@Req() req: Request) {
    return req.user;
  }
}
