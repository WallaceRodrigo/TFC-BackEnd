import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(_req: Request, res: Response): Promise<Response> {
    const serviceResponse = await this.matchesService.findAll();

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  // public async getTeamById(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const serviceResponse = await this.matchesService.findById(Number(id));

  //   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  // }
}

export default MatchesController;
