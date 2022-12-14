import Teams from '../database/models/TeamModel';
import ILogin from '../interfaces/ILogin';

export default class TeamService {
  constructor(
    private teams = Teams,
  ) {}

  public async getAll():Promise<Teams[]> {
    const allTeams = await this.teams.findAll();
    return allTeams;
  }

  public async getTeamById(id: string):Promise<ILogin> {
    const teamById = await this.teams.findByPk(id);
    if (!teamById) return { type: 404, message: 'Not found' };
    return { type: null, message: teamById };
  }
}
