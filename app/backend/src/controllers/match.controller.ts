import { Request, Response } from 'express';
import { MatchService } from '../services';

export default class MatchController {
  matchService = new MatchService();

  async listMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    try {
      if (inProgress) {
        const { type, message } = await this.matchService.getPlayedMatches(inProgress as string);
        return res.status(type as number).json(message);
      }

      const allMatches = await this.matchService.listAllMatches();
      return res.status(200).json(allMatches);
    } catch (error) {
      res.status(400).json({ errorMessage: { type: 400 } });
    }
  }

  async postMatch(req: Request, res: Response) {
    const matchInfo = req.body;

    const { type, message } = await this.matchService.postMatch(matchInfo);
    if (type !== 201) {
      return res.status(type as number).json({ message });
    }
    return res.status(type as number).json(message);
  }

  async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    await this.matchService.updateCurrentMatch(id);

    return res.status(200).json({ message: 'Finished' });
  }
}
