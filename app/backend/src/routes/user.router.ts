import * as express from 'express';

import UserController from '../controllers';

const router = express.Router();

const userController = new UserController();

router.post('/', userController.authUser.bind(userController));

router.get('/validate', userController.getUser.bind(userController));

export default router;
