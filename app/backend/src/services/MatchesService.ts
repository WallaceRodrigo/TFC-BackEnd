import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ICRUDMatches } from '../Interfaces/ICRUDMatches';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import JwtUtils from '../utils/jwtUtils';

const TOKEN_NOT_FOUND = 'Token not found';
const MATH_NOT_FOUND = 'Match not found';
const TOKEN_MUST_BE_VALID = 'Token must be a valid token';

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

  async finishMatch(id:number, token: string | undefined): Promise<ServiceResponse<unknown>> {
    if (!token) return { status: 'UNAUTHORIZED', data: { message: TOKEN_NOT_FOUND } };

    try {
      await JwtUtils.verify(token);

      const update = { inProgress: false };
      const match = await this.matchesModel.updateMatch(id, update);

      if (!match) return { status: 'NOT_FOUND', data: { message: MATH_NOT_FOUND } };

      return { status: 'SUCCESSFUL', data: { message: 'Finished' } };
    } catch (error) {
      return { status: 'UNAUTHORIZED', data: { message: TOKEN_MUST_BE_VALID } };
    }
  }

  async updateMatch(id:number, token: string | undefined, update: Partial<IMatches>)
    : Promise<ServiceResponse<unknown>> {
    if (!token) return { status: 'UNAUTHORIZED', data: { message: TOKEN_NOT_FOUND } };

    try {
      await JwtUtils.verify(token);

      const match = await this.matchesModel.updateMatch(id, update);

      return { status: 'SUCCESSFUL', data: match };
    } catch (error) {
      return { status: 'UNAUTHORIZED', data: { message: TOKEN_MUST_BE_VALID } };
    }
  }

  async createMatch(token:string | undefined, match: IMatches): Promise<ServiceResponse<IMatches>> {
    if (!token) return { status: 'UNAUTHORIZED', data: { message: TOKEN_NOT_FOUND } };

    try {
      await JwtUtils.verify(token);

      const { homeTeamId, awayTeamId } = match;
      if (homeTeamId === awayTeamId) {
        return { status: 'UNPROCESSABLE_ENTITY',
          data: { message: 'It is not possible to create a match with two equal teams' } };
      }

      const homeTeamIdExists = await this.matchesModel.findById(homeTeamId);
      const awayTeamIdIdExists = await this.matchesModel.findById(awayTeamId);

      if (!homeTeamIdExists || !awayTeamIdIdExists) {
        return { status: 'NOT_FOUND', data: { message: 'There is no team with such id!' } };
      }

      const newMatch = await this.matchesModel.create(match);

      return { status: 'CREATED', data: newMatch };
    } catch (error) {
      return { status: 'UNAUTHORIZED', data: { message: TOKEN_MUST_BE_VALID } };
    }
  }

  // public async findById(id: number): Promise<ServiceResponse<IMatches>> {
  //   const match = await this.matchesModel.findById(id);

  //   if (!match) return { status: 'NOT_FOUND', data: { message: 'Match not found' } };

  //   return { status: 'SUCCESSFUL', data: match };
  // }
}

export default MatchesService;
