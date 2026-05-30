export type AuthRole = "USER" | "STAFF" | "ADMIN" | "SUPER_ADMIN";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
  role: AuthRole | string;
}

export interface AuthResponse {
  message?: string;
  username?: string;
  email?: string;
  token?: string;
  refreshToken?: string;
}

export interface UserResponse {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  role?: AuthRole | string;
  approved?: boolean;
  createdAt?: string;
}

export interface ApiErrorResponse {
  message?: string;
  error?: string;
  status?: number;
  path?: string;
  timestamp?: string;
}
