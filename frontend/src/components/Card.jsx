import "../css/Card.css";

export default function Card({ emoji, isFlipped, onClick,matched, winner,resetting  }) {
    return (
        <div className={`game-card ${isFlipped ? "flipped" : ""} ${winner ? "winner" : ""} ${resetting ? "resetting" : ""}` } onClick={onClick}>
            <div className="game-card-inner">
                <div className="game-card-back">
                    <img src="/src/assets/card_back.jpg" alt="Card back" />
                </div>
                <div className={`game-card-front ${matched ? "matched" : ""}`}>
                    <img src="/src/assets/card_front.jpg" alt="Card front" className="front-bg" />
                    <div className="emoji-overlay">{emoji}</div>
                </div>
            </div>
        </div>
    );
}
