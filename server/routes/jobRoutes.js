import express from 'express';
import Job from '../models/Job.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const jobs = await Job.find().sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
        res.status(500).json({ error: 'Failed to fetch jobs' });
    }
});

router.post('/', async (req, res) => {
    try {
        const { title, company, skills, description } = req.body;
        const newJob = new Job({ title, company, skills, description });
        await newJob.save();
        res.status(201).json(newJob);
    } catch (error) {
        console.error('Error creating job:', error);
        res.status(500).json({ error: 'Failed to create job' });
    }
});

export default router;
