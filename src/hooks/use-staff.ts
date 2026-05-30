import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { staffService } from "../services/staff";
import type {
  StaffListParams,
  StaffRequest,
  UpdateUserProfileRequest,
} from "../services/staff";
import type { EntityId } from "../services/shared";

export const staffQueryKeys = {
  all: ["staff"] as const,
  list: (params?: StaffListParams) =>
    [...staffQueryKeys.all, "list", params] as const,
  detail: (id: EntityId) => [...staffQueryKeys.all, "detail", id] as const,
  username: (username: string) =>
    [...staffQueryKeys.all, "username", username] as const,
  email: (email: string) => [...staffQueryKeys.all, "email", email] as const,
  emailExists: (email: string) =>
    [...staffQueryKeys.all, "email-exists", email] as const,
  usernameExists: (username: string) =>
    [...staffQueryKeys.all, "username-exists", username] as const,
  totalCount: () => [...staffQueryKeys.all, "total-count"] as const,
};

export const useStaff = (params?: StaffListParams) =>
  useQuery({
    queryKey: staffQueryKeys.list(params),
    queryFn: () => staffService.getStaff(params),
  });

export const useStaffMember = (id: EntityId, enabled = true) =>
  useQuery({
    queryKey: staffQueryKeys.detail(id),
    queryFn: () => staffService.getStaffMember(id),
    enabled: enabled && !!id,
  });

export const useStaffMemberByUsername = (username: string, enabled = true) =>
  useQuery({
    queryKey: staffQueryKeys.username(username),
    queryFn: () => staffService.getStaffMemberByUsername(username),
    enabled: enabled && !!username,
  });

export const useStaffMemberByEmail = (email: string, enabled = true) =>
  useQuery({
    queryKey: staffQueryKeys.email(email),
    queryFn: () => staffService.getStaffMemberByEmail(email),
    enabled: enabled && !!email,
  });

export const useEmailExists = (email: string, enabled = true) =>
  useQuery({
    queryKey: staffQueryKeys.emailExists(email),
    queryFn: () => staffService.checkEmailExists(email),
    enabled: enabled && !!email,
  });

export const useUsernameExists = (username: string, enabled = true) =>
  useQuery({
    queryKey: staffQueryKeys.usernameExists(username),
    queryFn: () => staffService.checkUsernameExists(username),
    enabled: enabled && !!username,
  });

export const useTotalUserCount = () =>
  useQuery({
    queryKey: staffQueryKeys.totalCount(),
    queryFn: staffService.getTotalUserCount,
  });

export const useCreateStaffMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StaffRequest) =>
      staffService.createStaffMember(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
    },
  });
};

export const useUpdateCurrentUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateUserProfileRequest) =>
      staffService.updateCurrentUserProfile(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
    },
  });
};

export const useApproveStaffMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.approveStaffMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
    },
  });
};

export const useDeleteStaffMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: staffService.deleteStaffMember,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: staffQueryKeys.all });
    },
  });
};
