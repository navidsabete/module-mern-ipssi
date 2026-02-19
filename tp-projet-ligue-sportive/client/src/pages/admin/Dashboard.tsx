import { useNavigate } from "react-router-dom";

function Dashboard() {

  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="hero">
        <h2>Dashboard Administrateur</h2>
        <p>Gestion des utilisateurs et produits</p>

        <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/produits")}
          >
            Gestion des produits
          </button>
           <button
            className="btn btn-primary"
            onClick={() => navigate("/admin/adherents")}
          >
            Gestion des adhérents
          </button>
      </div>
    </div>
  );
}

export default Dashboard;
