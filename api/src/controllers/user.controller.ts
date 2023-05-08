// models
import User from '@/models/user.model';
// types
import type { Request, Response } from 'express';

const IMG_PATH = '../../../public/images';
const DEFAULT_IMG = `${IMG_PATH}/imgDefault.jpg`;

export default {
  // GET
  async getUsers(req: Request, res: Response) {
    const users: User[] = await User.find();
    res.json(users);
  },
  async getUser(req: Request, res: Response) {
    const userId: string = req.params.id;
    const user: User | null = await User.findById(userId);
    if (!user) {
      res.status(204).send('Usuario no encontrado');
      return;
    }
    res.json(user);
  },
  // POST
  async createUser(req: Request, res: Response) {
    const data = req.body;
    if (!data || !data.firstName || !data.lastName || !data.address || !data.profilePictureUrl || !data.username || !data.password) {
      res.status(400).send({ error: 'Insufficient data' });
    }
    const newUser: User = new User({
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      username: data.username,
      profilePictureUrl: req.file? `${IMG_PATH}/${req.file.filename}` : DEFAULT_IMG,
      password: data.password,
    });
    const createdUser: User = await newUser.save();
    res.json(createdUser);
  },
  // PUT
  async updateUser(req: Request, res: Response) {
    const userId = req.params.id;
    const user: User | null = await User.findById(userId);
    if (!user) {
      res.status(204).send('User not found');
      return;
    }

    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.address = req.body.address;
    user.username = req.body.username;
    user.profilePictureUrl = req.file ? `${IMG_PATH}/${req.file.filename}` : DEFAULT_IMG;
    user.password = req.body.password;

    const updatedUser: User = await user.save();
    res.json(updatedUser);
  },
};
