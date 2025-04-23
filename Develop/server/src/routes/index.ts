import type { Request, Response } from 'express';
import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import apiRoutes from './api/index.js';
import Question from '../models/Question.js'; // ✅ Update path if needed

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🔹 Existing API Routes
router.use('/api', apiRoutes);

// 🔹 Add new route for /api/questions/random
router.get('/api/questions/random', async (_req: Request, res: Response) => {
  try {
    const randomQuestion = await Question.aggregate([{ $sample: { size: 1 } }]);
    if (!randomQuestion.length) {
      return res.status(404).json({ error: 'No questions found' });
    }
    res.json(randomQuestion[0]);
  } catch (err) {
    console.error('❌ Error fetching random question:', err);
    res.status(500).json({ error: 'Failed to fetch random question' });
  }
});

// 🔹 Serve React frontend in production
router.use((_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
});

export default router;
