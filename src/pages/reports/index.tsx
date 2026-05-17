import React, { useState } from "react";
import { PageLayout } from "../../components/layouts/page-layout";
import {
  MetricsCards,
  FiltersSection,
  StaffEfficiencyTable,
} from "./components";
import type { MetricCard } from "./components/metric-cards";
import type { StaffEfficiencyRecord } from "./components/staff-efficiency-table";

const mockMetricsData: MetricCard[] = [
  {
    title: "Total Tickets Served",
    value: "1,423",
    rate: "+2% vs previous period",
    trend: "up",
  },
  {
    title: "Average Service Duration",
    value: "18m 30s",
    rate: "-1m 15s vs previous period",
    trend: "down",
  },
  {
    title: "No-Show Rate",
    value: "4.2%",
    rate: "-0.8% vs previous period",
    trend: "down",
  },
  {
    title: "Peak Wait Time",
    value: "45m",
    rate: "Usually around 1:00 PM",
    trend: "neutral",
  },
];

const mockStaffEfficiencyData: StaffEfficiencyRecord[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    department: "Loan Applications",
    ticketsServed: 184,
    avgServiceTime: "22m 10s",
  },
  {
    id: "2",
    name: "John Smith",
    department: "Account Services",
    ticketsServed: 245,
    avgServiceTime: "14m 45s",
  },
  {
    id: "3",
    name: "Maria Garcia",
    department: "Account Services",
    ticketsServed: 210,
    avgServiceTime: "15m 20s",
  },
  {
    id: "4",
    name: "Emily Wilson",
    department: "Teller Services",
    ticketsServed: 312,
    avgServiceTime: "8m 15s",
  },
  {
    id: "5",
    name: "David Chen",
    department: "Loan Applications",
    ticketsServed: 156,
    avgServiceTime: "25m 30s",
  },
  {
    id: "6",
    name: "Michael Brown",
    department: "Account Services",
    ticketsServed: 198,
    avgServiceTime: "18m 45s",
  },
  {
    id: "7",
    name: "Jessica Lee",
    department: "Teller Services",
    ticketsServed: 276,
    avgServiceTime: "10m 20s",
  },
  {
    id: "8",
    name: "Robert Martinez",
    department: "Loan Applications",
    ticketsServed: 142,
    avgServiceTime: "28m 00s",
  },
  {
    id: "9",
    name: "Amanda Taylor",
    department: "Account Services",
    ticketsServed: 267,
    avgServiceTime: "12m 50s",
  },
  {
    id: "10",
    name: "Christopher Anderson",
    department: "Teller Services",
    ticketsServed: 289,
    avgServiceTime: "9m 30s",
  },
  {
    id: "11",
    name: "Lauren White",
    department: "Loan Applications",
    ticketsServed: 167,
    avgServiceTime: "24m 15s",
  },
  {
    id: "12",
    name: "Daniel Harris",
    department: "Account Services",
    ticketsServed: 223,
    avgServiceTime: "16m 00s",
  },
];

const Reports: React.FC = () => {
  const [dateRange, setDateRange] = useState("last-7-days");
  const [department, setDepartment] = useState("all");

  const handleApplyFilters = () => {
    // TODO: Implement filter logic
    console.log("Filters applied:", { dateRange, department });
  };

  const handleExportCSV = () => {
    // Create CSV content
    const headers = [
      "Staff Name",
      "Department",
      "Tickets Served",
      "Avg Service Time",
    ];
    const rows = mockStaffEfficiencyData.map((record) => [
      record.name,
      record.department,
      record.ticketsServed,
      record.avgServiceTime,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `staff-efficiency-report-${new Date().toISOString().split("T")[0]}.csv`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <PageLayout
      title="Reports & Analytics"
      subtitle="Review performance metrics, wait times, and staff efficiency."
    >
      <FiltersSection
        dateRange={dateRange}
        department={department}
        onDateRangeChange={setDateRange}
        onDepartmentChange={setDepartment}
        onApplyFilters={handleApplyFilters}
        onExportCSV={handleExportCSV}
      />

      <MetricsCards data={mockMetricsData} />

      <div className="mt-8">
        <StaffEfficiencyTable data={mockStaffEfficiencyData} />
      </div>
    </PageLayout>
  );
};

export default Reports;
