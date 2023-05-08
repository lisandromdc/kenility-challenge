import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
// models
import User from '@/models/user.model';
// types
import type { Request, Response } from 'express';

dotenv.config();
const { JWT_SECRET = '' } = process.env;

export default {
  // POST
  async login (req: Request, res: Response) {
    const data = req.body;
    if (!data || !data.username || !data.password) {
      res.status(400).send({ error: 'Insufficient data' });
      return;
    };
    // check if the user exists
    const user = await User.findOne({ username: data.username });
    if (!user) {
      res.status(400).json({ error: 'User doesn\'t exist' });
      return;
    }
    // check if password matches
    const passwordMatch = await bcrypt.compare(data.password, user.password);
    if (!passwordMatch) {
      res.status(400).json({ error: 'Password doesn\'t match' });
      return;
    }
    // sign token and send it in Res
    const token = await jwt.sign({ username: user.username }, JWT_SECRET);
    res.json({ token });
  },
};
