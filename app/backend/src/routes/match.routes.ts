import { Router } from 'express';
import { MatchController } from '../controllers';
import loginValidation from '../utils/login.validation';

const router = Router();

const matchController = new MatchController();

router.get('/', matchController.listMatches.bind(matchController));

router.post('/', loginValidation, matchController.postMatch.bind(matchController));
router.patch('/:id/finish', loginValidation, matchController.updateMatch.bind(matchController));

export default router;
