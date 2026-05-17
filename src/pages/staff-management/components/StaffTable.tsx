import React from "react";
import type { TableColumn } from "react-data-table-component";
import Table from "../../../components/ui/table";
import { StatusBadge } from "./StatusBadge";
import { DepartmentBadge } from "./DepartmentBadge";

export interface StaffMember {
  id: string;
  name: string;
  email: string;
  role: string;
  departments: string[];
  status: "Active" | "Inactive";
}

type StaffTableProps = {
  data: StaffMember[];
  onEdit?: (staff: StaffMember) => void;
  onDelete?: (id: string) => void;
};

export const StaffTable: React.FC<StaffTableProps> = ({
  data,
  onEdit,
  onDelete,
}) => {
  const columns: TableColumn<StaffMember>[] = [
    {
      name: "STAFF MEMBER",
      selector: (row) => row.name,
      cell: (row) => (
        <div className="flex flex-col">
          <span className="font-semibold text-gray-900">{row.name}</span>
          <span className="text-gray-500 text-sm">{row.email}</span>
        </div>
      ),
      width: "200px",
    },
    {
      name: "ROLE",
      selector: (row) => row.role,
      cell: (row) => <span className="font-medium">{row.role}</span>,
      width: "120px",
    },
    {
      name: "DEPARTMENTS",
      selector: (row) => row.departments.join(", "),
      cell: (row) => <DepartmentBadge departments={row.departments} />,
      width: "250px",
    },
    {
      name: "STATUS",
      selector: (row) => row.status,
      cell: (row) => <StatusBadge status={row.status} />,
      width: "120px",
    },
    {
      name: "ACTIONS",
      cell: (row) => (
        <div className="flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(row)}
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(row.id)}
              className="text-red-600 hover:text-red-800 font-medium text-sm"
            >
              Delete
            </button>
          )}
        </div>
      ),
      width: "120px",
    },
  ];

  return (
    <Table
      columns={columns}
      data={data}
      pagination={true}
      selectableRows={false}
    />
  );
};
