import 'dotenv/config';
import { sign, verify, JwtPayload } from 'jsonwebtoken';

import ILogin from '../interfaces/ILogin';

const tokenError = 'Token must be a valid number';

class TokenJWT {
  generateToken = (data: ILogin) => {
    const token = sign(
      data,
      process.env.JWT_SECRET as string,
      { algorithm: 'HS256', expiresIn: '7d' },
    );
    return token;
  };

  authentication = (token: string): JwtPayload => {
    try {
      const validation = verify(
        token,
        process.env.JWT_SECRET as string,
      );

      return validation as JwtPayload;
    } catch (error) {
      throw new Error(tokenError);
    }
  };
}

export default TokenJWT;
