// ============================
// INTERFACES
// ============================

export interface User {
  _id: string; // MongoDB ObjectId
  username: string;
  email: string;
  role: "adherent" | "admin";
}

export interface Product {
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  is_dispo: boolean;
  category: string;
  price: number;
  qte_stock: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  role: string
}

export interface AdherentCreationData {
  username: string;
  email: string;
  password: string;
  role: string
}

export interface AdherentUpdateData {
  username: string;
  email: string;
  password: string;
  role: string
}

export interface ProductCreationData {
  name: string;
  description: string;
  is_dispo: boolean;
  category: string;
  price: number;
  qte_stock: number;
}

export interface ProductUpdateData {
  name: string;
  description: string;
  is_dispo: boolean;
  category: string;
  price: number;
  qte_stock: number;
}


const BASE_URL = "/api";

export async function register(data: RegisterData): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/inscription`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const result: AuthResponse = await response.json();

  // 🔐 Stockage du token et du rôle
  localStorage.setItem("token", result.token);
  localStorage.setItem("role", result.user.role);

  return result;
}


export async function login(data: LoginData): Promise<AuthResponse> {
  const response = await fetch(`${BASE_URL}/connexion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  const result: AuthResponse = await response.json();

  // 🔐 Stockage du token et du rôle
  localStorage.setItem("token", result.token);
  localStorage.setItem("role", result.user.role);

  return result;
}

// ============================
// USERS (ADMIN)
// ============================


export async function getAllAdherents(): Promise<User[]> {
  const response = await fetch(`${BASE_URL}/adherents`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}

export async function getAdherentById(id: string): Promise<User> {
  const response = await fetch(`${BASE_URL}/adherents/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}


export async function createAdherent(data: AdherentCreationData): Promise<User> {
  const response = await fetch(`${BASE_URL}/adherents`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();

}


export async function updateAdherent(id: string, data: Partial<AdherentUpdateData>): Promise<User> {
  const response = await fetch(`${BASE_URL}/adherents/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();

}

export async function deleteAdherent(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/adherents/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

}


// ============================
// PRODUCTS (ADMIN)
// ============================


export async function getAllProducts(): Promise<Product[]> {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}



export async function getProductById(id: string): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`);

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();
}


export async function createProduct(data: ProductCreationData): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();

}


export async function updateProduct(id: string, data: Partial<ProductUpdateData>): Promise<Product> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

  return response.json();

}

export async function deleteProduct(id: string): Promise<void> {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Erreur HTTP: ${response.status}`);
  }

}