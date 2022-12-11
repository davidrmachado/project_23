import * as bcryptjs from 'bcryptjs';
import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/UserModel';

import JWT from '../utils/JWT';

class UserService {
  jwt = new JWT();

  constructor(
    private user = UserModel,
  ) {}

  public async findUser(token: string) {
    const userToken = this.jwt.authentication(token);
    const result = await this.user.findOne({ where: { email: userToken.email } });

    return result;
  }

  public async authUser(userData: ILogin) {
    const { email, password } = userData;
    const result = await this.user.findOne({ where: { email } });

    if (!email || !password) {
      return { code: 400 };
    }

    if (result && bcryptjs.compareSync(password, result.password)) {
      return { code: 401 };
    }
    return { code: 200 };
  }
}

export default UserService;
