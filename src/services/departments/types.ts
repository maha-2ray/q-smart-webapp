import type { ListParams } from "../shared";

export interface Department {
  id: string;
  name: string;
  description?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface DepartmentRequest {
  name: string;
  description?: string;
}

export interface UpdateDepartmentRequest {
  name?: string;
  description?: string;
  isActive?: boolean;
}

export interface Unit {
  id: string;
  name: string;
  description?: string;
  departmentId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface UnitRequest {
  name: string;
  description?: string;
  departmentId: string;
}

export interface UpdateUnitRequest {
  name?: string;
  description?: string;
}

export type DepartmentListParams = ListParams;

export interface UnitListParams extends ListParams {
  departmentId?: string;
}
