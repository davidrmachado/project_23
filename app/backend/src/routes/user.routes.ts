import * as express from 'express';

import UserController from '../controllers';

const router = express.Router();

const userController = new UserController();

router.get('/validate', userController.getUser.bind(userController));

router.post('/', userController.authUser.bind(userController));

export default router;
