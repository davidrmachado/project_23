import 'express-async-errors';
import { Router } from 'express';

import { LbController } from '../controllers';

const router = Router();

const lbController = new LbController();

router.get('/away', lbController.awayLeaderboard);
router.get('/home', lbController.homeLeaderboard);
router.get('/', lbController.leaderboard);

export default router;
