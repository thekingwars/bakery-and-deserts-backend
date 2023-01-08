import { AuthDto } from '../dto/auth-dto';

export interface PayloadJwt {
  role: string;
  currentUser: AuthDto;
}
