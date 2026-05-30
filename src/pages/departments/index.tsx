import React, { useState } from "react";
import { PageLayout } from "../../components/layouts/page-layout";
import { Button } from "../../components/ui/button";
import {
  DepartmentMetrics,
  DepartmentCard,
  RuleChecks,
  AddDepartmentModal,
  UnitForm,
} from "./components";
import type { DepartmentFormData } from "./components/department-form";
import type { UnitFormData } from "./components/unit-form";
import type { Department, Unit } from "./components/department-card";
import { FiPlus } from "react-icons/fi";
import {
  useCreateDepartment,
  useCreateUnit,
  useDeleteDepartment,
  useDepartments,
  useUnits,
  useUpdateDepartment,
} from "../../hooks/use-departments";
import type {
  Department as ApiDepartment,
  Unit as ApiUnit,
} from "../../services/departments";

const makePrefix = (name: string, index: number) =>
  name.trim().slice(0, 1).toUpperCase() || `${index + 1}`;

const mapDepartment = (
  department: ApiDepartment,
  index: number,
): Department => ({
  id: department.id,
  name: department.name,
  prefix: makePrefix(department.name, index),
  status: department.isActive === false ? "inactive" : "active",
  waiting: 0,
  target: "-",
  served: 0,
  avgWait: "-",
});

const mapUnit = (unit: ApiUnit): Unit => ({
  id: unit.id,
  name: unit.name,
  code: unit.name.slice(0, 2).toUpperCase(),
  departmentId: unit.departmentId,
  status: "active",
});

const Departments: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const departmentsQuery = useDepartments();
  const unitsQuery = useUnits();
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartment = useDeleteDepartment();
  const createUnit = useCreateUnit();

  const departments = (departmentsQuery.data || []).map(mapDepartment);
  const units = (unitsQuery.data || []).map(mapUnit);

  const activeDepartments = departments.filter((d) => d.status === "active");
  const totalTicketsServed = departments.reduce((sum, d) => sum + d.served, 0);
  const usedPrefixes = departments.map((d) => d.prefix);

  const metrics = [
    { title: "Active Departments", value: activeDepartments.length },
    { title: "Tickets Served Today", value: totalTicketsServed },
    { title: "Average Service Time", value: "15 min" },
  ];

  const handleCreateDepartment = (data: DepartmentFormData) => {
    createDepartment.mutate({
      name: data.name,
      description: data.description || undefined,
    });
  };

  const handleCreateUnit = (data: UnitFormData) => {
    createUnit.mutate({
      name: data.name,
      description: data.code ? `Code: ${data.code}` : undefined,
      departmentId: data.departmentId,
    });
  };

  const handleToggleActive = (id: string) => {
    const department = departments.find((dept) => dept.id === id);

    if (!department) return;

    updateDepartment.mutate({
      id,
      payload: {
        isActive: department.status !== "active",
      },
    });
  };

  const handleEdit = (id: string) => {
    console.log("Edit department:", id);
  };

  const handleArchive = (id: string) => {
    deleteDepartment.mutate(id);
  };

  const handleRestore = (id: string) => {
    console.log("Restore department:", id);
  };

  const handleRunValidation = () => {
    console.log("Running validation checks...");
  };

  const handleAddDepartment = () => {
    setIsAddModalOpen(true);
  };

  const handleSubmitModal = (data: DepartmentFormData) => {
    handleCreateDepartment(data);
    setIsAddModalOpen(false);
  };

  return (
    <>
      <PageLayout
        title="Department Management"
        subtitle="Configure service departments, ticket prefixes, target times, and live queue rules."
        actions={
          <Button
            title="Add Department"
            onClick={handleAddDepartment}
            variant="primary"
            size="md"
            iconLeft={<FiPlus />}
          />
        }
      >
        {/* Metrics */}
        <DepartmentMetrics metrics={metrics} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Form Section */}
          <div className="lg:col-span-1 space-y-6">
            <UnitForm
              departments={departments}
              onSubmit={handleCreateUnit}
              units={units}
            />
          </div>

          {/* Department Cards */}
          <div className="lg:col-span-3">
            {departmentsQuery.isLoading && (
              <p className="text-sm text-gray-500">Loading departments...</p>
            )}
            {departmentsQuery.isError && (
              <p className="text-sm text-red-600">
                Unable to load departments.
              </p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {departments.map((dept) => (
                <DepartmentCard
                  key={dept.id}
                  department={dept}
                  units={units.filter((unit) => unit.departmentId === dept.id)}
                  onToggleActive={handleToggleActive}
                  onEdit={handleEdit}
                  onArchive={handleArchive}
                  onRestore={handleRestore}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Rule Checks */}
        <RuleChecks onRunValidation={handleRunValidation} />
      </PageLayout>

      {/* Add Department Modal */}
      <AddDepartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleSubmitModal}
        usedPrefixes={usedPrefixes}
      />
    </>
  );
};

export default Departments;
