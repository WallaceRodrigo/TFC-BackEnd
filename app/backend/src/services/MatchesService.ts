import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ICRUDMatches } from '../Interfaces/ICRUDMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
// import JwtUtils from '../utils/jwtUtils';

class MatchesService {
  constructor(
    private matchesModel: ICRUDMatches<IMatches> = new MatchesModel(),
  ) {}

  public async findAll(): Promise<ServiceResponse<IMatches[]>> {
    const matches = await this.matchesModel.findAll();

    return { status: 'SUCCESSFUL', data: matches };
  }

  async findByInProgress(query: string): Promise<ServiceResponse<IMatches[] | null>> {
    if (query === 'true') {
      const matches = await this.matchesModel.findByInProgress(true);
      return { status: 'SUCCESSFUL', data: matches };
    }

    const matches = await this.matchesModel.findByInProgress(false);
    return { status: 'SUCCESSFUL', data: matches };
  }

  // public async findById(id: number): Promise<ServiceResponse<IMatches>> {
  //   const match = await this.matchesModel.findById(id);

  //   if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

  //   return { status: 'SUCCESSFUL', data: match };
  // }

  // async findByInProgress(id:number, token: string | undefined): Promise<ServiceResponse<unknown>> {
  //   if (!token) return { status: 'UNAUTHORIZED', data: { message: 'Token not found' } };

  //   try {
  //     const { role } = await JwtUtils.verify(token);
  //     return { status: 'SUCCESSFUL', data: { role } };
  //   } catch (error) {
  //     return { status: 'UNAUTHORIZED', data: { message: 'Token must be a valid token' } };
  //   }
  // }
}

export default MatchesService;
