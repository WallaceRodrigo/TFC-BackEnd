import { ICRUDUser } from '../Interfaces/ICRUDUser';
import SequelizeUser from '../database/models/SequelizeUser';
import IUser from '../Interfaces/IUser';

export default class UserModel implements ICRUDUser<IUser> {
  private model = SequelizeUser;

  async findByEmail(email: IUser['email']): Promise<IUser | null> {
    const dbData = await this.model.findOne({ where: { email } });

    if (!dbData) return null;

    const { id, username, role, password } = dbData;
    return { id, username, role, email, password };
  }
}
