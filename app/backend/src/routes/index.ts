import { Router } from 'express';

import LoginRouter from './user.routes';

const router = Router();

router.use('/login', LoginRouter);

export default router;
