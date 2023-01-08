import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  passwordEncrypt(password) {
    const salt = bcrypt.genSaltSync(10);

    return bcrypt.hashSync(password, salt);
  }

  comparePassword(password, passwordBD) {
    return bcrypt.compareSync(password, passwordBD);
  }
}
