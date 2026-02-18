import { useState, useEffect } from 'react';
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, type Movie } from './api';

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

// 2. L'état de chargement (Pendant l'attente) -> true par défaut
const [isLoading, setIsLoading] = useState(true); 

// 3. L'erreur (En cas de pépin) -> null par défaut 
const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // On lance la récupération
    fetchMovies(); }, []);

const fetchMovies = async () => { 
        try { 
            // On s'assure que l'erreur est vide avant de commencer 
            setError(null);
            const data = await getAllMovies();
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

  // Re-fetch when search/genre/sort change (debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      const opts: { title?: string; genre?: string; sort?: string } = {};
      if (search) opts.title = search;
      if (genreFilter) opts.genre = genreFilter;
      if (sort) opts.sort = sort;
      fetchMovies(opts);
    }, 300);

    return () => clearTimeout(handler);
  }, [search, genreFilter, sort]);


    // --- RENDU CONDITIONNEL ---
    // Cas 1 : Ça charge 
    if (isLoading) {
        return <div className="loading-spinner">Chargement des films...</div>;
    }

    if (error) {
        return <div className="error-message">Error : {error}</div>;
    }

    const genres = Array.from(new Set(movies.map(m => m.genre).filter(Boolean)));

    return (
    <div style={{ padding: 20, fontFamily: 'Segoe UI, Arial, sans-serif', background: '#f6f7fb', minHeight: '100vh' }}>
      <h1 style={{ margin: 0 }}>Movie Manager</h1>

      <div style={{ marginTop: 16, display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <h2>Ajouter un film</h2>
          <form onSubmit={handleCreate} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input style={{ padding: 8, minWidth: 160 }}
              type="text"
              value={newMovie.title}
              onChange={e => setNewMovie({ ...newMovie, title: e.target.value })}
              placeholder="Titre"
            />
            <input style={{ padding: 8, minWidth: 140 }}
              type="text"
              value={newMovie.director}
              onChange={e => setNewMovie({ ...newMovie, director: e.target.value })}
              placeholder="Réalisateur"
            />
            <input style={{ padding: 8, width: 100 }}
              type="number"
              value={newMovie.year}
              onChange={e => setNewMovie({ ...newMovie, year: parseInt(e.target.value) || 0 })}
              placeholder="Année"
            />
            <input style={{ padding: 8, minWidth: 120 }}
              type="text"
              value={newMovie.genre}
              onChange={e => setNewMovie({ ...newMovie, genre: e.target.value })}
              placeholder="Genre"
            />
            <input style={{ padding: 8, width: 120 }}
              type="number"
              value={newMovie.duration}
              onChange={e => setNewMovie({ ...newMovie, duration: parseInt(e.target.value) || 0 })}
              placeholder="Durée"
            />
            <button type="submit" style={{ padding: '8px 12px' }}>Créer</button>
          </form>
        </div>

        <div style={{ width: 360 }}>
          <h2>Contrôles</h2>
          <div style={controlRowStyle}>
            <input placeholder="Rechercher un film..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, padding: 8 }} />
            <select value={genreFilter} onChange={e => setGenreFilter(e.target.value)} style={{ padding: 8 }}>
              <option value="">Tous les genres</option>
              {genres.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: 8 }}>
              <option value="newest">Plus récents</option>
              <option value="oldest">Plus anciens</option>
            </select>
          </div>
        </div>
      </div>

      <h2 style={{ marginTop: 20 }}>Liste des films</h2>
      <div style={gridStyle}>
        {movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onSelect={handleSelectMovie} onDelete={handleDelete} />
        ))}
      </div>

      {selectedMovie && (
        <div style={{ marginTop: 20, background: '#fff', padding: 12, borderRadius: 8, boxShadow: '0 2px 6px rgba(0,0,0,0.06)' }}>
          <h2>Détails / Modifier : {selectedMovie.title}</h2>
          <form onSubmit={e => handleUpdate(e, selectedMovie._id!)} style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <input type="text" value={editMovie.title} onChange={e => setEditMovie({ ...editMovie, title: e.target.value })} style={{ padding: 8, minWidth: 200 }} />
            <input type="text" value={editMovie.director} onChange={e => setEditMovie({ ...editMovie, director: e.target.value })} style={{ padding: 8, minWidth: 160 }} />
            <input type="number" value={editMovie.year} onChange={e => setEditMovie({ ...editMovie, year: parseInt(e.target.value) || 0 })} style={{ padding: 8, width: 100 }} />
            <input type="text" value={editMovie.genre} onChange={e => setEditMovie({ ...editMovie, genre: e.target.value })} style={{ padding: 8, minWidth: 120 }} />
            <input type="number" value={editMovie.duration} onChange={e => setEditMovie({ ...editMovie, duration: parseInt(e.target.value) || 0 })} style={{ padding: 8, width: 120 }} />
            <button type="submit" style={{ padding: '8px 12px' }}>Mettre à jour</button>
            <button type="button" style={{ padding: '8px 12px' }} onClick={() => setSelectedMovie(null)}>Fermer</button>
          </form>
        </div>
      )}
    </div>
    );
} 


export default App;