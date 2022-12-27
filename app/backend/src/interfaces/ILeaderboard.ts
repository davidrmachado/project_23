import Matches from '../database/models/MatchModel';

export interface ILeaderboard {
  name: string,
  totalPoints: number,
  totalGames: number,
  totalVictories: number,
  totalDraws: number,
  totalLosses: number,
  goalsFavor: number,
  goalsOwn: number,
  goalsBalance: number,
  efficiency: number | string,
}

interface ITeamInfo {
  teamName: string
}

export interface IMatchInfo extends Matches {
  teamHome?: ITeamInfo;
  teamAway?: ITeamInfo;
}
