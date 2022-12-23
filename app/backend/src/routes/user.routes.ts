import * as express from 'express';

import { UserController } from '../controllers';

import loginValidation from '../utils/login.validation';

const router = express.Router();

const userController = new UserController();

router.get('/validate', loginValidation, userController.getUser.bind(userController));

router.post('/', userController.authUser.bind(userController));

export default router;
