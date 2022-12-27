import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import { ILeaderboard, IMatchInfo } from '../interfaces/ILeaderboard';

export default class LbService {
  private _team: Team[] = [];
  private _match: IMatchInfo[] = [];
  private _teamInfo: ILeaderboard[] = [];

  private async listTeams() {
    this._team = await Team.findAll();
    const allTeams = await Team.findAll();
    return allTeams;
  }

  private async listMatches() {
    this._match = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return this._match;
  }

  private teamData() {
    this._teamInfo = this._team.map((team) => {
      const stats = {
        name: team.teamName,
        totalPoints: 0,
        totalGames: 0,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 0,
        goalsOwn: 0,
        goalsBalance: 0,
        efficiency: 0,
      };
      return stats;
    });
  }

  private calculateHomePoints() {
    this._teamInfo.forEach((team) => {
      this._match.forEach((game) => {
        if (team.name === game.teamHome?.teamName) {
          const teamX = team;
          if (game.homeTeamGoals > game.awayTeamGoals) {
            teamX.totalVictories += 1;
            teamX.totalPoints += 3;
          }
          if (game.homeTeamGoals === game.awayTeamGoals) {
            teamX.totalDraws += 1;
            teamX.totalPoints += 1;
          }
          if (game.homeTeamGoals < game.awayTeamGoals) teamX.totalLosses += 1;
          return teamX;
        }
      });
    });
    this.homeTeamData();
  }

  private calculateAwayPoints() {
    this._teamInfo.forEach((team) => {
      this._match.forEach((game) => {
        if (team.name === game.teamAway?.teamName) {
          const teamX = team;
          if (game.homeTeamGoals < game.awayTeamGoals) {
            teamX.totalVictories += 1;
            teamX.totalPoints += 3;
          }
          if (game.homeTeamGoals === game.awayTeamGoals) {
            teamX.totalDraws += 1;
            teamX.totalPoints += 1;
          }
          if (game.homeTeamGoals > game.awayTeamGoals) teamX.totalLosses += 1;
          return teamX;
        }
      });
    });
    this.awayTeamData();
  }

  private homeTeamData() {
    this._teamInfo.forEach((team) => {
      this._match.forEach((game) => {
        if (team.name === game.teamHome?.teamName) {
          const teamX = team;
          teamX.totalGames += 1;
          teamX.goalsFavor += game.homeTeamGoals;
          teamX.goalsOwn += game.awayTeamGoals;
          teamX.goalsBalance = team.goalsFavor - team.goalsOwn;
          teamX.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
          return teamX;
        }
      });
    });
  }

  private awayTeamData() {
    this._teamInfo.forEach((team) => {
      this._match.forEach((game) => {
        if (team.name === game.teamAway?.teamName) {
          const teamX = team;
          teamX.totalGames += 1;
          teamX.goalsFavor += game.awayTeamGoals;
          teamX.goalsOwn += game.homeTeamGoals;
          teamX.goalsBalance = team.goalsFavor - team.goalsOwn;
          teamX.efficiency = Number(((team.totalPoints / (team.totalGames * 3)) * 100).toFixed(2));
          return teamX;
        }
      });
    });
  }

  public leaderboard(str?: string) {
    this.listTeams();
    this.listMatches();
    this.teamData();

    if (!str) {
      this.calculateHomePoints();
      this.calculateAwayPoints();
    }
    if (str === 'home') {
      this.calculateHomePoints();
    }
    if (str === 'away') {
      this.calculateAwayPoints();
    }

    const placement = [...this._teamInfo].sort((a, b) =>
      b.totalPoints - a.totalPoints || b.totalVictories - a.totalVictories || b.goalsBalance
      - a.goalsBalance || b.goalsFavor - a.goalsFavor || b.goalsOwn + a.goalsOwn);

    return placement;
  }
}
