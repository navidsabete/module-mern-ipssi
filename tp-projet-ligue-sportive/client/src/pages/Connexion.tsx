import { useState } from "react";
import { login } from "../api";

function Connexion() {

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {

      e.preventDefault();

     try{
      await login(formData);
      window.location.href = "/";
     }
     catch(error){
        console.log(`Erreur: ${error}`);
     }

    
  }

  return (
    <div className="page">
      <form className="form-card" onSubmit={handleSubmit}>
        <h2>Connexion</h2>

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
          Se connecter
        </button>
     
      </form>
    </div>
  );
}

export default Connexion;
