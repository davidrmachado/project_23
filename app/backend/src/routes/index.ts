import { Router } from 'express';

import LoginRouter from './user.routes';
import TeamRouter from './team.routes';
import MatchRouter from './match.routes';
import LbRouter from './lb.routes';

const router = Router();

router.use('/matches', MatchRouter);

router.use('/teams', TeamRouter);

router.use('/login', LoginRouter);

router.use('/leaderboard', LbRouter);

export default router;
