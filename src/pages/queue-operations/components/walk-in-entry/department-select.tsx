import React from "react";

export interface DepartmentOption {
  id: string;
  prefix: string;
  name: string;
  targetTime: string;
  peopleWaiting: number;
}

interface DepartmentSelectProps {
  departments: DepartmentOption[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export const DepartmentSelect: React.FC<DepartmentSelectProps> = ({
  departments,
  selectedId,
  onSelect,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-4">
        Select Department
      </label>
      <div className="grid grid-cols-3 gap-4">
        {departments.map((dept) => (
          <button
            key={dept.id}
            onClick={() => onSelect(dept.id)}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              selectedId === dept.id
                ? "border-blue-900 bg-blue-900 text-white"
                : "border-gray-300 bg-white text-gray-900 hover:border-gray-500"
            }`}
          >
            <div className="text-2xl font-bold mb-2">{dept.prefix}</div>
            <div className="text-sm font-medium mb-2">{dept.name}</div>
            <div className="text-xs opacity-75">{dept.targetTime} target</div>
            <div className="text-xs opacity-75">
              {dept.peopleWaiting} people waiting
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
