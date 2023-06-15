import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';
import mapStatusHTTP from '../utils/mapStatusHTTP';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
  ) {}

  public async getAllMatches(req: Request, res: Response): Promise<Response> {
    const query = req.query.inProgress;

    if (query === undefined) {
      const serviceResponse = await this.matchesService.findAll();
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    const serviceResponse = await this.matchesService.findByInProgress(query as string);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const token = req.headers.authorization;

    const serviceResponse = await this.matchesService.finishMatch(Number(id), token);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  public async updateMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const token = req.headers.authorization;

    const serviceResponse = await this.matchesService.updateMatch(Number(id), token, req.body);
    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }

  // public async getTeamById(req: Request, res: Response): Promise<Response> {
  //   const { id } = req.params;

  //   const serviceResponse = await this.matchesService.findById(Number(id));

  //   return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  // }
}

export default MatchesController;
