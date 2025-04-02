import express from 'express';
import payload from 'payload';
import { scoreMatch } from '../services/scoring';
import { generateExplanation } from '../services/matching';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { candidateId, roleId } = req.body;

    const candidate = await payload.findByID({ collection: 'candidateProfiles', id: candidateId });
    const role = await payload.findByID({ collection: 'internshipRoles', id: roleId });

    if (!candidate || !role) {
      return res.status(404).json({ error: 'Candidate or role not found.' });
    }

    const score = scoreMatch(candidate, role);
    const explanation = await generateExplanation(candidate, role);

    return res.status(200).json({ score, explanation });
  } catch (error) {
    console.error('Match error:', error);
    return res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;