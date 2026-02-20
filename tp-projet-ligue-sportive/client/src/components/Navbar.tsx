import { Link, useNavigate } from "react-router-dom";
import { getRole, isAuthenticated, logout } from "../utils/auth";
import { useEffect, useState } from "react";
import { getCartCount } from "../utils/panier";

function Navbar() {

  const navigate = useNavigate();
  const [role, setRole] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(getCartCount());

    // Mise à jour automatique si panier change
    const handleCartStorage = () => {
      setCartCount(getCartCount());
    };

    window.addEventListener("storage", handleCartStorage);

    return () => {
      window.removeEventListener("storage", handleCartStorage);
    };
  }, []);

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
        <><Link to="/connexion">Connexion</Link><Link to="/inscription">
            Inscription
          </Link></>
        )}
        {role === "adherent" && (
          <>
            <Link to="/adherent/location">Location</Link>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
            {/* Lien Panier */}
            <Link to="/adherent/location/panier" className="cart-link">
              Panier
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
          </>
        )}

        {role === "admin" && (
          <>
            <Link to="/adherent/location">Location</Link>
             {/* Lien Panier */}
            <Link to="/adherent/location/panier" className="cart-link">
              Panier
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
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
