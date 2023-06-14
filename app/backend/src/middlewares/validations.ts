import { NextFunction, Request, Response } from 'express';

class Validations {
  static validateUser(req: Request, res: Response, next: NextFunction): Response | void {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    // if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    //   return res.status(400).json({ message: 'Email must be valid' });
    // }

    // if (password.length < 6) {
    //   return res.status(400).json({ message: 'Password must have 6 or more characters' });
    // }

    return next();
  }
}

export default Validations;
