import { Router } from 'express';

import LoginRouter from './user.routes';
import TeamRouter from './team.routes';
import MatchRouter from './match.routes';

const router = Router();

router.use('/login', LoginRouter);
router.use('/teams', TeamRouter);
router.use('/matches', MatchRouter);

export default router;
