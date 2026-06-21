import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../../../components/ui/button";
import type { StaffRequest } from "../../../services/staff";
import type { AuthRole } from "../../../services/auth";

export type AddStaffFormData = StaffRequest & {
  confirmPassword: string;
};

type AddStaffModalProps = {
  isOpen: boolean;
  isSubmitting?: boolean;
  errorMessage?: string;
  onClose: () => void;
  onSubmit: (data: StaffRequest) => void;
};

const initialFormData: AddStaffFormData = {
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  phoneNumber: "",
  password: "",
  confirmPassword: "",
  role: "STAFF",
  approved: true,
};

const roleOptions: Array<{ label: string; value: AuthRole }> = [
  { label: "Staff", value: "STAFF" },
  { label: "Admin", value: "ADMIN" },
  { label: "User", value: "USER" },
];

export const AddStaffModal: React.FC<AddStaffModalProps> = ({
  isOpen,
  isSubmitting = false,
  errorMessage,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<AddStaffFormData>(initialFormData);
  const [validationError, setValidationError] = useState("");

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value, type } = e.target;
    const nextValue =
      type === "checkbox" ? (e.target as HTMLInputElement).checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
  };

  const handleClose = () => {
    if (isSubmitting) return;

    setFormData(initialFormData);
    setValidationError("");
    onClose();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    const firstName = formData.firstName.trim();
    const lastName = formData.lastName.trim();
    const email = formData.email.trim();
    const username = formData.username?.trim();
    const phoneNumber = formData.phoneNumber?.trim();
    const password = formData.password?.trim();

    if (!firstName || !lastName || !email || !password) {
      setValidationError(
        "First name, last name, email, and password are required.",
      );
      return;
    }

    if (password.length < 8) {
      setValidationError("Password must be at least 8 characters.");
      return;
    }

    if (password !== formData.confirmPassword) {
      setValidationError("Passwords do not match.");
      return;
    }

    onSubmit({
      firstName,
      lastName,
      email,
      username: username || undefined,
      phoneNumber: phoneNumber || undefined,
      password,
      role: formData.role,
      approved: formData.approved,
    });
  };

  const isSubmitDisabled =
    isSubmitting ||
    !formData.firstName ||
    !formData.lastName ||
    !formData.email ||
    !formData.password ||
    !formData.confirmPassword;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-200 sticky top-0 bg-white">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Add Staff</h2>
            <p className="text-sm text-gray-600 mt-1">
              Create a team member profile and set their access role.
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close add staff form"
            className="p-2 text-gray-500 hover:text-gray-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <AiOutlineClose size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {(validationError || errorMessage) && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {validationError || errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Optional"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Role *
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {roleOptions.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Password *
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                minLength={8}
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Use at least 8 characters.
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm Password *
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                minLength={8}
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-700">
            <input
              type="checkbox"
              name="approved"
              checked={formData.approved}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-blue-900 focus:ring-blue-500"
            />
            Staff member is active immediately
          </label>

          <div className="flex gap-3 justify-end pt-4 border-t border-gray-200">
            <Button
              title="Cancel"
              onClick={handleClose}
              variant="outline"
              size="md"
              type="button"
              disabled={isSubmitting}
            />
            <Button
              title={isSubmitting ? "Creating..." : "Create Staff"}
              type="submit"
              variant="primary"
              size="md"
              loading={isSubmitting}
              disabled={isSubmitDisabled}
            />
          </div>
        </form>
      </div>
    </div>
  );
};
