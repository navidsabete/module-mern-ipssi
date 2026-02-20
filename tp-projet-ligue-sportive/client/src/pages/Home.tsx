import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRole, isAuthenticated } from "../utils/auth";


function Home() {
  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

   useEffect(() => {
    if (isAuthenticated()) {
      setRole(getRole());
    }
  }, []);

  return (
    <div className="page">
      <div className="hero">
        <h1>Bienvenue sur la Ligue Sportive d'Auvergne</h1>
        <p>
          Réservez facilement votre matériel sportif en ligne.
        </p>

      {!role && (
        <div className="hero-buttons">
          <button
            className="btn btn-outline"
            onClick={() => navigate("/connexion")}
          >
            Connexion
          </button>

          <button
            className="btn btn-outline"
            onClick={() => navigate("/inscription")}
          >
            Inscription
          </button>
        </div>
        )}

        {role === "adherent" && ( 
          <button
            className="btn btn-outline"
            onClick={() => navigate("/adherent/location")}
          >
            Accéder à l'espace adhérent
          </button>
        )}


        {role === "admin" && (
          <><button
            className="btn btn-outline"
            onClick={() => navigate("/adherent/location")}
          >
            Espace adhérent
          </button><button
            className="btn btn-outline"
            onClick={() => navigate("/admin")}
          >
              Espace administrateur
            </button></>
        )}  

      </div>
    </div>
  );
}

export default Home;
