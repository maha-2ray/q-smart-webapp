import type { AuthRole } from "../auth";
import type { ListParams } from "../shared";

export interface StaffMember {
  id: string;
  firstName?: string;
  lastName?: string;
  email: string;
  username?: string;
  phoneNumber?: string;
  role: AuthRole | string;
  approved?: boolean;
  createdAt?: string;
}

export interface StaffRequest {
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phoneNumber?: string;
  password?: string;
  role: AuthRole | string;
  approved?: boolean;
}

export interface UpdateUserProfileRequest {
  firstName: string;
  lastName: string;
  email?: string;
}

export type StaffListParams = Pick<ListParams, "pageNumber" | "pageSize">;

export interface StaffListResponse {
  users: StaffMember[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}
