import { Router } from 'express';
import { MatchController } from '../controllers';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.listMatches.bind(matchController));

export default router;
