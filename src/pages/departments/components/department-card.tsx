import React from "react";

export interface Unit {
  id: string;
  name: string;
  code: string;
  departmentId: string;
  status: "active" | "inactive";
}

export interface Department {
  id: string;
  name: string;
  prefix: string;
  status: "active" | "inactive";
  waiting: number;
  target: string;
  served: number;
  avgWait: string;
}

interface DepartmentCardProps {
  department: Department;
  units?: Unit[];
  onToggleActive: (id: string) => void;
  onEdit: (id: string) => void;
  onArchive: (id: string) => void;
  onRestore?: (id: string) => void;
}

export const DepartmentCard: React.FC<DepartmentCardProps> = ({
  department,
  units = [],
  onToggleActive,
  onEdit,
  onArchive,
  onRestore,
}) => {
  const isActive = department.status === "active";

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white text-lg ${
              isActive ? "bg-blue-800" : "bg-gray-400"
            }`}
          >
            {department.prefix}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {department.name}
            </h3>
            <p className="text-sm text-gray-600">
              {department.waiting} waiting
            </p>
          </div>
        </div>
        <span
          className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
            isActive
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {isActive ? "Active" : "Inactive"}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
            Target
          </p>
          <p className="text-lg font-bold text-gray-900">{department.target}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
            Served
          </p>
          <p className="text-lg font-bold text-gray-900">{department.served}</p>
        </div>
        <div>
          <p className="text-xs text-gray-600 uppercase font-semibold mb-1">
            Avg Wait
          </p>
          <p className="text-lg font-bold text-gray-900">
            {department.avgWait}
          </p>
        </div>
      </div>

      <div className="mb-6 pb-6 border-b border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs text-gray-600 uppercase font-semibold">Units</p>
          <span className="text-xs font-semibold text-gray-500">
            {units.length}
          </span>
        </div>

        {units.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {units.map((unit) => (
              <span
                key={unit.id}
                className="inline-flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
              >
                <span className="font-bold text-blue-800">{unit.code}</span>
                {unit.name}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No units attached yet.</p>
        )}
      </div>

      {/* Toggle & Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => onToggleActive(department.id)}
            className={`relative inline-flex h-6 w-11 rounded-full transition-colors ${
              isActive ? "bg-blue-600" : "bg-gray-300"
            }`}
          >
            <span
              className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
                isActive ? "translate-x-6" : "translate-x-1"
              } my-auto`}
            />
          </button>
          <span className="text-sm text-gray-600">Department active</span>
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => onEdit(department.id)}
            className="text-blue-600 hover:text-blue-800 font-medium text-sm"
          >
            Edit
          </button>
          <button
            onClick={() =>
              isActive ? onArchive(department.id) : onRestore?.(department.id)
            }
            className="text-gray-600 hover:text-gray-800 font-medium text-sm"
          >
            {isActive ? "Archive" : "Restore"}
          </button>
        </div>
      </div>
    </div>
  );
};
