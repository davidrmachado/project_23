import { Request, Response } from 'express';
import UserService from '../services';
import JWT from '../utils/JWT';

const fieldMessage = 'All fields must be filled';
const entryMessage = 'Incorrect email or password';

export default class LoginController {
  userService = new UserService();
  jwt = new JWT();

  async getUser(req: Request, res: Response) {
    const { authorization } = req.headers;
    const result = await this.userService.findUser(authorization as string);
    if (result) {
      return res.status(200).json({ role: result.role });
    }
  }

  async authUser(req: Request, res: Response) {
    const { email, password } = req.body;
    const { type } = await this.userService.authLogin(email, password);

    if (type !== 200) {
      const message = type === 400 ? fieldMessage : entryMessage;
      return res.status(type as number).json({ message });
    }

    const token = this.jwt.generateToken(req.body);
    return res.status(type).json({ token });
  }
}
