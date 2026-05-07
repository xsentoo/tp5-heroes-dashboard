import { Request, Response } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken';

const generateToken = (id: string) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'supersecretkey_change_me', {
    expiresIn: '30d'
  });
};

export const registerUser = async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  const userExists = await User.findOne({ username });
  if (userExists) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const user = await User.create({
    username,
    password,
    role: role || 'visitor'
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user.id)
    });
  } else {
    res.status(400).json({ message: 'Invalid user data' });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  console.log('Login attempt:', username, password);
  const user = await User.findOne({ username });
  console.log('User found:', user ? user.username : null);

  if (user && (await (user as any).matchPassword(password))) {
    console.log('Password matched!');
    res.json({
      _id: user.id,
      username: user.username,
      role: user.role,
      token: generateToken(user.id)
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
};
