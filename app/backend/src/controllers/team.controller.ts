import { Request, Response } from 'express';
import { TeamService } from '../services';

export default class TeamController {
  private _teamService = new TeamService();

  constructor() {
    this.listAll = this.listAll.bind(this);
    this.findById = this.findById.bind(this);
  }

  async listAll(_req: Request, res: Response) {
    const result = await this._teamService.getAll();
    res.status(200).json(result);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await this._teamService.getById(id);
    res.status(200).json(result);
  }
}
