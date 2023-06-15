import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const matchesController = new MatchesController();

const matchesRouter = Router();

matchesRouter.get('/', (req, res) => matchesController.getAllMatches(req, res));

matchesRouter.patch('/:id/finish', (req, res) => matchesController.finishMatch(req, res));

matchesRouter.patch('/:id', (req, res) => matchesController.updateMatch(req, res));

export default matchesRouter;
