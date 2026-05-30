import React from "react";
import { PageLayout } from "../../components/layouts/page-layout";
import SummaryCard from "../../components/ui/summary-cards";
import type { DepartmentCardProps } from "../../components/ui/department-card";
import DepartmentCard from "../../components/ui/department-card";
import {
  useDepartmentDashboardStats,
  useTicketDashboardStats,
} from "../../hooks/use-dashboard";
import { useDepartments } from "../../hooks/use-departments";

const Dashboard: React.FC = () => {
  const ticketStatsQuery = useTicketDashboardStats();
  const departmentStatsQuery = useDepartmentDashboardStats();
  const departmentsQuery = useDepartments();

  const ticketStats = ticketStatsQuery.data;
  const departmentStats = departmentStatsQuery.data;
  const departments = departmentsQuery.data || [];

  const summaryCardsData = [
    { title: "Total Tickets", value: ticketStats?.totalTickets ?? 0, rate: 0 },
    { title: "Waiting", value: ticketStats?.waitingCount ?? 0, rate: 0 },
    { title: "Completed", value: ticketStats?.completedCount ?? 0, rate: 0 },
    {
      title: "Departments",
      value: departmentStats?.totalDepartments ?? departments.length,
      rate: 0,
    },
  ];

  const departmentCardsData: DepartmentCardProps[] = departments.map(
    (department, index) => ({
      id: department.id,
      name: department.name,
      ticketPrefix: department.name.slice(0, 2).toUpperCase() || `${index + 1}`,
      status: department.isActive === false ? "closed" : "open",
      peopleWaiting: 0,
      avgWaitingTime: 0,
    }),
  );

  return (
    <PageLayout
      title="Dashboard"
      subtitle="Real-time queue metrics across all departments"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCardsData.map((card, index) => (
          <SummaryCard
            key={index}
            title={card.title}
            value={card.value}
            rate={card.rate}
          />
        ))}
      </div>
      <div>
        <h2 className="text-lg font-semibold text-primary mt-8 mb-4">
          Department Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {departmentsQuery.isLoading && (
            <p className="text-sm text-gray-500">Loading departments...</p>
          )}
          {!departmentsQuery.isLoading &&
            departmentCardsData.map((dept) => (
              <DepartmentCard
                key={dept.id}
                id={dept.id}
                name={dept.name}
                ticketPrefix={dept.ticketPrefix}
                status={dept.status}
                peopleWaiting={dept.peopleWaiting}
                avgWaitingTime={dept.avgWaitingTime}
              />
            ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;
