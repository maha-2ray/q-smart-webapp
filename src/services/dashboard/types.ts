export interface TicketDashboardStats {
  totalTickets: number;
  waitingCount: number;
  calledCount: number;
  completedCount: number;
  cancelledCount: number;
}

export interface DepartmentStats {
  totalDepartments: number;
  totalUnitsInDepartments: number;
  averageUnitsPerDepartment: number;
}
