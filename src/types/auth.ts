// src/types/auth.ts
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  message: string;
  data: AuthData;
}

export interface AuthData {
  token: string;
}
