export interface Movie { 
    _id: string; // MongoDB génère _id, pas id
    title: string;  
    director: string;
    year: number;
    genre : string;
    duration : number;
}


const BASE_URL = '/api/movies';

// GET /api/movies
export async function getAllMovies(): Promise<Movie[]> {
  const response = await fetch(BASE_URL);

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



// --------------------
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
