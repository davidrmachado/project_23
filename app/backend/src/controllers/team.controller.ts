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

  async findById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { type, message } = await this.teamService.getById(id);
      if (type) {
        return res.status(type as number).json({ message });
      }

      return res.status(200).json(message);
    } catch (error) {
      return res.status(500).json({ errors: { type: 500, message: error } });
    }
  }
}
