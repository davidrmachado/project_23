import ILogin from '../interfaces/ILogin';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

import { IMatch, IUpdateMatch } from '../interfaces/IMatch';
import HttpException from '../utils/HTTPException';

const message404 = 'There is no team with such id!';
const message422 = 'It is not possible to create a match with two equal teams';

export default class MatchService {
  constructor(
    private matches = Match,
    private _teamModel = Team,
  ) {}

  public async listAllMatches(): Promise<Match[]> {
    const results = await this.matches.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return results;
  }

  public async listMatchById(id: string): Promise<Match> {
    const result = await this.matches.findByPk(id);

    if (!result) throw new HttpException(404, message404);

    return result;
  }

  public async getPlayedMatches(str: string): Promise<ILogin> {
    const inProgress = JSON.parse(str);
    const results = await this.matches.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    if (results) {
      return { type: 200, message: results };
    }
    return { type: 404, message: 'Not found' };
  }

  public async validateMatch({ homeTeam, awayTeam }: IMatch) {
    if (homeTeam === awayTeam) {
      throw new HttpException(422, message422);
    }

    const teamHome = await this._teamModel.findByPk(homeTeam);
    const teamAway = await this._teamModel.findByPk(awayTeam);

    if (!teamHome || !teamAway) {
      throw new HttpException(404, message404);
    }
  }

  public async postMatch(matchInfo: IMatch): Promise<Match> {
    await this.validateMatch(matchInfo);

    const match = await this.matches.create({ ...matchInfo, inProgress: 1 });
    return match;
  }

  public async updateCurrentMatch(id: string): Promise<void> {
    await this.matches.update({ inProgress: 0 }, { where: { id } });
  }

  public async updateOnGoingMatch(id: string, updateParams: IUpdateMatch): Promise<Match | null> {
    const { homeTeamGoals, awayTeamGoals } = updateParams;
    const result = this.matches.findByPk(id);
    if (!result) throw new HttpException(404, message404);
    await this.matches.update({ homeTeamGoals, awayTeamGoals }, { where: { id } });

    return result;
  }
}
