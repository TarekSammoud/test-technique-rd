import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import MyStopwatch from "./MyStopWatch";
import "../css/Board.css";
import { useNavigate } from "react-router-dom";
import GameOver from "./GameOver";
import NotFound from "./NotFound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimesCircle } from "@fortawesome/free-solid-svg-icons";


const EMOJIS = ["🐶", "🐱", "🐭", "🐹", "🦊", "🐻", "🐼", "🐸", "🐵", "🐤"];

function Board() {
    const navigate = useNavigate();
    const stopwatchRef = useRef();
    const { difficulty } = useParams();
    const diff = parseInt(difficulty, 10);
    if (isNaN(diff)) return <NotFound />;
    if (diff !== 12 && diff !== 16 && diff !== 20) return <NotFound />;



    const [showGameOver, setShowGameOver] = useState(false);

    const [coups, setCoups] = useState(0);
    const [cards, setCards] = useState([]);
    const [flipped, setFlipped] = useState([]);
    const [matched, setMatched] = useState([]);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [hasWon, setHasWon] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(prev => !prev);


    useEffect(() => {
        if (cards.length > 0 && matched.length === cards.length) {
            stopwatchRef.current.pause();
            setHasWon(true);
            setTimeout(() => {
                setShowGameOver(true);
            }, 1000);
        }
    }, [matched]);
    useEffect(() => {
        startGame();
    }, [diff]);

    useEffect(() => {
        const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);


    const handleRestart = () => {
        setIsResetting(true);
        setCoups(0);
        setHasWon(false);
        setShowGameOver(false);

        setTimeout(() => {
            stopwatchRef.current.getTime().reset();

            startGame();

            setTimeout(() => setIsResetting(false), 50);
        }, 300);
    };

    function startGame() {
        setFlipped([]);
        setMatched([]);

        const pairCount = diff / 2;
        const selected = EMOJIS.slice(0, pairCount);
        const fullDeck = [...selected, ...selected]
            .sort(() => Math.random() - 0.5)
            .map((emoji, index) => ({ id: index, emoji }));

        setCards(fullDeck);
    }


    function flipCard(id) {
        if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

        const newFlipped = [...flipped, id];
        setFlipped(newFlipped);

        if (newFlipped.length === 2) {
            setCoups(coups + 1);
            const [a, b] = newFlipped;
            if (cards[a].emoji === cards[b].emoji) setMatched([...matched, a, b]);
            setTimeout(() => setFlipped([]), 1000);
        }
    }

    const cols = 4;
    const rows = Math.ceil(cards.length / cols);
    const gap = 12;
    const padding = 40;
    const headerHeight = 100;
    const maxCardWidth = Math.floor((windowSize.width - padding - gap * (cols - 1)) / cols);
    const maxCardHeight = Math.floor((windowSize.height - headerHeight - gap * (rows - 1)) / rows);
    const cardSize = Math.min(maxCardWidth, maxCardHeight);

    return (
        <div id="board-container">
            <div id="menu" className={isMenuOpen ? "open" : ""}>
                <MyStopwatch ref={stopwatchRef} />
                <div style={{ textAlign: 'center' }}>Coups : {coups}</div>
                <button onClick={() => navigate('/')}>Menu principal</button>
                <button onClick={handleRestart}>Rejouer</button>
            </div>

            <div className="burger-icon" onClick={toggleMenu}>
                <FontAwesomeIcon icon={isMenuOpen ? faTimesCircle : faBars} />
            </div>

            <div className="mobile-timer">
                <MyStopwatch ref={stopwatchRef} />
            </div>
            <div id="content">
                <div
                    className="grid"
                    style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${cols}, ${cardSize}px)`,
                        gap: `${gap}px`,
                        justifyContent: "center",
                        marginTop: "40px",
                    }}
                >
                    {cards.map((card) => (
                        <Card
                            key={card.id}
                            emoji={card.emoji}
                            isFlipped={flipped.includes(card.id) || matched.includes(card.id)}
                            matched={matched.includes(card.id)}
                            winner={hasWon}
                            onClick={() => flipCard(card.id)}
                            resetting={isResetting}
                        />
                    ))}
                </div>
            </div>

            {showGameOver && (
                <div className="modal-overlay" onClick={() => setShowGameOver(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Recapitulatif du jeu</h2>
                        <GameOver
                            coups={coups}
                            time={stopwatchRef.current.getTime()}
                            onRestart={() => handleRestart()
                            }
                        />
                        <button className="close-button" onClick={() => setShowGameOver(false)}>
                            Menu principal
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Board;
