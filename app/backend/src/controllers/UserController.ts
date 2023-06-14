import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import jwtUtils from '../utils/jwtUtils';

class TeamsController {
  constructor(
    private userService = new UserService(),
  ) {}

  public async login(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body;

    const serviceResponse = await this.userService.getUserByEmail(email, password);

    if (mapStatusHTTP(serviceResponse.status) !== 200) {
      return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
    }

    const token = jwtUtils.sign(serviceResponse.data);
    return res.status(mapStatusHTTP(serviceResponse.status)).json({ token });
  }

  static async getRole(req: Request, res: Response): Promise<Response> {
    const token = req.headers.authorization;

    const serviceResponse = await UserService.getRole(token);

    return res.status(mapStatusHTTP(serviceResponse.status)).json(serviceResponse.data);
  }
}

export default TeamsController;
