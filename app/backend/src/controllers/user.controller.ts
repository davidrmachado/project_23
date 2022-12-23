import { Request, Response } from 'express';
import { UserService } from '../services';
import JWT from '../utils/JWT';

const fieldMessage = 'All fields must be filled';
const entryMessage = 'Incorrect email or password';
const userMessage = 'User not found';

export default class LoginController {
  private _userService = new UserService();
  jwt = new JWT();

  async getUser(req: Request, res: Response) {
    const { authorization } = req.headers;
    const result = await this._userService.findUser(authorization as string);
    if (result) {
      return res.status(200).json({ role: result.role });
    }
    return res.status(401).json({ message: userMessage });
  }

  async authUser(req: Request, res: Response) {
    const { type } = await this._userService.authLogin(req.body);

    if (type !== 200) {
      const message = type === 400 ? fieldMessage : entryMessage;
      return res.status(type as number).json({ message });
    }

    const token = this.jwt.generateToken(req.body);
    return res.status(type).json({ token });
  }
}
