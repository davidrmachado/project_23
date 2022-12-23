import 'express-async-errors';
import { Router } from 'express';
import TeamController from '../controllers/team.controller';

const router = Router();

const teamController = new TeamController();

router.get('/', teamController.listAll.bind(teamController));

router.get('/:id', teamController.findById.bind(teamController));

export default router;
