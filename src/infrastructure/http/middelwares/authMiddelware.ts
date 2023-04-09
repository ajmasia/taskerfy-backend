import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../../../config/config';

interface IUserPayload {
  id: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: IUserPayload;
  }
}

const JWT_SECRET = config.jwt_secret;

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void | Response<Record<string, any>> {
  const authHeader = req.headers.authorization;

  if (!authHeader) return res.status(401).end();

  const [bearer, token] = authHeader.split(' ');

  if (!bearer || !token) return res.status(401).end();

  try {
    const decodedToken = jwt.verify(token, JWT_SECRET) as IUserPayload;

    req.user = decodedToken;

    next();
  } catch (error) {
    return res.status(401).end();
  }
}
