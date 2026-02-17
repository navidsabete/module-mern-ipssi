import { useState, useEffect } from 'react';
import { getAllTasks, createTask, toggleTask, deleteTask, type Task } from './api';

function App() { 

  
// 1. Les Données (Succès) 
const [tasks, setTasks] = useState<Task[]>([]); 

const [newLabel, setNewLabel] = useState('');

// 2. L'état de chargement (Pendant l'attente) -> true par défaut
const [isLoading, setIsLoading] = useState(true); 

// 3. L'erreur (En cas de pépin) -> null par défaut 
const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // On lance la récupération
    fetchTasks(); }, []);

const fetchTasks = async () => { 
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            const data = await getAllTasks();
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


    // ajout d'une tâche

    const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newLabel.trim()) return;

    try {
      setError(null);
      const created = await createTask(newLabel);
      setTasks(prev => [...prev, created]); // mise à jour écran APRÈS le serveur
      setNewLabel('');
    } catch (err: any) {
      setError(err.message);
    }
    finally { 
      // C'est fini, on enlève le loader (Succès OU Échec)
      setIsLoading(false);
    }
  };

  // Toggle Check / Uncheck
  const handleToggle = async (id: number) => {
    try {
      setError(null);
      const updated = await toggleTask(id);

      setTasks(prev =>
        prev.map(task =>
          task.id === id ? updated : task
        )
      );
    } catch (err: any) {
      setError(err.message);
    }
    finally { 
      // C'est fini, on enlève le loader (Succès OU Échec)
      setIsLoading(false);
    }
  };

   // Supprimer
  const handleDelete = async (id: number) => {
    try {
      setError(null);
      await deleteTask(id);

      setTasks(prev =>
        prev.filter(task => task.id !== id)
      );
    } catch (err: any) {
      setError(err.message);
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
    <div>
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newLabel}
          onChange={(e) => setNewLabel(e.target.value)}
          placeholder="Nouvelle tâche..."
        />
        <button type="submit">Ajouter</button>
      </form>


      <ul>
        {tasks.map(task => (
          <li key={task.id}>

            {/* Texte barré si isDone */}
            <span
              style={{
                textDecoration: task.isDone ? 'line-through' : 'none',
                marginRight: '10px'
              }}
            >
              {task.label}
            </span>

            {/* Bouton Check / Uncheck */}
            <button onClick={() => handleToggle(task.id)}>
              {task.isDone ? "Uncheck" : "Check"}
            </button>

            {/* Bouton Supprimer */}
            <button onClick={() => handleDelete(task.id)}>
              Supprimer
            </button>

          </li>
        ))}
      </ul>

    </div>
    );
} 


export default App;