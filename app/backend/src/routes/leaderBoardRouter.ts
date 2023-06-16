import { Router } from 'express';
import LeaderBoardController from '../controllers/LeaderBoardController';

const leaderBoardController = new LeaderBoardController();

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', (req, res) => leaderBoardController.getLeaderBoard(req, res));

export default leaderBoardRouter;
