import jwt from 'jsonwebtoken';
import { env } from '../config/env';

interface TokenPayload {
  id: number;
  login: string;
  role: string;
  typeAdmin?: number;
  typePersonne?: number;
}

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload as object, env.JWT_ACCESS_SECRET as jwt.Secret, {
    expiresIn: env.JWT_ACCESS_TTL as any
  });
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload as object, env.JWT_REFRESH_SECRET as jwt.Secret, {
    expiresIn: env.JWT_REFRESH_TTL as any
  });
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
