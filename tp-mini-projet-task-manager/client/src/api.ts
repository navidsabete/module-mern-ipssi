export interface Task { 
    id: number; // Généré par le serveur (ex: Date.now())
    label: string;  // Le texte de la tâche
    isDone: boolean; // false par défaut à la création
}


const BASE_URL = '/api/tasks';

// GET /api/tasks
export async function getAllTasks(): Promise<Task[]> {
  const response = await fetch(BASE_URL);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}

// POST /api/tasks
export async function createTask(label: string): Promise<Task> {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ label }),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}

// PUT /api/tasks/:id
export async function toggleTask(id: number): Promise<Task> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}

// DELETE /api/tasks/:id
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }
}
