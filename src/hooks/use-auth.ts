import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService, authStorage } from "../services/auth";
import type { LoginRequest, RegisterRequest } from "../services/auth";

export const authQueryKeys = {
  all: ["auth"] as const,
  currentUser: () => [...authQueryKeys.all, "current-user"] as const,
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => authService.login(payload),
    onSuccess: (data) => {
      authStorage.setAuth(data);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RegisterRequest) => authService.register(payload),
    onSuccess: (data) => {
      authStorage.setAuth(data);
      queryClient.invalidateQueries({ queryKey: authQueryKeys.currentUser() });
    },
  });
};

export const useRefreshToken = () =>
  useMutation({
    mutationFn: (refreshToken?: string) =>
      authService.refreshToken(refreshToken),
    onSuccess: (data) => {
      authStorage.setAuth(data);
    },
  });

export const useCurrentUser = (enabled = true) =>
  useQuery({
    queryKey: authQueryKeys.currentUser(),
    queryFn: authService.getCurrentUser,
    enabled: enabled && !!authStorage.getAccessToken(),
  });

export const useLogout = () => {
  const queryClient = useQueryClient();

  return () => {
    authService.logout();
    queryClient.removeQueries({ queryKey: authQueryKeys.all });
  };
};
