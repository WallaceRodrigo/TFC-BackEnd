import { ICRUDModelReader } from '../Interfaces/ICRUDTeams';
import SequelizeTeams from '../database/models/SequelizeTeams';
import ITeams from '../Interfaces/ITeams';

export default class TeamsModel implements ICRUDModelReader<ITeams> {
  private model = SequelizeTeams;

  async findAll(): Promise<ITeams[]> {
    const dbData = await this.model.findAll();
    return dbData.map(({ id, teamName }) => ({ id, teamName }));
  }

  async findById(id: ITeams['id']): Promise<ITeams | null> {
    const dbData = await this.model.findByPk(id);
    if (!dbData) return null;

    const { teamName } = dbData;

    return { id, teamName };
  }
}
