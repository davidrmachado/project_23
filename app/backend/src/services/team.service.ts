import Teams from '../database/models/TeamModel';

export default class TeamService {
  constructor(
    private teams = Teams,
  ) {}

  public async getAll():Promise<Teams[]> {
    const allTeams = await this.teams.findAll();
    return allTeams;
  }
}
