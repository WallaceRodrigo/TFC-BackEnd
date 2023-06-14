import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import IUser from '../Interfaces/IUser';
import { ICRUDUser } from '../Interfaces/ICRUDUser';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

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
}

export default UserService;
