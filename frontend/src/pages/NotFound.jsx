import "../css/NotFound.css";

function NotFound() {
  return (
    <div className="notfound-overlay">
      <div className="notfound-card">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-text">Oups ! Page introuvable</p>
        <button className="notfound-btn" onClick={() => window.location.href = "/"}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default NotFound;
