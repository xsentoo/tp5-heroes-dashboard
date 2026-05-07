import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import Hero from '../models/Hero';
import User from '../models/User';
import { connectDB } from '../config/db';

dotenv.config();

const importData = async () => {
  try {
    await connectDB();

    await Hero.deleteMany();
    await User.deleteMany();

    const heroes = JSON.parse(fs.readFileSync(`${__dirname}/../../SuperHerosComplet.json`, 'utf-8'));

    await Hero.insertMany(heroes);

    await User.create({
      username: 'admin',
      password: 'password123',
      role: 'admin'
    });

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

importData();
