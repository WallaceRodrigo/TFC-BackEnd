import { ICRUDMatches } from '../Interfaces/ICRUDMatches';
import IMatches from '../Interfaces/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import TeamsModel from './TeamsModel';

export default class MatchesModel implements ICRUDMatches<IMatches> {
  private model = SequelizeMatches;
  private teamModel = new TeamsModel();

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll();
    const matchInfos = dbData.map(async ({
      id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
    }) => {
      const homeTeam = await this.teamModel.findById(homeTeamId);
      const awayTeam = await this.teamModel.findById(awayTeamId);

      return {
        id,
        homeTeamId,
        homeTeamGoals,
        awayTeamId,
        awayTeamGoals,
        inProgress,
        homeTeam: { teamName: homeTeam?.teamName },
        awayTeam: { teamName: awayTeam?.teamName },
      };
    });

    return Promise.all(matchInfos);
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (!dbData) return null;

    return dbData;
  }

  async findByInProgress(inProgress: boolean): Promise<IMatches[] | null> {
    const dbData = await this.model.findAll({ where: { inProgress } });
    if (!dbData) return null;

    return dbData;
  }
}
