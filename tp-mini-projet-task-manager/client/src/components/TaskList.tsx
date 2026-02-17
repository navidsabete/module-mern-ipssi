import { useState, useEffect } from 'react';

interface Task { 
    id: number; 
    label: string; 
    isDone: boolean; 
}

export default function TaskList() { 
// 1. Les Données (Succès) 
const [tasks, setTasks] = useState<Task[]>([]); 

// 2. L'état de chargement (Pendant l'attente) -> true par défaut
const [isLoading, setIsLoading] = useState(true); 

// 3. L'erreur (En cas de pépin) -> null par défaut 
const [error, setError] = useState<string | null>(null);


useEffect(() => {
    // On lance la récupération
    fetchTasks(); }, []);


    const fetchTasks = async () => { 
        // TODO : (voir étape 2) 
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            const response = await fetch('http://localhost:3001/api/tasks');

            // ÉTAPE CRUCIALE : Vérifier le status HTTP 
            if (!response.ok) { throw new Error(`Erreur HTTP: ${response.status}`); }

            const data = await response.json(); 
            setTasks(data);
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

    // --- RENDU CONDITIONNEL ---
    // Cas 1 : Ça charge 
    if (isLoading) { 
        return <div className="loading-spinner">Chargement des tâches...</div>; 
    } 
    
    // Cas 2 : Il y a une erreur 
    if (error) { 
        return <div className="error-message">Error : {error}</div>; 
    } 
    
    // Cas 3 : Tout va bien, on affiche la liste 
    return ( 
        <ul> 
            {tasks.map(t => (
             <li key={t.id}>{t.label}</li> ))} 
        </ul> 
    );

}