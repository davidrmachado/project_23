import * as bcryptjs from 'bcryptjs';

import ILogin from '../interfaces/ILogin';
import { IUser } from '../interfaces/IUser';
import Users from '../database/models/UserModel';
import JWT from '../utils/JWT';

export default class UserService {
  jwt = new JWT();

  constructor(
    private users = Users,
  ) {}

  public async findUser(token: string): Promise<Users | null> {
    const jwtToken = this.jwt.authentication(token);
    const result = await this.users.findOne({ where: { email: jwtToken.email } });
    if (!result) return null;

    return result;
  }

  public async authLogin(userInfo: IUser): Promise<ILogin> {
    const { email, password } = userInfo;
    if (!email || !password) {
      return { type: 400 };
    }
    const result = await this.users.findOne({ where: { email } });
    if (result && bcryptjs.compareSync(password, result.password)) {
      return { type: 200, message: result };
    }
    return { type: 401 };
  }
}
