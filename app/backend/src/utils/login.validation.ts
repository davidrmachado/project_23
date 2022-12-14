import { NextFunction, Request, Response } from 'express';
import JWT from './JWT';

const loginValidation = (req: Request, res:Response, next: NextFunction) => {
  const jwt = new JWT();

  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }

  try {
    const decoded = jwt.authentication(token as string);

    if (decoded.type) return res.status(401).json({ message: 'Token must be a valid token' });

    req.body.user = decoded;

    next();
  } catch (err) {
    res.status(401).json({ message: 'Token must be a valid token' });
  }
};

export default loginValidation;
