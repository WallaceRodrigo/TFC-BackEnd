import { Router } from 'express';
import TeamsController from '../controllers/TeamsController';

const teamsController = new TeamsController();

const teamsRouter = Router();

teamsRouter.get('/teams', teamsController.getAllTeams);

export default teamsRouter;
