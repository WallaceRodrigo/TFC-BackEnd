import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class TeamsController {
  constructor(
    private teamsService = new TeamsService(),
  ) {}

  public async getAllTeams(_req: Request, res: Response): Promise<void> {
    const serviceResponse = await this.teamsService.getAllTeams();

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async getTeamById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const serviceResponse = await this.teamsService.getTeamById(Number(id));

    res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default TeamsController;
