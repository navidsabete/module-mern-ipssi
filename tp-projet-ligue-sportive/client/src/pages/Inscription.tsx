import { useState } from "react";
import { register } from "../api";

function Inscription() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: "adherent", // rôle par défaut
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e: React.SubmitEvent) => {

    e.preventDefault();

     console.log("Données envoyées");

    try{
          await register(formData);
          window.location.href = "/";
         }
         catch(error){
            console.log(`Erreur: ${error}`);
         }
  }
  
  return (
    <div className="page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Inscription</h2>

        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn btn-primary">
          Créer un compte
        </button>
      </form>
    </div>
  );
}

export default Inscription;