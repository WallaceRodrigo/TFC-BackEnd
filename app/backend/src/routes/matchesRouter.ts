import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));

// matchesRouter.get('/:id', (req, res) => teamsController.getTeamById(req, res));

export default matchesRouter;
