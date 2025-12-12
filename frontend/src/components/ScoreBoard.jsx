import "../css/Scoreboard.css";

const bestScores = [
  { pseudo: "Alice", coups: 12, date: "2025-01-15T10:30:00Z" },
  { pseudo: "Bob", coups: 15, date: "2025-02-10T14:20:00Z" },
  { pseudo: "Charlie", coups: 18, date: "2025-03-05T09:45:00Z" },
  { pseudo: "Diana", coups: 20, date: "2025-04-01T16:10:00Z" },
  { pseudo: "Ethan", coups: 22, date: "2025-05-12T11:00:00Z" },
];

function Scoreboard() {
  const sortedScores = [...bestScores].sort((a, b) => a.coups - b.coups);

  return (
    <div className="scoreboard-container">
      <table className="scoreboard-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Pseudo</th>
            <th>Coups</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sortedScores.map((score, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{score.pseudo}</td>
              <td>{score.coups}</td>
              <td>{new Date(score.date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Scoreboard;
