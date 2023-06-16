import { calcLeaderBoard, orderLeaderBoard } from '../utils/LeaderBoardsCalcs';
import ILeaderBoard from '../Interfaces/ILeaderBoard';
import { ServiceResponse } from '../Interfaces/ServiceResponse';
import MatchesModel from '../models/MatchesModel';
import IMatches from '../Interfaces/IMatches';
import { ICRUDMatches } from '../Interfaces/ICRUDMatches';
// import MatchesService from './MatchesService';
// import JwtUtils from '../utils/jwtUtils';

class LeaderBoardService {
  constructor(
    private matchesModel: ICRUDMatches<IMatches> = new MatchesModel(),
    // private matchesService = new MatchesService(),
  ) {}

  async findByInProgress(query: string): Promise<IMatches[] | null> {
    if (query === 'true') {
      return this.matchesModel.findByInProgress(true);
    }

    return this.matchesModel.findByInProgress(false);
  }

  async getHomeLeaderBoard(): Promise<ServiceResponse<ILeaderBoard[]>> {
    const allHomeMatches = await this.findByInProgress('false');

    const HomeLeaderBoard = allHomeMatches?.map(
      (homeMatch) => (calcLeaderBoard(homeMatch, allHomeMatches)),
    );

    const finishLeaderBoard = orderLeaderBoard(HomeLeaderBoard);

    return { status: 'SUCCESSFUL', data: finishLeaderBoard };
  }
}

export default LeaderBoardService;
