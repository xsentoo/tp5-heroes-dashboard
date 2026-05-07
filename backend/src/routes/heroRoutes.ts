import express from 'express';
import { getHeroes, getHeroById, createHero, updateHero, deleteHero } from '../controllers/heroController';
import { protect } from '../middleware/authMiddleware';
import { adminOnly, editorOrAdmin } from '../middleware/roleMiddleware';
import { upload } from '../middleware/uploadMiddleware';

const router = express.Router();

router.route('/')
  .get(protect, getHeroes)
  .post(protect, editorOrAdmin, upload.single('image'), createHero);

router.route('/:id')
  .get(protect, getHeroById)
  .put(protect, editorOrAdmin, upload.single('image'), updateHero)
  .delete(protect, adminOnly, deleteHero);

export default router;
