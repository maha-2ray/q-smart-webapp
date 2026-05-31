import { PageLayout } from "../../components/layouts/page-layout";
import React, { useState, useMemo } from "react";
import { StaffHeader, StaffTable } from "./components";
import type { StaffMember } from "./components";
import {
  useApproveStaffMember,
  useDeleteStaffMember,
  useStaff,
} from "../../hooks/use-staff";

const StaffManagement: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const staffQuery = useStaff();
  const approveStaffMember = useApproveStaffMember();
  const deleteStaffMember = useDeleteStaffMember();

  const staffData: StaffMember[] = useMemo(
    () =>
      (staffQuery.data?.users || []).map((staff) => ({
        id: staff.id,
        name:
          [staff.firstName, staff.lastName].filter(Boolean).join(" ") ||
          staff.username ||
          staff.email,
        email: staff.email,
        role: staff.role,
        departments: ["Unassigned"],
        status: staff.approved === false ? "Inactive" : "Active",
      })),
    [staffQuery.data],
  );

  const filteredStaff = useMemo(() => {
    if (!searchQuery) return staffData;

    return staffData.filter(
      (staff) =>
        staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        staff.role.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [searchQuery, staffData]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleAddStaff = () => {
    // TODO: Implement add staff modal
    console.log("Add staff clicked");
  };

  const handleEdit = (staff: StaffMember) => {
    approveStaffMember.mutate(staff.id);
  };

  const handleDelete = (id: string) => {
    deleteStaffMember.mutate(id);
  };

  return (
    <PageLayout
      title="User Management"
      subtitle="Manage team members, roles, and department assignments."
    >
      <StaffHeader onSearch={handleSearch} onAddStaff={handleAddStaff} />
      {staffQuery.isLoading && (
        <p className="text-sm text-gray-500">Loading staff...</p>
      )}
      {staffQuery.isError && (
        <p className="text-sm text-red-600">Unable to load users.</p>
      )}
      <StaffTable
        data={filteredStaff}
        onEdit={handleEdit}
        onDelete={handleDelete}
        approvingStaffId={
          approveStaffMember.isPending
            ? String(approveStaffMember.variables)
            : undefined
        }
      />
    </PageLayout>
  );
};

export default StaffManagement;
