import { Request, Response } from 'express';
import UserService from '../services/UserService';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import { sign } from '../utils/jwtUtils';

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

    const token = sign(serviceResponse.data);
    return res.status(mapStatusHTTP(serviceResponse.status)).json({ token });
  }
}

export default TeamsController;
