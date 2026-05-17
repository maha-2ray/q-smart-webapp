import React from "react";
import type { TableColumn } from "react-data-table-component";
import Table from "../../../components/ui/table";

export interface StaffEfficiencyRecord {
  id: string;
  name: string;
  department: string;
  ticketsServed: number;
  avgServiceTime: string;
}

interface StaffEfficiencyTableProps {
  data: StaffEfficiencyRecord[];
}

export const StaffEfficiencyTable: React.FC<StaffEfficiencyTableProps> = ({
  data,
}) => {
  const columns: TableColumn<StaffEfficiencyRecord>[] = [
    {
      name: "STAFF NAME",
      selector: (row) => row.name,
      cell: (row) => (
        <span className="font-semibold text-gray-900">{row.name}</span>
      ),
      width: "200px",
    },
    {
      name: "DEPARTMENT",
      selector: (row) => row.department,
      cell: (row) => <span className="text-gray-700">{row.department}</span>,
      width: "180px",
    },
    {
      name: "TICKETS SERVED",
      selector: (row) => row.ticketsServed,
      cell: (row) => (
        <span className="font-medium text-gray-900">{row.ticketsServed}</span>
      ),
      width: "150px",
    },
    {
      name: "AVG SERVICE TIME",
      selector: (row) => row.avgServiceTime,
      cell: (row) => (
        <span className="font-medium text-gray-900">{row.avgServiceTime}</span>
      ),
      width: "150px",
    },
  ];

  return (
    <div className="bg-white rounded-xl border border-slate-200">
      <div className="p-6 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-gray-900">
          Staff Efficiency
        </h2>
      </div>
      <Table
        columns={columns}
        data={data}
        pagination={true}
        selectableRows={false}
      />
    </div>
  );
};
