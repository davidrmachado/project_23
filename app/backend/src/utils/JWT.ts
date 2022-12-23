import 'dotenv/config';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

import { IUser } from '../interfaces/IUser';

class TokenJWT {
  generateToken = (data: IUser) => {
    const token = sign(
      data,
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
    return token;
  };

  authentication = (token: string): JwtPayload => {
    const validation = verify(token, process.env.JWT_SECRET || 'jwt_secret');
    return validation as JwtPayload;
  };
}

export default TokenJWT;
