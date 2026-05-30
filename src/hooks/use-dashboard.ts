import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "../services/dashboard";

export const dashboardQueryKeys = {
  all: ["dashboard"] as const,
  ticketStats: () => [...dashboardQueryKeys.all, "ticket-stats"] as const,
  departmentStats: () =>
    [...dashboardQueryKeys.all, "department-stats"] as const,
};

export const useTicketDashboardStats = () =>
  useQuery({
    queryKey: dashboardQueryKeys.ticketStats(),
    queryFn: dashboardService.getTicketStats,
  });

export const useDepartmentDashboardStats = () =>
  useQuery({
    queryKey: dashboardQueryKeys.departmentStats(),
    queryFn: dashboardService.getDepartmentStats,
  });
