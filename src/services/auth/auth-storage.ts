import type { AuthResponse } from "./types";

const AUTH_TOKEN_KEY = "authToken";
const REFRESH_TOKEN_KEY = "refreshToken";
const USER_EMAIL_KEY = "userEmail";
const USERNAME_KEY = "username";

const canUseStorage = () => typeof window !== "undefined";

export const authStorage = {
  getAccessToken: () =>
    canUseStorage() ? localStorage.getItem(AUTH_TOKEN_KEY) : null,

  getRefreshToken: () =>
    canUseStorage() ? localStorage.getItem(REFRESH_TOKEN_KEY) : null,

  setAuth: (auth: AuthResponse) => {
    if (!canUseStorage()) return;

    if (auth.token) {
      localStorage.setItem(AUTH_TOKEN_KEY, auth.token);
    }

    if (auth.refreshToken) {
      localStorage.setItem(REFRESH_TOKEN_KEY, auth.refreshToken);
    }

    if (auth.email) {
      localStorage.setItem(USER_EMAIL_KEY, auth.email);
    }

    if (auth.username) {
      localStorage.setItem(USERNAME_KEY, auth.username);
    }
  },

  clearAuth: () => {
    if (!canUseStorage()) return;

    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    localStorage.removeItem(USER_EMAIL_KEY);
    localStorage.removeItem(USERNAME_KEY);
  },
};
