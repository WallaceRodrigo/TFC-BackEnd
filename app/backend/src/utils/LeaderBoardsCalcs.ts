import ILeaderBoard from '../Interfaces/ILeaderBoard';
import IMatches from '../Interfaces/IMatches';

export const allGames = (homeMatch: IMatches, allMatches: IMatches[]) => {
  const TotalGamesHomeMatch = allMatches.filter((match) =>
    (match.homeTeam?.teamName === homeMatch.homeTeam?.teamName));

  return TotalGamesHomeMatch;
};

export const calcWinLossDraw = (homeMatch: IMatches, allMatches: IMatches[]) => {
  const TotalGamesHomeMatch = allGames(homeMatch, allMatches);

  let win = 0;
  let loss = 0;
  let draw = 0;

  TotalGamesHomeMatch.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) win += 1;
    if (match.homeTeamGoals < match.awayTeamGoals) loss += 1;
    if (match.homeTeamGoals === match.awayTeamGoals) draw += 1;
  });

  return { win, loss, draw };
};

export const calcPoints = (homeMatch: IMatches, allMatches: IMatches[]) => {
  const TotalGamesHomeMatch = allGames(homeMatch, allMatches);

  let totalPoints = 0;

  TotalGamesHomeMatch.forEach((match) => {
    if (match.homeTeamGoals > match.awayTeamGoals) totalPoints += 3;
    if (match.homeTeamGoals === match.awayTeamGoals) totalPoints += 1;
  });

  return totalPoints;
};

export const calcGoals = (homeMatch: IMatches, allMatches: IMatches[]) => {
  const TotalGamesHomeMatch = allGames(homeMatch, allMatches);

  let goalsFavor = 0;
  let goalsOwn = 0;

  TotalGamesHomeMatch.forEach((match) => {
    goalsFavor += match.homeTeamGoals;
    goalsOwn += match.awayTeamGoals;
  });

  return { goalsFavor, goalsOwn };
};

export const calcEfficiency = (homeMatch: IMatches, allMatches: IMatches[]) => {
  const TotalGamesHomeMatch = allGames(homeMatch, allMatches);
  const totalPoints = calcPoints(homeMatch, allMatches);
  const totalGames = TotalGamesHomeMatch.length;

  return (totalPoints / (totalGames * 3)) * 100;
};

export const calcLeaderBoard = (homeMatch: IMatches, allMatches: IMatches[]) => {
  const TotalGamesHomeMatch = allGames(homeMatch, allMatches);
  const winLossDraw = calcWinLossDraw(homeMatch, allMatches);
  const totalPoints = calcPoints(homeMatch, allMatches);
  const totalGoals = calcGoals(homeMatch, allMatches);
  const efficiency = Number(calcEfficiency(homeMatch, allMatches).toFixed(2));

  return {
    name: homeMatch.homeTeam?.teamName,
    totalPoints,
    totalGames: TotalGamesHomeMatch.length,
    totalVictories: winLossDraw.win,
    totalDraws: winLossDraw.draw,
    totalLosses: winLossDraw.loss,
    goalsFavor: totalGoals.goalsFavor,
    goalsOwn: totalGoals.goalsOwn,
    goalsBalance: totalGoals.goalsFavor - totalGoals.goalsOwn,
    efficiency,
  };
};

export const orderLeaderBoard = (leaderBoard: ILeaderBoard[]) => {
  const removeDuplicate = leaderBoard.reduce<ILeaderBoard[]>((acc, cur) => {
    const existingItem = acc.find((el: ILeaderBoard) => el.name === cur.name);
    if (!existingItem) {
      acc.push(cur);
    }
    return acc;
  }, []);

  return removeDuplicate.sort((a: ILeaderBoard, b: ILeaderBoard) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    return a.goalsOwn - b.goalsOwn;
  });
};
