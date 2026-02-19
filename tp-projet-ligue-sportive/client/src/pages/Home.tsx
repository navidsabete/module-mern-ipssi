import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="hero">
        <h1>Bienvenue sur la Ligue Sportive d'Auvergne</h1>
        <p>
          Réservez facilement votre matériel sportif en ligne.
        </p>

        <div className="hero-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/connexion")}
          >
            Se connecter
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/inscription")}
          >
            Créer un compte
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
