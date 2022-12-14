import * as bcryptjs from 'bcryptjs';

import ILogin from '../interfaces/ILogin';
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

    return result;
  }

  public async authLogin(email: string, password: string): Promise<ILogin> {
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
