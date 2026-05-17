import React, { useState } from "react";
import { Button } from "../../../components/ui/button";

export interface DepartmentFormData {
  name: string;
  prefix: string;
  targetTime: string;
  description: string;
}

interface DepartmentFormProps {
  onSubmit: (data: DepartmentFormData) => void;
}

export const DepartmentForm: React.FC<DepartmentFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    prefix: "",
    targetTime: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.prefix && formData.targetTime) {
      onSubmit(formData);
      setFormData({ name: "", prefix: "", targetTime: "", description: "" });
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 lg:sticky lg:top-20">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">
        New Department
      </h3>
      <p className="text-sm text-gray-600 mb-6">
        Create a new service line with a unique prefix and baseline service
        target.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Department Name */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. New Accounts"
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Ticket Prefix & Target Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Ticket Prefix
            </label>
            <select
              name="prefix"
              value={formData.prefix}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Prefix</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="F">F</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Target Time
            </label>
            <input
              type="text"
              name="targetTime"
              value={formData.targetTime}
              onChange={handleChange}
              placeholder="12 min"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Help customers understand which requests belong to this department."
            rows={3}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Prefix Validation Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex gap-3">
            <div className="text-blue-600 text-lg">ⓘ</div>
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Prefix validation
              </p>
              <p className="text-xs text-blue-700 mt-1">
                Prefixes must be unique within this business. Existing prefixes
                in use: A, B, C, D.
              </p>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          title="Create Department"
          onClick={() => {}}
          type="submit"
          variant="primary"
          size="md"
          className="w-full"
        />
      </form>
    </div>
  );
};
