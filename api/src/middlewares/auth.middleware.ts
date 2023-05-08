import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
// types
import type { NextFunction, Request, Response } from 'express';

dotenv.config();
const { JWT_SECRET = '' } = process.env;

export const isLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    // validate and parse token
    if (!authorization) {
      res.status(400).json({ error: 'No authorization header found' });
      return;
    }
    const token = authorization.split(' ')[1];
    if (!token) {
      res.status(400).json({ error: 'Token is not valid' });
      return;
    }
    const payload = await jwt.verify(token, JWT_SECRET);
    if (!payload) {
      res.status(400).json({ error: 'header is malformed' });
      return;
    }
    // store user data
    req.user = payload;
    next();
  } catch(error) {
    res.status(400).json({ error });
  }
};
