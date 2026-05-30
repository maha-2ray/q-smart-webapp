import { apiClient } from "../../libs/api/api-client";
import { authStorage } from "./auth-storage";
import type {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
  UserResponse,
} from "./types";

const AUTH_BASE_PATH = "/api/v1/auth";
const USERS_BASE_PATH = "/api/v1/users";

export const authService = {
  login: async (payload: LoginRequest) => {
    const response = await apiClient.post<AuthResponse>(
      `${AUTH_BASE_PATH}/login`,
      payload,
    );
    return response.data;
  },

  register: async (payload: RegisterRequest) => {
    const response = await apiClient.post<AuthResponse>(
      `${AUTH_BASE_PATH}/register`,
      payload,
    );
    return response.data;
  },

  refreshToken: async (refreshToken = authStorage.getRefreshToken()) => {
    const response = await apiClient.post<AuthResponse>(
      `${AUTH_BASE_PATH}/refresh-token`,
      null,
      {
        headers: refreshToken
          ? {
              Authorization: `Bearer ${refreshToken}`,
            }
          : undefined,
      },
    );
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get<UserResponse>(`${USERS_BASE_PATH}/me`);
    return response.data;
  },

  logout: () => {
    authStorage.clearAuth();
  },
};
