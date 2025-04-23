import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import apiRoutes from './api/index.js';
import Question from '../models/Question.js'; // adjust as needed

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// API Routes
router.use('/api', apiRoutes);

// Serve static files from the React app
const clientBuildPath = path.join(__dirname, '../../../client/dist');
router.use(express.static(clientBuildPath));

// Fallback: serve React index.html on unknown routes
router.use('*', (_req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

export default router;
