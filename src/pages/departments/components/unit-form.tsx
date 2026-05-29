import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import type { Department, Unit } from "./department-card";

export interface UnitFormData {
  name: string;
  code: string;
  departmentId: string;
}

interface UnitFormProps {
  departments: Department[];
  onSubmit: (data: UnitFormData) => void;
  units: Unit[];
}

export const UnitForm: React.FC<UnitFormProps> = ({
  departments,
  onSubmit,
  units,
}) => {
  const [formData, setFormData] = useState<UnitFormData>({
    name: "",
    code: "",
    departmentId: "",
  });

  const selectedDepartment = departments.find(
    (department) => department.id === formData.departmentId,
  );
  const existingDepartmentUnits = units.filter(
    (unit) => unit.departmentId === formData.departmentId,
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "code" ? value.toUpperCase() : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.code && formData.departmentId) {
      onSubmit(formData);
      setFormData({ name: "", code: "", departmentId: "" });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-3">New Unit</h3>
      <p className="text-sm text-gray-600 mb-6">
        Create a unit and attach it to the department that owns the work.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Unit Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Business Accounts"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Unit Code
          </label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleChange}
            placeholder="e.g. BA"
            maxLength={4}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Attach to Department
          </label>
          <select
            name="departmentId"
            value={formData.departmentId}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map((department) => (
              <option key={department.id} value={department.id}>
                {department.name}
              </option>
            ))}
          </select>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
          <p className="text-sm font-semibold text-slate-900">
            {selectedDepartment
              ? selectedDepartment.name
              : "Department attachment"}
          </p>
          <p className="text-xs text-slate-600 mt-1">
            {selectedDepartment
              ? `${existingDepartmentUnits.length} unit${
                  existingDepartmentUnits.length === 1 ? "" : "s"
                } already attached.`
              : "Choose where this unit belongs before creating it."}
          </p>
        </div>

        <Button
          title="Create Unit"
          onClick={() => {}}
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
          disabled={!formData.name || !formData.code || !formData.departmentId}
        />
      </form>
    </div>
  );
};
