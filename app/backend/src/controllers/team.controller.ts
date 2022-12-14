import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  teamService = new TeamService();

  async listAll(_req: Request, res: Response) {
    try {
      const teamsList = await this.teamService.getAll();
      return res.status(200).json(teamsList);
    } catch (error) {
      return res.status(500).json({ errors: { type: 500, message: error } });
    }
  }
}
