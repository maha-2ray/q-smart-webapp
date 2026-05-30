import { apiClient } from "../../libs/api/api-client";
import type { DepartmentStats, TicketDashboardStats } from "./types";

const DASHBOARD_BASE_PATH = "/api/v1/dashboard";

export const dashboardService = {
  getTicketStats: async () => {
    const response = await apiClient.get<TicketDashboardStats>(
      `${DASHBOARD_BASE_PATH}/ticket-stats`,
    );
    return response.data;
  },

  getDepartmentStats: async () => {
    const response = await apiClient.get<DepartmentStats>(
      `${DASHBOARD_BASE_PATH}/department-stats`,
    );
    return response.data;
  },
};
