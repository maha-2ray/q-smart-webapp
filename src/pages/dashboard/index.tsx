import React from "react";
import { PageLayout } from "../../components/layouts/page-layout";
import SummaryCard from "../../components/ui/summary-cards";
import type { DepartmentCardProps } from "../../components/ui/department-card";
import DepartmentCard from "../../components/ui/department-card";

const Dashboard: React.FC = () => {
  const summaryCardsData = [
    { title: "Total Waiting", value: 25, rate: 5 },
    { title: "Global Avg. Waiting Time", value: "15 mins", rate: -2 },
    { title: "Total Served", value: 120, rate: 10 },
    { title: "Staff on Duty", value: 8, rate: 0 },
  ];

  const departmentCardsData: DepartmentCardProps[] = [
    {
      id: "1",
      name: "Customer Service",
      ticketPrefix: "CS",
      status: "open",
      peopleWaiting: 5,
      avgWaitingTime: 10,
    },
    {
      id: "2",
      name: "Technical Support",
      ticketPrefix: "TS",
      status: "open",
      peopleWaiting: 3,
      avgWaitingTime: 15,
    },
    {
      id: "3",
      name: "Billing",
      ticketPrefix: "BL",
      status: "closed",
      peopleWaiting: 0,
      avgWaitingTime: 0,
    },
    {
      id: "4",
      name: "Sales",
      ticketPrefix: "SL",
      status: "open",
      peopleWaiting: 7,
      avgWaitingTime: 8,
    },
  ];

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
          {departmentCardsData.map((dept) => (
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
