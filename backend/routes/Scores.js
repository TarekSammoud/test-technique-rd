import express from 'express';
import Score from '../models/Score.js';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const scores = await Score.find().sort({ coups: 1 }).limit(5);
        res.json(scores);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const { username, coups, timeInSeconds, difficulty } = req.body;
        const score = new Score({ username, coups, timeInSeconds, difficulty });
        await score.save();
        res.json({ success: true, message: 'Score saved' });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
});

export default router;
