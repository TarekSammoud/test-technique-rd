import { useEffect, useState } from "react";
import "../css/Scoreboard.css";
import { fetchScores } from "../services/scoreApi";

function ScoreBoard() {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("all"); 

  useEffect(() => {
    const loadScores = async () => {
      try {
        const data = await fetchScores();
        setScores(data);
      } catch (err) {
        setError("Impossible de récupérer les scores");
      } finally {
        setLoading(false);
      }
    };

    loadScores();
  }, []);

  if (loading) return <p>Chargement des scores...</p>;
  if (error) return <p>{error}</p>;

  // Filter by difficulty
  const filteredScores =
    difficultyFilter === "all"
      ? scores
      : scores.filter((score) => score.difficulty === Number(difficultyFilter));

  const sortedScores = [...filteredScores].sort((a, b) => a.coups - b.coups);

  return (
    <div className="scoreboard-container">
      <div className="filter-container">
        <label htmlFor="difficulty">Filtrer par difficulté :</label>
        <select
          id="difficulty"
          value={difficultyFilter}
          onChange={(e) => setDifficultyFilter(e.target.value)}
        >
          <option value="all">Toutes</option>
          <option value="12">12 cartes</option>
          <option value="16">16 cartes</option>
          <option value="20">20 cartes</option>
        </select>
      </div>

      <table className="scoreboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Pseudo</th>
            <th>Coups</th>
            <th>Temps (s)</th>
            <th>Difficulté</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score, index) => (
            <tr key={score._id}>
              <td>{index + 1}</td>
              <td>{score.username}</td>
              <td>{score.coups}</td>
              <td>{score.timeInSeconds}</td>
              <td>{score.difficulty}</td>
              <td>{new Date(score.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ScoreBoard;
