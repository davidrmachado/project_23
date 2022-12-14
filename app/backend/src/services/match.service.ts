import ILogin from '../interfaces/ILogin';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export default class MatchService {
  constructor(
    private matches = Match,
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
}
