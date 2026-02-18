import { useState, useEffect } from 'react';
import { getMovieById, createMovie, updateMovie, deleteMovie, type Movie } from './api';

// Small presentational card for a movie
function MovieCard({ movie, onSelect, onDelete }: { movie: Movie; onSelect: (id: string) => void; onDelete: (id: string) => void; }) {
  return (
    <div style={cardStyle} onClick={() => onSelect(movie._id!)}>
      <img src={(movie as any).poster || 'https://via.placeholder.com/300x420?text=No+Poster'} alt={movie.title} style={posterStyle} />
      <div style={{ padding: 8 }}>
        <div style={{ fontWeight: 700 }}>{movie.title}</div>
        <div style={{ color: '#555', fontSize: 13 }}>{movie.year} • {movie.genre}</div>
        <div style={{ color: '#555', fontSize: 13 }}><i>{movie.description}</i></div>
        <div style={{ marginTop: 8, display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <button style={viewButtonStyle} onClick={(e) => { e.stopPropagation(); onSelect(movie._id!); }}>Voir</button>
          <button style={deleteButtonStyle} onClick={(e) => { e.stopPropagation(); onDelete(movie._id!); }}>Supprimer</button>
        </div>
      </div>
    </div>
  );
}

// Inline styles
const gridStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: 16,
  marginTop: 12,
};
const cardStyle: React.CSSProperties = {
  background: '#fff',
  border: '1px solid #e3e3e3',
  borderRadius: 8,
  overflow: 'hidden',
  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
};
const posterStyle: React.CSSProperties = { width: '100%', height: 300, objectFit: 'cover' };
const deleteButtonStyle: React.CSSProperties = { background: '#ff4d4f', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' };
const viewButtonStyle: React.CSSProperties = { background: '#1890ff', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: 4, cursor: 'pointer' };
const controlRowStyle: React.CSSProperties = { display: 'flex', gap: 8, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' };

function App() { 

  
// 1. Les Données (Succès) 
const [movies, setMovies] = useState<Movie[]>([]); 
const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
const [newMovie, setNewMovie] = useState({
    title: "",
    director: "",
    year: 2026,
    genre: "",
    duration: 0,
    description: ""
  });
  const [editMovie, setEditMovie] = useState({
    title: "",
    director: "",
    year: 2026,
    genre: "",
    duration: 0,
    description: ""
  });

    // Reactive controls (search / genre / sort)
    const [search, setSearch] = useState("");
    const [genreFilter, setGenreFilter] = useState("");
    const [sort, setSort] = useState('newest');

// 2. L'état de chargement (Pendant l'attente) -> true par défaut
const [isLoading, setIsLoading] = useState(true); 

// 3. L'erreur (En cas de pépin) -> null par défaut 
const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    // On lance la récupération
    fetchMovies(); }, []);

const fetchMovies = async (opts?: { title?: string; genre?: string; sort?: string }) => { 
    try { 
      setError(null);
      let url = '/api/movies';
      const params = new URLSearchParams();
      if (opts?.title) params.append('title', opts.title);
      if (opts?.genre) params.append('genre', opts.genre);
      if (opts?.sort) params.append('sort', opts.sort);
      const query = params.toString();
      if (query) url += `?${query}`;

      const response = await fetch(url);
      if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);
      const data = await response.json();
      setMovies(data as Movie[]);
    }
    catch(err: any){
      console.error("Erreur fetch:", err);
      setError(err.message || "Impossible de contacter le serveur");
    }
    finally { 
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
               duration: movie.duration,
               description: movie.description || ""
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
      setNewMovie({ title: "", director: "", year: 2026, genre: "", duration: 0, description: "" });
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
            <input style={{ padding: 8, minWidth: 160 }}
              type="text"
              value={newMovie.description}
              onChange={e => setNewMovie({ ...newMovie, description: e.target.value || "" })}
              placeholder="Description"
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
            <input type="text" value={editMovie.description} onChange={e => setEditMovie({ ...editMovie, description: e.target.value })} style={{ padding: 8, minWidth: 120 }} />
            <button type="submit" style={{ padding: '8px 12px' }}>Mettre à jour</button>
            <button type="button" style={{ padding: '8px 12px' }} onClick={() => setSelectedMovie(null)}>Fermer</button>
          </form>
        </div>
      )}
    </div>
    );
} 


export default App;