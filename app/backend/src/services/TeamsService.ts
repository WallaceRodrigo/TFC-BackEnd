import TeamsModel from '../models/TeamsModel';
import ITeams from '../Interfaces/ITeams';
import { ICRUDTeam } from '../Interfaces/ICRUDTeams';
import { ServiceResponse } from '../Interfaces/ServiceResponse';

class TeamsService {
  constructor(
    private teamsModel: ICRUDTeam<ITeams> = new TeamsModel(),
  ) {}

  public async getAllTeams(): Promise<ServiceResponse<ITeams[]>> {
    const allTeams = await this.teamsModel.findAll();
    return { status: 'SUCCESSFUL', data: allTeams };
  }

  public async getTeamById(id: number): Promise<ServiceResponse<ITeams>> {
    const team = await this.teamsModel.findById(id);

    if (!team) return { status: 'NOT_FOUND', data: { message: 'Team not found' } };

    return { status: 'SUCCESSFUL', data: team };
  }
}

export default TeamsService;
