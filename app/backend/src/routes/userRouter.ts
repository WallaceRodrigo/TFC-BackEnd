import { Router } from 'express';
import UserController from '../controllers/UserController';
import Validations from '../middlewares/validations';

const userController = new UserController();

const userRouter = Router();

userRouter.post('/', Validations.validateUser, (req, res) => userController.login(req, res));

export default userRouter;
