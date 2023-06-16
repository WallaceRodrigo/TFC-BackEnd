import { ICRUDMatches } from '../Interfaces/ICRUDMatches';
import IMatches from '../Interfaces/IMatches';
import SequelizeMatches from '../database/models/SequelizeMatches';
import TeamsModel from './TeamsModel';

export type NewEntity<T> = Omit<T, 'id'>;

export default class MatchesModel implements ICRUDMatches<IMatches> {
  private model = SequelizeMatches;
  private teamModel = new TeamsModel();

  async mapMatches(dbData: IMatches[]): Promise<IMatches[]> {
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

    return Promise.all(matchInfos) as Promise<IMatches[]>;
  }

  async findAll(): Promise<IMatches[]> {
    const dbData = await this.model.findAll();

    return this.mapMatches(dbData);
  }

  async findByInProgress(inProgress: boolean): Promise<IMatches[] | null> {
    const dbData = await this.model.findAll({ where: { inProgress } });
    if (!dbData) return null;

    return this.mapMatches(dbData);
  }

  async updateMatch(id: number, match: Partial<IMatches>): Promise<IMatches | null> {
    const [affectedRows] = await this.model.update(match, { where: { id } });

    if (affectedRows === 0) return null;

    const dbData = await this.model.findAll({ where: { id } });
    const actualMatch = await this.mapMatches(dbData);
    return actualMatch[0];
  }

  async create(data: NewEntity<IMatches>): Promise<IMatches> {
    const { id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    } = await this.model.create({ ...data, inProgress: true });

    return {
      id,
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress,
    };
  }

  async findById(id: IMatches['id']): Promise<IMatches | null> {
    const dbData = await this.model.findOne({ where: { id } });
    if (!dbData) return null;

    return dbData;
  }
}
