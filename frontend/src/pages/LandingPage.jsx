import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ScoreBoard from "../components/ScoreBoard";
import Footer from "../components/Footer";
import "../css/LandingPage.css";

function LandingPage() {
    const [difficulty, setDifficulty] = useState(null);
    const [showScoreboard, setShowScoreboard] = useState(false);
    const navigate = useNavigate();

    const handleStartGame = () => {
        if (difficulty) navigate(`/board/${difficulty}`);
    };

    return (
        <div className="landing-container">
            <div className="landing-left">
                <h1>Jeu de Memory Interactif</h1>
                <p className="subtitle">
                    Testez votre mémoire et tentez de battre le meilleur score !
                </p>

                <div className="difficulty-buttons">
                    {[12, 16, 20].map((d) => (
                        <button
                            key={d}
                            className={difficulty === d ? "active" : ""}
                            onClick={() => setDifficulty(d)}
                        >
                            {d} cartes
                        </button>
                    ))}
                </div>

                <button
                    className="start-button"
                    onClick={handleStartGame}
                    disabled={!difficulty}
                >
                    Start Game
                </button>

                <button
                    className="scoreboard-button"
                    onClick={() => setShowScoreboard(true)}
                >
                    Scoreboard
                </button>
            </div>

            {showScoreboard && (
                <div className="modal-overlay" onClick={() => setShowScoreboard(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Scoreboard</h2>
                        <ScoreBoard />
                        <button className="close-button" onClick={() => setShowScoreboard(false)}>
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}

export default LandingPage;
