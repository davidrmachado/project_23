import Team from '../database/models/TeamModel';

import { ITeam } from '../interfaces/ITeam';

import HttpException from '../utils/HTTPException';

const Message404 = 'There is no team with such id!';

export default class TeamService {
  constructor(
    private teams = Team,
  ) {}

  public async getAll():Promise<Team[]> {
    const allTeams = await this.teams.findAll();
    return allTeams;
  }

  public async getById(id: string):Promise<ITeam> {
    const team = await this.teams.findByPk(id);
    if (!team) throw new HttpException(404, Message404);
    return team;
  }
}
