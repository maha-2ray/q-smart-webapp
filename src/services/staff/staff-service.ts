import { apiClient } from "../../libs/api/api-client";
import type { EntityId, MessageResponse } from "../shared";
import type {
  StaffListParams,
  StaffListResponse,
  StaffMember,
  StaffRequest,
  UpdateUserProfileRequest,
} from "./types";

const USERS_BASE_PATH = "/api/v1/users";

export const staffService = {
  getStaff: async (params?: StaffListParams) => {
    const response = await apiClient.get<StaffListResponse>(USERS_BASE_PATH, {
      params,
    });
    return response.data;
  },

  getStaffMemberByUsername: async (username: string) => {
    const response = await apiClient.get<StaffMember>(
      `${USERS_BASE_PATH}/username/${username}`,
    );
    return response.data;
  },

  getStaffMemberByEmail: async (email: string) => {
    const response = await apiClient.get<StaffMember>(
      `${USERS_BASE_PATH}/email/${email}`,
    );
    return response.data;
  },

  getStaffMember: async (id: EntityId) => {
    const response = await apiClient.get<StaffMember>(
      `${USERS_BASE_PATH}/${id}`,
    );
    return response.data;
  },

  createStaffMember: async (payload: StaffRequest) => {
    const response = await apiClient.post<StaffMember>(
      USERS_BASE_PATH,
      payload,
    );
    return response.data;
  },

  updateCurrentUserProfile: async (payload: UpdateUserProfileRequest) => {
    const response = await apiClient.patch<StaffMember>(
      `${USERS_BASE_PATH}/me`,
      payload,
    );
    return response.data;
  },

  approveStaffMember: async (id: EntityId) => {
    const response = await apiClient.post<Record<string, unknown>>(
      `${USERS_BASE_PATH}/approve-admin/${id}`,
    );
    return response.data;
  },

  checkEmailExists: async (email: string) => {
    const response = await apiClient.get<boolean>(
      `${USERS_BASE_PATH}/check/email/${email}`,
    );
    return response.data;
  },

  checkUsernameExists: async (username: string) => {
    const response = await apiClient.get<boolean>(
      `${USERS_BASE_PATH}/check/username/${username}`,
    );
    return response.data;
  },

  getTotalUserCount: async () => {
    const response = await apiClient.get<number>(
      `${USERS_BASE_PATH}/stats/total-count`,
    );
    return response.data;
  },

  deleteStaffMember: async (id: EntityId) => {
    const response = await apiClient.delete<MessageResponse>(
      `${USERS_BASE_PATH}/${id}`,
    );
    return response.data;
  },
};
