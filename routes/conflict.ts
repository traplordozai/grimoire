import express from 'express';
import { detectConflicts } from '../services/conflict';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { candidateIds, roleId } = req.body;
    const conflicts = await detectConflicts(candidateIds, roleId);
    res.status(200).json({ conflicts });
  } catch (error) {
    console.error('Conflict detection error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;