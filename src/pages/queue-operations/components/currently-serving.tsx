import React from "react";
import { LuCheck, LuX, LuRotateCcw, LuUser, LuPhone } from "react-icons/lu";
import { Button } from "../../../components/ui/button";

type CurrentlyServingProps = {
  ticketNumber: string;
  ticketHolder: string;
  holderPhoneNumber: string;
  onServed?: () => void;
  onNoShow?: () => void;
  onRecall?: () => void;
};

const CurrentlyServing: React.FC<CurrentlyServingProps> = ({
  ticketNumber,
  ticketHolder,
  holderPhoneNumber,
  onServed,
  onNoShow,
  onRecall,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow">
      {/* Header */}
      <div className="text-center mb-6 pb-6 border-b border-slate-200">
        <p className="text-sm font-semibold text-slate-600 uppercase tracking-wider mb-2">
          Currently Serving
        </p>
        <div className="inline-block bg-linear-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl">
          <p className="text-4xl font-bold">{ticketNumber}</p>
        </div>
      </div>

      {/* Ticket Holder Info */}
      <div className="space-y-4 mb-6">
        {/* Name */}
        <div className="flex items-start gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <LuUser className="w-5 h-5 text-blue-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
              Ticket Holder
            </p>
            <p className="text-lg font-semibold text-slate-900">
              {ticketHolder}
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <LuPhone className="w-5 h-5 text-green-600" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
              Phone Number
            </p>
            <p className="text-lg font-semibold text-slate-900 font-mono">
              {holderPhoneNumber}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-6 w-full">
        <Button
          onClick={onServed}
          iconLeft={<LuCheck className="w-5 h-5" />}
          title="Served"
          size="lg"
          className="w-full"
        />
        <div className="flex items-center gap-3">
          <Button
            onClick={onNoShow}
            iconLeft={<LuX className="w-5 h-5" />}
            title="No Show"
            variant="outline"
            size="md"
            className="w-full"
          />
          <Button
            onClick={onRecall}
            variant="outline"
            iconLeft={<LuRotateCcw className="w-5 h-5" />}
            title="Re-Call"
            size="md"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentlyServing;
