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

const mockDepartments: Department[] = [
  {
    id: "1",
    name: "Account Services",
    prefix: "A",
    status: "active",
    waiting: 3,
    target: "15 min",
    served: 42,
    avgWait: "15 min",
  },
  {
    id: "2",
    name: "Loan Applications",
    prefix: "B",
    status: "active",
    waiting: 12,
    target: "22 min",
    served: 27,
    avgWait: "21 min",
  },
  {
    id: "3",
    name: "Teller Services",
    prefix: "C",
    status: "active",
    waiting: 5,
    target: "8 min",
    served: 64,
    avgWait: "9 min",
  },
  {
    id: "4",
    name: "Document Verification",
    prefix: "D",
    status: "inactive",
    waiting: 0,
    target: "12 min",
    served: 0,
    avgWait: "-",
  },
];

const mockUnits: Unit[] = [
  {
    id: "1",
    name: "Personal Accounts",
    code: "PA",
    departmentId: "1",
    status: "active",
  },
  {
    id: "2",
    name: "Business Accounts",
    code: "BA",
    departmentId: "1",
    status: "active",
  },
  {
    id: "3",
    name: "Mortgage Desk",
    code: "MD",
    departmentId: "2",
    status: "active",
  },
  {
    id: "4",
    name: "Cash Counter",
    code: "CC",
    departmentId: "3",
    status: "active",
  },
];

const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [units, setUnits] = useState<Unit[]>(mockUnits);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const activeDepartments = departments.filter((d) => d.status === "active");
  const totalTicketsServed = departments.reduce((sum, d) => sum + d.served, 0);
  const usedPrefixes = departments.map((d) => d.prefix);

  const metrics = [
    { title: "Active Departments", value: activeDepartments.length },
    { title: "Tickets Served Today", value: totalTicketsServed },
    { title: "Average Service Time", value: "15 min" },
  ];

  const handleCreateDepartment = (data: DepartmentFormData) => {
    const newDept: Department = {
      id: String(departments.length + 1),
      name: data.name,
      prefix: data.prefix,
      status: "active",
      waiting: 0,
      target: data.targetTime,
      served: 0,
      avgWait: "-",
    };
    setDepartments([...departments, newDept]);
    console.log("Department created:", data);
  };

  const handleCreateUnit = (data: UnitFormData) => {
    const newUnit: Unit = {
      id: String(units.length + 1),
      name: data.name,
      code: data.code,
      departmentId: data.departmentId,
      status: "active",
    };
    setUnits([...units, newUnit]);
    console.log("Unit created:", data);
  };

  const handleToggleActive = (id: string) => {
    setDepartments(
      departments.map((dept) =>
        dept.id === id
          ? {
              ...dept,
              status: dept.status === "active" ? "inactive" : "active",
            }
          : dept,
      ),
    );
  };

  const handleEdit = (id: string) => {
    console.log("Edit department:", id);
  };

  const handleArchive = (id: string) => {
    console.log("Archive department:", id);
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
