import { Request, Response } from 'express';
import { MatchService } from '../services';

const errorMessage = 'Inserted parameter incorrect';

export default class MatchController {
  private _matchService = new MatchService();

  constructor() {
    this.listMatches = this.listMatches.bind(this);
    this.listMatchById = this.listMatchById.bind(this);
    this.postMatch = this.postMatch.bind(this);
    this.updateMatch = this.updateMatch.bind(this);
    this.updateOnGoingMatch = this.updateOnGoingMatch.bind(this);
  }

  async listMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const { type, message } = await this._matchService.getPlayedMatches(inProgress as string);
        return res.status(type as number).json(message);
      }

      const allMatches = await this._matchService.listAllMatches();
      return res.status(200).json(allMatches);
    } catch (error) {
      res.status(400).json({ errorMessage: { type: 400, description: errorMessage } });
    }
  }

  async listMatchById(req: Request, res: Response) {
    const { id } = req.params;

    const results = await this._matchService.listMatchById(id);

    res.status(200).json(results);
  }

  async postMatch(req: Request, res: Response) {
    const data = req.body;
    const results = await this._matchService.postMatch(data);
    res.status(201).json(results);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this._matchService.updateCurrentMatch(id);

    return res.status(200).json({ message: 'Finished' });
  }

  async updateOnGoingMatch(req: Request, res: Response) {
    const { id } = req.params;

    const results = await this._matchService.updateOnGoingMatch(id, req.body);

    res.status(200).json({ updatedScore: results });
  }
}
