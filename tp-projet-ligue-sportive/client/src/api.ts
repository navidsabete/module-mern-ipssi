// ============================
// INTERFACES
// ============================

export interface User {
  id: number;
  username: string;
  email: string;
  role: "adherent" | "admin";
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

