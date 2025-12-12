import { useState } from "react";
import "../css/GameOver.css";
import Scoreboard from "./ScoreBoard";
import { submitScore } from "../services/scoreApi";


function GameOver({ coups, time, onRestart }) {
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const totalSeconds = time.minutes * 60 + time.seconds;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!username.trim()) {
            setError("Le nom d'utilisateur est requis");
            return;
        }

        setError("");
        setSuccess("");

        try {
            await submitScore(
                username,
                coups,
                time ? totalSeconds : 0,
                16
            );
            setSuccess("Score sauvegardé !");
        } catch (err) {
            setError("Impossible de sauvegarder le score");
        }
    };

    return (
        <div className="gameover-overlay">
            <div className="gameover-card">
                <h1 className="gameover-title">Bravo !</h1>
                <p className="gameover-text">Vous avez terminé la partie !</p>

                <div className="gameover-stats">
                    <div className="stat-box">
                        <span className="label">Coups</span>
                        <span className="value">{coups}</span>
                    </div>
                    <div className="stat-box">
                        <span className="label">Temps</span>
                        <span className="value">
                            {time ? `${time.minutes}m ${time.seconds}s` : "00m 00s"}
                        </span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="username-form">
                    <input
                        type="text"
                        placeholder="Entrez votre nom"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        disabled={!!success}
                    />
                    <button type="submit" disabled={!!success}>
                        {success ? "Envoyé" : "Soumettre"}
                    </button>
                </form>
                {error && <div className="message error">{error}</div>}
                {success && <div className="message success">{success}</div>}

                <button className="restart-btn" onClick={onRestart}>
                    Rejouer
                </button>

                <button
                    className="restart-btn"
                    onClick={() => (window.location.href = "/")}
                >
                    Menu principal
                </button>

                <h2 className="scoreboard-title">Meilleurs Scores</h2>
                <Scoreboard />
            </div>
        </div>
    );
}

export default GameOver;
