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

        const score = new Score({
            username,
            coups,
            timeInSeconds,
            difficulty
        });

        await score.save();

        res.status(201).json({
            success: true,
            message: "Score enregistré avec succès"
        });

    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Ce nom d'utilisateur existe déjà"
            });
        }

        res.status(500).json({
            success: false,
            message: "Erreur lors de l'enregistrement du score"
        });
    }
});


export default router;
