import React from "react";

type StatusBadgeProps = {
  status: "Active" | "Inactive";
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isActive = status === "Active";

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${
        isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};
