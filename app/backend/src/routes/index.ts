import { Router } from 'express';

import LoginRouter from './user.routes';
import TeamRouter from './team.routes';
import MatchRouter from './match.routes';

const router = Router();

router.use('/matches', MatchRouter);

router.use('/teams', TeamRouter);

router.use('/login', LoginRouter);

export default router;
