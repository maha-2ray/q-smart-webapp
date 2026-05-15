import { Button } from "../../../components/ui/button";
import React from "react";
import { LuUsers, LuClock, LuPhone } from "react-icons/lu";

type QueueControlProps = {
  departmentName: string;
  numberWaiting: number;
  avgWaitTime: number;
  onCallNext?: () => void;
};

const QueueControl: React.FC<QueueControlProps> = ({
  departmentName,
  numberWaiting,
  avgWaitTime,
  onCallNext,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-slate-900">Queue Control</h2>
        <span className="inline-block bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg text-sm font-semibold">
          DEPT: {departmentName}
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* People Waiting */}
        <div className="bg-linear-to-br from-blue-50 to-blue-100/50 rounded-lg p-4 border border-blue-200">
          <div className="flex items-center gap-2 mb-2">
            <LuUsers className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Waiting
            </p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{numberWaiting}</p>
          <p className="text-xs text-slate-600 mt-1">
            {numberWaiting === 1 ? "person" : "people"} in queue
          </p>
        </div>

        {/* Avg Wait Time */}
        <div className="bg-linear-to-br from-orange-50 to-orange-100/50 rounded-lg p-4 border border-orange-200">
          <div className="flex items-center gap-2 mb-2">
            <LuClock className="w-4 h-4 text-orange-600" />
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              Avg Wait
            </p>
          </div>
          <p className="text-3xl font-bold text-slate-900">{avgWaitTime}</p>
          <p className="text-xs text-slate-600 mt-1">minutes</p>
        </div>
      </div>

      {/* Call Next Button */}
      <Button
        size="round"
        onClick={onCallNext}
        className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95"
        iconLeft={<LuPhone className="w-5 h-5" />}
        title="Call Next Person"
      />
    </div>
  );
};

export default QueueControl;
