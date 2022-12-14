import ILogin from '../interfaces/ILogin';
import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import TeamService from './team.service';

const message404 = 'There is no team with such id!';
const message422 = 'It is not possible to create a match with two equal teams';

export default class MatchService {
  teamService = new TeamService();
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

  public async postMatch(matchInfo: IMatch): Promise<ILogin> {
    const { homeTeam, awayTeam } = matchInfo;
    const resident = this.teamService.getById(homeTeam);
    const visitor = this.teamService.getById(awayTeam);

    if (homeTeam === awayTeam) {
      return { type: 422, message: message422 };
    }
    if ((await resident).type || (await visitor).type === 404) {
      return { type: 404, message: message404 };
    }

    const newMatch = await this.matches.create({ ...matchInfo, inProgress: 1 });
    return { type: 201, message: newMatch };
  }

  public async updateCurrentMatch(id: string): Promise<void> {
    await this.matches.update({ inProgress: 0 }, { where: { id } });
  }
}
