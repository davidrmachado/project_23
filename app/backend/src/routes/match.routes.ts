import 'express-async-errors';
import { Router } from 'express';
import { MatchController } from '../controllers';
import loginValidation from '../utils/login.validation';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.listMatches.bind(matchController));

router.get('/:id', matchController.listMatchById);
router.patch('/:id', loginValidation, matchController.updateOnGoingMatch);

router.post('/', loginValidation, matchController.postMatch.bind(matchController));
router.patch('/:id/finish', loginValidation, matchController.updateMatch.bind(matchController));

export default router;
