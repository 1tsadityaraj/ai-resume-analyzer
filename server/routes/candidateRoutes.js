import express from 'express';
import Candidate from '../models/Candidate.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const candidates = await Candidate.find().sort({ uploadedAt: -1 });
        res.json(candidates);
    } catch (error) {
        console.error('Error fetching candidates:', error);
        res.status(500).json({ error: 'Failed to fetch candidates' });
    }
});

export default router;
