export interface Movie { 
    _id: string; // MongoDB génère _id, pas id
    title: string;  
    director: string;
    year: number;
    genre : string;
    duration : number;
    poster?: string;
    description?: string;
}


const BASE_URL = '/api/movies';

export interface MovieFilters {
  title?: string;
  genre?: string;
  sort?: 'year';
}

// GET /api/movies?title=&genre=&sort=
export async function getAllMovies(filters?: MovieFilters): Promise<Movie[]> {
  const params = new URLSearchParams();
  if (filters?.title) params.append('title', filters.title);
  if (filters?.genre) params.append('genre', filters.genre);
  if (filters?.sort)  params.append('sort', filters.sort);

  const url = params.toString() ? `${BASE_URL}?${params}` : BASE_URL;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}

// GET /api/movies/:id → récupérer un film par ID
export async function getMovieById(id: string): Promise<Movie> {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}




// POST /api/movies → créer un film
export async function createMovie(movie: Omit<Movie, "_id">): Promise<Movie> {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}



// PUT /api/movies/:id → mettre à jour un film
export async function updateMovie(id: string, updateData: Partial<Movie>): Promise<Movie> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}


// DELETE /api/movies/:id → supprimer un film
export async function deleteMovie(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
}
