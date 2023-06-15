import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import IUser from '../Interfaces/IUser';
import { ICRUDUser } from '../Interfaces/ICRUDUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JwtUtils from '../utils/jwtUtils';

class UserService {
  constructor(
    private userModel: ICRUDUser<IUser> = new UserModel(),
  ) {}

  public async getUserByEmail(email: string, password: string): Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findByEmail(email);

    if (!user) return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) {
      return { status: 'UNAUTHORIZED', data: { message: 'Invalid email or password' } };
    }

    return { status: 'SUCCESSFUL', data: user };
  }

  static async getRole(token: string | undefined): Promise<ServiceResponse<unknown>> {
    if (!token) return { status: 'UNAUTHORIZED', data: { message: 'Token not found' } };

    try {
      const { role } = await JwtUtils.verify<IUser>(token);
      return { status: 'SUCCESSFUL', data: { role } };
    } catch (error) {
      return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
    }
  }
}

export default UserService;
