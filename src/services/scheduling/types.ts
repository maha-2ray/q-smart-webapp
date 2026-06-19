export type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

export interface Schedule {
  id: string;
  unitId: string;
  dayOfWeek: DayOfWeek;
  openingTime: string;
  closingTime: string;
  maxCapacity?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ScheduleRequest {
  unitId: string;
  dayOfWeek: DayOfWeek;
  openingTime: string;
  closingTime: string;
  maxCapacity?: number;
}

export interface UpdateScheduleRequest {
  openingTime?: string;
  closingTime?: string;
  maxCapacity?: number;
  isActive?: boolean;
}

export interface ScheduleListResponse {
  schedules: Schedule[];
}
