import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import type { DepartmentFormData } from "./department-form";

interface AddDepartmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: DepartmentFormData) => void;
  usedPrefixes: string[];
}

export const AddDepartmentModal: React.FC<AddDepartmentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  usedPrefixes,
}) => {
  const [formData, setFormData] = useState<DepartmentFormData>({
    name: "",
    prefix: "",
    targetTime: "",
    description: "",
  });

  const availablePrefixes = ["A", "B", "C", "D", "E", "F", "G", "H"].filter(
    (p) => !usedPrefixes.includes(p),
  );

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
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Create New Department
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              Set up a new service department with unique prefix and service
              targets.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-light"
          >
            ✕
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Department Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Department Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., New Accounts, Premium Services"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-xs text-gray-600 mt-1">
              Enter a descriptive name for this department
            </p>
          </div>

          {/* Ticket Prefix & Target Time Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Ticket Prefix *
              </label>
              <select
                name="prefix"
                value={formData.prefix}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select a prefix</option>
                {availablePrefixes.map((prefix) => (
                  <option key={prefix} value={prefix}>
                    {prefix}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-600 mt-1">
                {availablePrefixes.length === 0
                  ? "All prefixes are in use"
                  : `Available: ${availablePrefixes.join(", ")}`}
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Target Service Time *
              </label>
              <input
                type="text"
                name="targetTime"
                value={formData.targetTime}
                onChange={handleChange}
                placeholder="e.g., 15 min, 20 minutes"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Target completion time for tickets
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Help customers understand what this department handles..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-xs text-gray-600 mt-1">
              This description helps customers select the right queue
            </p>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="text-blue-600 shrink-0">ⓘ</div>
              <div>
                <p className="text-sm font-semibold text-blue-900">
                  Department Configuration
                </p>
                <ul className="text-xs text-blue-700 mt-2 space-y-1">
                  <li>• Prefixes must be unique across your organization</li>
                  <li>• Target times help staff meet service level goals</li>
                  <li>• New departments start with active status</li>
                  <li>• You can edit details after creation</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button
              title="Cancel"
              onClick={onClose}
              variant="outline"
              size="md"
              type="button"
            />
            <Button
              title="Create Department"
              onClick={() => {}}
              type="submit"
              variant="primary"
              size="md"
              disabled={
                !formData.name || !formData.prefix || !formData.targetTime
              }
            />
          </div>
        </form>
      </div>
    </div>
  );
};
