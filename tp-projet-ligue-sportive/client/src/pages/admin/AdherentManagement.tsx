import { useEffect, useState } from "react";
import { getAllAdherents, deleteAdherent, User } from "../../api";


function AdherentManagement(){
    const [adherents, setAdherents] = useState<User[]>([]);
    // 2. L'état de chargement (Pendant l'attente) -> true par défaut
    const [isLoading, setIsLoading] = useState(true); 

    // 3. L'erreur (En cas de pépin) -> null par défaut 
    const [error, setError] = useState<string | null>(null);

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

    const handleDelete = async (id: string) => {
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            await deleteAdherent(id);
            // Mise à jour locale sans recharger la page
            setAdherents((prevAdherents) =>
        prevAdherents.filter((adherent) => adherent._id !== id)
      );
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
    <div className="page">
      <h2>Gestion des Adhérents</h2>

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
                    {adherent.role}
                  </span>
                </td>
                <td>
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
  );


}

export default AdherentManagement;