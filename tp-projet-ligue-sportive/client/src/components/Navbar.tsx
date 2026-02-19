import { Link, useNavigate } from "react-router-dom";
import { getRole, isAuthenticated, logout } from "../utils/auth";
import { useEffect, useState } from "react";

function Navbar() {

  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated()) {
      setRole(getRole());
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
    window.location.reload(); // recharge pour rafraîchir la navbar
  };


  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>
        Ligue Sportive d'Auvergne
      </div>
      

      <div className="nav-links">
        <Link to="/">Accueil</Link>
        {!isAuthenticated() && (
        <><Link to="/connexion">Connexion</Link><Link to="/inscription" className="btn-nav">
            Inscription
          </Link></>
        )}
        {role === "ADHERENT" && (
          <>
            <Link to="/adherent/location">Location</Link>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}

        {role === "ADMIN" && (
          <>
            <Link to="/adherent/location">Location</Link>
            <Link to="/admin">Admin</Link>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
