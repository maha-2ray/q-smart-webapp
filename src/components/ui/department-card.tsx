import React from "react";
import { LuClock, LuUsers, LuTag, LuCircle } from "react-icons/lu";

export interface DepartmentCardProps {
  id: string;
  name: string;
  ticketPrefix: string;
  status: "open" | "closed";
  peopleWaiting: number;
  avgWaitingTime: number; // in minutes
  onClick?: () => void;
}

const DepartmentCard: React.FC<DepartmentCardProps> = ({
  id,
  name,
  ticketPrefix,
  status,
  peopleWaiting,
  avgWaitingTime,
  onClick,
}) => {
  const isOpen = status === "open";
  const statusColor = isOpen
    ? "bg-green-100 text-green-800"
    : "bg-red-100 text-red-800";

  const statusLabel = isOpen ? "Open" : "Closed";
  const statusIndicator = isOpen ? "text-green-500" : "text-red-500";

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg border border-slate-200 p-6 hover:shadow-lg hover:border-slate-300 transition-all duration-200 cursor-pointer group"
    >
      {/* Header: Department Name & Status */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-600 mt-1">
            Ticket Prefix:{" "}
            <span className="font-mono font-semibold text-slate-900">
              {ticketPrefix}
            </span>
          </p>
        </div>

        {/* Status Badge */}
        <div className="flex items-center gap-2 ml-4">
          <LuCircle className={`w-3 h-3 ${statusIndicator}`} />
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
          >
            {statusLabel}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200 my-4"></div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* People Waiting */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LuUsers className="w-4 h-4 text-blue-500" />
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Waiting
            </p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{peopleWaiting}</p>
          <p className="text-xs text-slate-500">
            {peopleWaiting === 1 ? "person" : "people"}
          </p>
        </div>

        {/* Average Wait Time */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <LuClock className="w-4 h-4 text-orange-500" />
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
              Avg. Wait
            </p>
          </div>
          <p className="text-2xl font-bold text-slate-900">{avgWaitingTime}</p>
          <p className="text-xs text-slate-500">min</p>
        </div>
      </div>

      {/* Footer: Ticket Info */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-slate-600">
            <LuTag className="w-4 h-4" />
            <p className="text-xs">ID: {id}</p>
          </div>
          <div
            className={`text-xs font-semibold px-2 py-1 rounded ${
              isOpen ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"
            }`}
          >
            {isOpen ? "Active" : "Inactive"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentCard;
