import TeamsModel from '../models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ICRUDModelReader } from '../Interfaces/ICRUDTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamsService {
  constructor(
    private teamsModel: ICRUDModelReader<ITeams> = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }
}

export default TeamsService;
