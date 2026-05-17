import React from "react";

type DepartmentBadgeProps = {
  departments: string[];
};

export const DepartmentBadge: React.FC<DepartmentBadgeProps> = ({
  departments,
}) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {departments.map((dept) => (
        <span
          key={dept}
          className="px-3 py-1 rounded-md text-sm font-medium bg-gray-100 text-gray-700 inline-block"
        >
          {dept}
        </span>
      ))}
    </div>
  );
};
