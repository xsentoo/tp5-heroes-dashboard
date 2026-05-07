import { Request, Response } from 'express';
import Hero from '../models/Hero';

export const getHeroes = async (req: Request, res: Response) => {
  try {
    const keyword = req.query.keyword
      ? { name: { $regex: req.query.keyword as string, $options: 'i' } }
      : {};
    
    const publisher = req.query.publisher
      ? { 'biography.publisher': { $regex: req.query.publisher as string, $options: 'i' } }
      : {};

    const sortOption = req.query.sort === 'date' ? { createdAt: -1 } : { name: 1 };

    const heroes = await Hero.find({ ...keyword, ...publisher }).sort(sortOption as any);
    res.json(heroes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const getHeroById = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (hero) {
      res.json(hero);
    } else {
      res.status(404).json({ message: 'Hero not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createHero = async (req: Request, res: Response) => {
  try {
    const newHeroData = { ...req.body };
    if (req.file) {
      newHeroData.customImage = `/uploads/${req.file.filename}`;
    }
    // Handle nested fields parsing if sent as JSON string from multipart/form-data
    if (typeof newHeroData.powerstats === 'string') newHeroData.powerstats = JSON.parse(newHeroData.powerstats);
    if (typeof newHeroData.biography === 'string') newHeroData.biography = JSON.parse(newHeroData.biography);
    if (typeof newHeroData.appearance === 'string') newHeroData.appearance = JSON.parse(newHeroData.appearance);

    const hero = new Hero(newHeroData);
    const createdHero = await hero.save();
    res.status(201).json(createdHero);
  } catch (error) {
    res.status(400).json({ message: 'Invalid hero data', error });
  }
};

export const updateHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (hero) {
      const updateData = { ...req.body };
      if (req.file) {
        updateData.customImage = `/uploads/${req.file.filename}`;
      }
      
      if (typeof updateData.powerstats === 'string') updateData.powerstats = JSON.parse(updateData.powerstats);
      if (typeof updateData.biography === 'string') updateData.biography = JSON.parse(updateData.biography);
      if (typeof updateData.appearance === 'string') updateData.appearance = JSON.parse(updateData.appearance);

      Object.assign(hero, updateData);
      const updatedHero = await hero.save();
      res.json(updatedHero);
    } else {
      res.status(404).json({ message: 'Hero not found' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Invalid data', error });
  }
};

export const deleteHero = async (req: Request, res: Response) => {
  try {
    const hero = await Hero.findById(req.params.id);
    if (hero) {
      await Hero.deleteOne({ _id: hero._id });
      res.json({ message: 'Hero removed' });
    } else {
      res.status(404).json({ message: 'Hero not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
