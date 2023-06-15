import * as jwt from 'jsonwebtoken';
import IUser from '../Interfaces/IUser';

type message = {
  message: string,
};

const secret = process.env.JWT_SECRET || 'jwt_secret';

export default class JwtUtils {
  static sign(payload: IUser | message): string {
    const token = jwt.sign(payload, secret);
    return token;
  }

  static verify<T>(token: string): T {
    const decoded = jwt.verify(token, secret);
    return decoded as T;
  }
}
