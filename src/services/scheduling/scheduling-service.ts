import { apiClient } from "../../libs/api/api-client";
import type { EntityId, MessageResponse } from "../shared";
import type {
  DayOfWeek,
  Schedule,
  ScheduleListResponse,
  ScheduleRequest,
  UpdateScheduleRequest,
} from "./types";

const SCHEDULES_BASE_PATH = "/api/v1/schedules";

export const schedulingService = {
  getSchedules: async () => {
    const response = await apiClient.get<ScheduleListResponse | Schedule[]>(
      SCHEDULES_BASE_PATH,
    );
    return response.data;
  },

  getSchedule: async (id: EntityId) => {
    const response = await apiClient.get<Schedule>(
      `${SCHEDULES_BASE_PATH}/${id}`,
    );
    return response.data;
  },

  createSchedule: async (payload: ScheduleRequest) => {
    const response = await apiClient.post<Schedule>(
      SCHEDULES_BASE_PATH,
      payload,
    );
    return response.data;
  },

  updateSchedule: async (id: EntityId, payload: UpdateScheduleRequest) => {
    const response = await apiClient.put<Schedule>(
      `${SCHEDULES_BASE_PATH}/${id}`,
      payload,
    );
    return response.data;
  },

  getSchedulesByUnit: async (unitId: EntityId) => {
    const response = await apiClient.get<ScheduleListResponse | Schedule[]>(
      `${SCHEDULES_BASE_PATH}/unit/${unitId}`,
    );
    return response.data;
  },

  getSchedulesByUnitAndDay: async (unitId: EntityId, dayOfWeek: DayOfWeek) => {
    const response = await apiClient.get<ScheduleListResponse | Schedule[]>(
      `${SCHEDULES_BASE_PATH}/unit/${unitId}/day/${dayOfWeek}`,
    );
    return response.data;
  },

  deleteSchedule: async (id: EntityId) => {
    const response = await apiClient.delete<MessageResponse>(
      `${SCHEDULES_BASE_PATH}/${id}`,
    );
    return response.data;
  },
};
