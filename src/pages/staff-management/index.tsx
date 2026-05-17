import { PageLayout } from "../../components/layouts/page-layout";
import React, { useState, useMemo } from "react";
import { StaffHeader, StaffTable } from "./components";
import type { StaffMember } from "./components";

const mockStaffData: StaffMember[] = [
  {
    id: "1",
    name: "Sarah Jenkins",
    email: "sarah.j@citybank.com",
    role: "Agent",
    departments: ["Loan Applications", "Account Services"],
    status: "Active",
  },
  {
    id: "2",
    name: "John Smith",
    email: "jsmith@citybank.com",
    role: "Agent",
    departments: ["Account Services"],
    status: "Active",
  },
  {
    id: "3",
    name: "Maria Garcia",
    email: "mgarcia@citybank.com",
    role: "Agent",
    departments: ["Account Services", "Teller Services"],
    status: "Active",
  },
  {
    id: "4",
    name: "David Chen",
    email: "dchen@citybank.com",
    role: "Admin",
    departments: ["All Departments"],
    status: "Active",
  },
  {
    id: "5",
    name: "Emily Wilson",
    email: "ewilson@citybank.com",
    role: "Agent",
    departments: ["Teller Services"],
    status: "Inactive",
  },
  {
    id: "6",
    name: "Michael Brown",
    email: "mbrown@citybank.com",
    role: "Supervisor",
    departments: ["Loan Applications"],
    status: "Active",
  },
  {
    id: "7",
    name: "Jessica Lee",
    email: "jlee@citybank.com",
    role: "Agent",
    departments: ["Account Services"],
    status: "Active",
  },
  {
    id: "8",
    name: "Robert Martinez",
    email: "rmartinez@citybank.com",
    role: "Agent",
    departments: ["Teller Services"],
    status: "Active",
  },
  {
    id: "9",
    name: "Amanda Taylor",
    email: "ataylor@citybank.com",
    role: "Supervisor",
    departments: ["Account Services", "Teller Services"],
    status: "Active",
  },
  {
    id: "10",
    name: "Christopher Anderson",
    email: "canderson@citybank.com",
    role: "Agent",
    departments: ["Loan Applications"],
    status: "Active",
  },
  {
    id: "11",
    name: "Lauren White",
    email: "lwhite@citybank.com",
    role: "Agent",
    departments: ["Account Services"],
    status: "Inactive",
  },
  {
    id: "12",
    name: "Daniel Harris",
    email: "dharris@citybank.com",
    role: "Admin",
    departments: ["All Departments"],
    status: "Active",
  },
];

const StaffManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStaff = useMemo(() => {
    if (!searchQuery) return mockStaffData;

    return mockStaffData.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddStaff = () => {
    // TODO: Implement add staff modal
    console.log("Add staff clicked");
  };

  const handleEdit = (staff: StaffMember) => {
    // TODO: Implement edit staff modal
    console.log("Edit staff:", staff);
  };

  const handleDelete = (id: string) => {
    // TODO: Implement delete confirmation
    console.log("Delete staff:", id);
  };

  return (
    <PageLayout
      title="Staff Management"
      subtitle="Manage team members, roles, and department assignments."
    >
      <StaffHeader onSearch={handleSearch} onAddStaff={handleAddStaff} />
      <StaffTable
        data={filteredStaff}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </PageLayout>
  );
};

export default StaffManagement;
