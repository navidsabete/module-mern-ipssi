import { useState } from "react";

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

  const handleSubmit = (e: React.SubmitEvent) => {

    e.preventDefault();

     console.log("Données envoyées");

    // 🔜 Ici : appel API login
    // fetch("/api/login", { method: "POST", body: JSON.stringify(formData) })

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
