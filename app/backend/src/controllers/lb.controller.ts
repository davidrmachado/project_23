import { Request, Response } from 'express';
import { LbService } from '../services';

export default class LbController {
  private _lbService = new LbService();

  constructor() {
    this.leaderboard = this.leaderboard.bind(this);
    this.homeLeaderboard = this.homeLeaderboard.bind(this);
    this.awayLeaderboard = this.awayLeaderboard.bind(this);
  }

  async leaderboard(_req: Request, res: Response) {
    const result = this._lbService.leaderboard();

    res.status(200).json(result);
  }

  async homeLeaderboard(_req: Request, res: Response) {
    const result = this._lbService.leaderboard('home');

    res.status(200).json(result);
  }

  async awayLeaderboard(_req: Request, res: Response) {
    const result = this._lbService.leaderboard('away');

    res.status(200).json(result);
  }
}
