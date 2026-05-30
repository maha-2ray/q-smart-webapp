import { apiClient } from "../../libs/api/api-client";
import type { EntityId, MessageResponse } from "../shared";
import type {
  Department,
  DepartmentListParams,
  DepartmentRequest,
  UpdateDepartmentRequest,
  UpdateUnitRequest,
  Unit,
  UnitListParams,
  UnitRequest,
} from "./types";

const DEPARTMENTS_BASE_PATH = "/api/v1/departments";
const UNITS_BASE_PATH = "/api/v1/units";

export const departmentService = {
  getDepartments: async (params?: DepartmentListParams) => {
    const response = await apiClient.get<Department[]>(DEPARTMENTS_BASE_PATH, {
      params,
    });
    return response.data;
  },

  getDepartment: async (id: EntityId) => {
    const response = await apiClient.get<Department>(
      `${DEPARTMENTS_BASE_PATH}/${id}`,
    );
    return response.data;
  },

  createDepartment: async (payload: DepartmentRequest) => {
    const response = await apiClient.post<Department>(
      DEPARTMENTS_BASE_PATH,
      payload,
    );
    return response.data;
  },

  updateDepartment: async (id: EntityId, payload: UpdateDepartmentRequest) => {
    const response = await apiClient.put<Department>(
      `${DEPARTMENTS_BASE_PATH}/${id}`,
      payload,
    );
    return response.data;
  },

  deleteDepartment: async (id: EntityId) => {
    const response = await apiClient.delete<MessageResponse>(
      `${DEPARTMENTS_BASE_PATH}/${id}`,
    );
    return response.data;
  },

  getUnits: async (params?: UnitListParams) => {
    const response = await apiClient.get<Unit[]>(UNITS_BASE_PATH, {
      params,
    });
    return response.data;
  },

  getUnit: async (id: EntityId) => {
    const response = await apiClient.get<Unit>(`${UNITS_BASE_PATH}/${id}`);
    return response.data;
  },

  getActiveUnitsByDepartment: async (departmentId: EntityId) => {
    const response = await apiClient.get<Unit[]>(
      `${UNITS_BASE_PATH}/department/${departmentId}/active`,
    );
    return response.data;
  },

  createUnit: async (payload: UnitRequest) => {
    const response = await apiClient.post<Unit>(UNITS_BASE_PATH, payload);
    return response.data;
  },

  updateUnit: async (id: EntityId, payload: UpdateUnitRequest) => {
    const response = await apiClient.patch<Unit>(
      `${UNITS_BASE_PATH}/${id}`,
      payload,
    );
    return response.data;
  },

  deleteUnit: async (id: EntityId) => {
    const response = await apiClient.delete<MessageResponse>(
      `${UNITS_BASE_PATH}/${id}`,
    );
    return response.data;
  },
};
