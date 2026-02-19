import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">Ligue Sportive d'Auvergne</div>

      <div className="nav-links">
        <Link to="/">Accueil</Link>
        <Link to="/connexion">Connexion</Link>
        <Link to="/inscription" className="btn-nav">
          Inscription
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
