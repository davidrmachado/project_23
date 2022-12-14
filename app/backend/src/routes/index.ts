import { Router } from 'express';

import LoginRouter from './user.routes';
import TeamRouter from './team.routes';

const router = Router();

router.use('/login', LoginRouter);
router.use('/teams', TeamRouter);

export default router;
