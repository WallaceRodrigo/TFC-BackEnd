// import IMatches from '../Interfaces/IMatches';
// import { ICRUDLeaderBoard } from '../Interfaces/ICRUDLeaderBoard';
// import ILeaderBoard from '../Interfaces/ILeaderBoard';
// import SequelizeMatches from '../database/models/SequelizeMatches';
// import TeamsModel from './TeamsModel';

// export type NewEntity<T> = Omit<T, 'id'>;

// export default class leaderBoardModel implements ICRUDLeaderBoard<ILeaderBoard> {
//   private model = SequelizeMatches;
//   private teamModel = new TeamsModel();

//   async calcLeaderBoard(dbData: IMatches[]): Promise<ILeaderBoard[]> {
    
//   }

//   async mapHomeLeaderBoard(dbData: IMatches[]): Promise<ILeaderBoard[]> {
//     const matchInfos = dbData.map(async ({
//       id, homeTeamId, homeTeamGoals, awayTeamId, awayTeamGoals, inProgress,
//     }) => {
//       const homeTeam = await this.teamModel.findById(homeTeamId);

//       return {
//         name: { homeTeam: { teamName: homeTeam?.teamName } },
//         id,
//         homeTeamId,
//         homeTeamGoals,
//       };
//     });

//     return Promise.all(matchInfos);
//   }

//   async findAll(): Promise<ILeaderBoard[]> {
//     const dbData = await this.model.findAll({ where: { inProgress: false } });

//     const homeTeam = await this.mapHomeLeaderBoard(dbData);

//     return homeTeam;
//   }
// }

// // - `Classificação`: Posição na classificação;
// // - `Time`: Nome do time;
// // - `P`: Total de Pontos;
// // - `J`: Total de Jogos;
// // - `V`: Total de Vitórias;
// // - `E`: Total de Empates;
// // - `D`: Total de Derrotas;
// // - `GP`: Gols marcados a favor;
// // - `GC`: Gols sofridos;
// // - `SG`: Saldo total de gols;
// // - `%`: Aproveitamento do time.

// // {
// //   "name": "Palmeiras",
// //   "totalPoints": 13,
// //   "totalGames": 5,
// //   "totalVictories": 4,
// //   "totalDraws": 1,
// //   "totalLosses": 0,
// //   "goalsFavor": 17,
// //   "goalsOwn": 5,
// //   "goalsBalance": 12,
// //   "efficiency": 86.67
// // },
