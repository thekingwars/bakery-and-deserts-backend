import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserEntity } from '../entities/user-entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserEntity.name) private userModel: Model<UserEntity>,
  ) {}

  findUserByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  findUserByID(_id: string) {
    return this.userModel.findOne({ _id }).exec();
  }
}
