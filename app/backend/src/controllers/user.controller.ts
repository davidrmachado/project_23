import { Request, Response } from 'express';
import JWT from '../utils/JWT';
import UserService from '../services';

const fieldMessage = 'All fields must be filled';
const entryMessage = 'Incorrect email or password';

class UserController {
  jwt = new JWT();
  userService = new UserService();

  getUser = async (req: Request, res: Response) => {
    const { authorization } = req.headers;
    const userAccount = await this.userService.findUser(authorization as string);
    if (userAccount) {
      return res.status(200).json({ role: userAccount.role });
    }
  };

  authUser = async (req: Request, res: Response) => {
    const { email } = req.body;
    const { code } = await this.userService.authUser(email);
    const userToken = this.jwt.generateToken(req.body);

    const codeMessage = code === 400 ? fieldMessage : entryMessage;

    if (code !== 200) {
      return res.status(code as number).json({ codeMessage });
    }

    return res.status(code).json({ userToken });
  };
}

export default UserController;
