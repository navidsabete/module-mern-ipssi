import { useEffect, useState } from "react";
import { getAllAdherents, createAdherent, deleteAdherent, User, updateAdherent, getAdherentById } from "../../api";


function AdherentManagement(){
    const [adherents, setAdherents] = useState<User[]>([]);
    const [selectedAdherent, setSelectedAdherent] = useState<User | null>(null);
    // 2. L'état de chargement (Pendant l'attente) -> true par défaut
    const [isLoading, setIsLoading] = useState(true); 

    // 3. L'erreur (En cas de pépin) -> null par défaut 
    const [error, setError] = useState<string | null>(null);

      // Formulaire création
    const [newAdherent, setNewAdherent] = useState({
      username: "",
      email: "",
      password: "",
      role: "adherent",
    });

    // Formulaire mise à jour
    const [editAdherent, setEditAdherent] = useState({
      username: "",
      email: "",
      password: "",
      role: "adherent",
    });
    
      useEffect(() => {
    // On lance la récupération
    fetchAdherents(); }, []);
    
    const fetchAdherents = async () => { 
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            const data = await getAllAdherents();
            setAdherents(data);
        }
        catch(err: any){
            // Gestion de l'erreur
            console.error("Erreur fetch:", err);
            setError(err.message || "Impossible de contacter le serveur");
        }
        finally { 
            // C'est fini, on enlève le loader (Succès OU Échec)
            setIsLoading(false);
        }
    };

    const handleCreate = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if(!newAdherent.username.trim()) return;
        try{
          setError(null);
          const created = await createAdherent(newAdherent);
          setAdherents((prev) => [...prev, created]);

          // Reset form
          setNewAdherent({ username: "", email: "", password: "", role: "adherent" });
          
        }
        catch(err: any){
            // Gestion de l'erreur
            console.error("Erreur :", err);
            setError(err.message || "Impossible de contacter le serveur");
        }
        finally { 
            // C'est fini, on enlève le loader (Succès OU Échec)
            setIsLoading(false);
        }

    };

    const handleSelectAdherent = async (id: string) => { 
      try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            const adherent = await getAdherentById(id);
             setSelectedAdherent(adherent);
             setEditAdherent({
               username: adherent.username,
               email: adherent.email,
               password: "",
               role: adherent.role
               });
        }
        catch(err: any){
            // Gestion de l'erreur
            console.error("Erreur fetch:", err);
            setError(err.message || "Impossible de contacter le serveur");
        }
        finally { 
            // C'est fini, on enlève le loader (Succès OU Échec)
            setIsLoading(false);
        }
    };

    const handleUpdate = async (e: React.SubmitEvent, id: string) => {
       e.preventDefault();

       try{
           setError(null);
           const updated = await updateAdherent(id, editAdherent);
           setAdherents(prev => prev.map(a => (a._id === id ? updated : a)));
           setSelectedAdherent(updated);
       }
       catch(err: any){
            // Gestion de l'erreur
            console.error("Erreur :", err);
            setError(err.message || "Impossible de contacter le serveur");
        }
        finally { 
            // C'est fini, on enlève le loader (Succès OU Échec)
            setIsLoading(false);
        }

    }


    const handleDelete = async (id: string) => {
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            await deleteAdherent(id);
            // Mise à jour locale sans recharger la page
            setAdherents(prevAdherents => prevAdherents.filter((adherent) => adherent._id !== id));
            if (selectedAdherent?._id === id) setSelectedAdherent(null);
    
        }
        catch(err: any){
            // Gestion de l'erreur
            console.error("Erreur :", err);
            setError(err.message || "Impossible de contacter le serveur");
        }
        finally { 
            // C'est fini, on enlève le loader (Succès OU Échec)
            setIsLoading(false);
        }
    };

    // --- RENDU CONDITIONNEL ---
    // Cas 1 : Ça charge 
    if (isLoading) { 
        return <div className="loading-spinner">Chargement des adhérents...</div>; 
    } 
    
    // Cas 2 : Il y a une erreur 
    if (error) { 
        return <div className="error-message">Error : {error}</div>; 
    } 
    
    // Cas 3 : Tout va bien, on affiche la liste 

    return (
    <div className="page adherent">
      <h2>Gestion des Adhérents</h2>

      {/* FORMULAIRE AJOUT UTILISATEUR */}
      <div className="form-container">
        <h3>Ajouter un nouvel adhérent</h3>
        <form onSubmit={handleCreate} className="form-create-user">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={newAdherent.username}
            onChange={(e) => setNewAdherent({ ...newAdherent, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newAdherent.email}
            onChange={(e) => setNewAdherent({ ...newAdherent, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={newAdherent.password}
            onChange={(e) => setNewAdherent({ ...newAdherent, password: e.target.value })}
          />
          <select
            value={newAdherent.role}
            onChange={(e) => setNewAdherent({ ...newAdherent, role: e.target.value as "adherent" | "admin" })}
          >
            <option value="adherent">Adhérent</option>
            <option value="admin">Admin</option>
          </select>

          <button className="btn btn-primary" type="submit">
            Créer
          </button>
        </form>
      </div>

      {/* FORMULAIRE MISE A JOUR UTILISATEUR */}
      {selectedAdherent && (
      <div className="form-container">
        <div className="form-edit-user">
          <h3>Modifier adhérent</h3>

          <form onSubmit={e => handleUpdate(e, selectedAdherent._id!)}>
              <input
                type="text"
                value={editAdherent.username}
                onChange={e => setEditAdherent({ ...editAdherent, username: e.target.value })}
                />
                <input
                type="email"
                value={editAdherent.email}
                onChange={e => setEditAdherent({ ...editAdherent, email: e.target.value })}
                />
                <input
                type="password"
                placeholder="Nouveau mot de passe (optionnel)"
                value={editAdherent.password}
                onChange={e => setEditAdherent({ ...editAdherent, password: e.target.value })}
                />
                <select
                  value={editAdherent.role}
                  onChange={e => setEditAdherent({ ...editAdherent, role: e.target.value as "adherent" | "admin"})}
                >
                   <option value="adherent">Adhérent</option>
                   <option value="admin">Admin</option>
                </select>
                <div className="edit-actions">
                    <button className="btn btn-primary" type="submit">
                      Sauvegarder
                    </button>

                    <button
                      type="button"
                      className="btn-cancel"
                      onClick={() => setSelectedAdherent(null)}
                    >
                      Annuler
                    </button>
                    </div>
          </form>
        </div>
      </div>
      )}
      
      {/* CONTENEUR TABLEAU */}
      <div className="table-container">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
             <tr>
              <th>ID</th>
              <th>Nom d'utilisateur</th>
              <th>Email</th>
              <th>Rôle</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {adherents.map((adherent) => (
              <tr key={adherent._id}>
                <td>{adherent._id}</td>
                <td>{adherent.username}</td>
                <td>{adherent.email}</td>
                <td>
                  <span
                    className={
                      adherent.role === "admin"
                        ? "badge-admin"
                        : "badge-adherent"
                    }
                  >
                    {adherent.role === "admin" ? "Admin" : "Adhérent"}
                  </span>
                </td>
                <td>
                  <button
                    className="btn-edit"
                    onClick={() => handleSelectAdherent(adherent._id)}
                    >
                      Modifier
                    </button>
                  <button
                    className="btn-delete"
                    onClick={() => handleDelete(adherent._id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );


}

export default AdherentManagement;