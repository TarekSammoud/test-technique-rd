import mongoose from 'mongoose';

const ScoreSchema = new mongoose.Schema({
    username: { type: String, required: true },
    coups: { type: Number, required: true },
    timeInSeconds: { type: Number },
    difficulty: { type: Number },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('Score', ScoreSchema);
