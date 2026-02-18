import { useState, useEffect } from 'react';
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, type Movie, type MovieFilters } from './api';

function App() { 

  
// 1. Les Données (Succès) 
const [movies, setMovies] = useState<Movie[]>([]); 
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    year: 2026,
    genre: "",
    duration: 0
  });
  const [editMovie, setEditMovie] = useState({
    title: "",
    director: "",
    year: 2026,
    genre: "",
    duration: 0
  });

// Filtres
const [searchTitle, setSearchTitle] = useState("");
const [filterGenre, setFilterGenre] = useState("");
const [sortByYear, setSortByYear] = useState(false);

// 2. L'état de chargement (Pendant l'attente) -> true par défaut
const [isLoading, setIsLoading] = useState(true); 

// 3. L'erreur (En cas de pépin) -> null par défaut 
const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // On lance la récupération
    fetchMovies(); }, []);

const fetchMovies = async (filters?: MovieFilters) => { 
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            setIsLoading(true);
            const data = await getAllMovies(filters);
            setMovies(data);
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

  const handleSearch = (e: React.SubmitEvent) => {
    e.preventDefault();
    fetchMovies({
      title: searchTitle || undefined,
      genre: filterGenre || undefined,
      sort: sortByYear ? 'year' : undefined,
    });
  };

  const handleResetFilters = () => {
    setSearchTitle("");
    setFilterGenre("");
    setSortByYear(false);
    fetchMovies();
  };

    const handleSelectMovie = async (id: string) => { 
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            const movie = await getMovieById(id);
             setSelectedMovie(movie);
             setEditMovie({
               title: movie.title,
               director: movie.director,
               year: movie.year,
               genre: movie.genre,
               duration: movie.duration
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



    // Création d'un film
    const handleCreate = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!newMovie.title.trim()) return;

    try {
      setError(null);
      const created = await createMovie(newMovie);
      setMovies(prev => [...prev, created]); // mise à jour écran APRÈS le serveur
      setNewMovie({ title: "", director: "", year: 2026, genre: "", duration: 0 });
    } catch (err: any) {
      setError(err.message);
    }
    finally { 
      // C'est fini, on enlève le loader (Succès OU Échec)
      setIsLoading(false);
    }
  };

  // Mise à jour d'un film
  const handleUpdate  = async (e: React.SubmitEvent, id: string) => {
    e.preventDefault();

    try {
      setError(null);
      const updated = await updateMovie(id, editMovie);
      setMovies(prev => prev.map(m => (m._id === id ? updated : m)));
      setSelectedMovie(updated);

    } catch (err: any) {
      setError(err.message);
    }
    finally { 
      // C'est fini, on enlève le loader (Succès OU Échec)
      setIsLoading(false);
    }
  };

   // Supprimer
  const handleDelete = async (id: string) => {
    try {
      setError(null);
      await deleteMovie(id);

      setMovies(prev => prev.filter(m => m._id !== id));
      if (selectedMovie?._id === id) setSelectedMovie(null);

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
        return <div className="loading-spinner">Chargement des films...</div>; 
    } 
    
    // Cas 2 : Il y a une erreur 
    if (error) { 
        return <div className="error-message">Error : {error}</div>; 
    } 
    
    // Cas 3 : Tout va bien, on affiche la liste 
    return (
    <div>
      <h1>Movie Manager</h1>

      {/* Création */}
      <h2>Ajouter un film</h2>
      <form onSubmit={handleCreate}>
        <input
          type="text"
          value={newMovie.title}
          onChange={e => setNewMovie({ ...newMovie, title: e.target.value })}
          placeholder="Titre"
        />
        <input
          type="text"
          value={newMovie.director}
          onChange={e => setNewMovie({ ...newMovie, director: e.target.value })}
          placeholder="Réalisateur"
        />
        <input
          type="number"
          value={newMovie.year}
          onChange={e => setNewMovie({ ...newMovie, year: parseInt(e.target.value) })}
          placeholder="Année"
        />
        <input
          type="text"
          value={newMovie.genre}
          onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })}
          placeholder="Genre"
        />
        <input
          type="number"
          value={newMovie.duration}
          onChange={e => setNewMovie({ ...newMovie, duration: parseInt(e.target.value) })}
          placeholder="Durée"
        />
        <button type="submit">Créer</button>
      </form>

      {/* Liste des films */}
      <h2>Liste des films</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie._id}>
            <span>
              {movie.title} - {movie.director} ({movie.year}) ; {movie.genre}; {movie.duration} mins
            </span>
            <button onClick={() => handleSelectMovie(movie._id!)}>Voir / Éditer</button>
            <button onClick={() => handleDelete(movie._id!)}>Supprimer</button>
          </li>
        ))}
      </ul>

      {/* Détails / édition */}
      {selectedMovie && (
        <div>
          <h2>Détails / Modifier : {selectedMovie.title}</h2>
          <form onSubmit={e => handleUpdate(e, selectedMovie._id!)}>
            <input
              type="text"
              value={editMovie.title}
              onChange={e => setEditMovie({ ...editMovie, title: e.target.value })}
            />
            <input
              type="text"
              value={editMovie.director}
              onChange={e => setEditMovie({ ...editMovie, director: e.target.value })}
            />
            <input
              type="number"
              value={editMovie.year}
              onChange={e => setEditMovie({ ...editMovie, year: parseInt(e.target.value) })}
            />
            <input
              type="text"
              value={editMovie.genre}
              onChange={e => setEditMovie({ ...editMovie, genre: e.target.value })}
            />
            <input
              type="number"
              value={editMovie.duration}
              onChange={e => setEditMovie({ ...editMovie, duration: parseInt(e.target.value) })}
            />
            <button type="submit">Mettre à jour</button>
          </form>
        </div>
      )}
    </div>
    );
} 


export default App;