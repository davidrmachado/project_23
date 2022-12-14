import Teams from '../database/models/TeamModel';
import ILogin from '../interfaces/ILogin';

const Message404 = 'There is no team with such id!';

export default class TeamService {
  constructor(
    private teams = Teams,
  ) {}

  public async getAll():Promise<Teams[]> {
    const allTeams = await this.teams.findAll();
    return allTeams;
  }

  public async getById(id: string):Promise<ILogin> {
    const team = await this.teams.findByPk(id);
    if (team) {
      return { type: null, message: team };
    }
    return { type: 404, message: Message404 };
  }
}
