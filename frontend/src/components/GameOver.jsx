import { useState } from "react";
import "../css/GameOver.css";
import Scoreboard from "./ScoreBoard";

function GameOver({ coups, time, onRestart }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
      setError("Le nom d'utilisateur est requis");
      return;
    }
    setError("");
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
          />
          <button type="submit">Soumettre</button>
          {error && <p className="error">{error}</p>}
        </form>

        <button className="restart-btn" onClick={onRestart}>
          Rejouer
        </button>

        <button className="restart-btn" onClick={ () => window.location.href = '/' }>
          Menu principal
        </button>

        <h2 className="scoreboard-title">Meilleurs Scores</h2>
        <Scoreboard />
      </div>
    </div>
  );
}

export default GameOver;
