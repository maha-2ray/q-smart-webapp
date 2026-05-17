import React from "react";

interface WalkInEntryInfoProps {
  waitingNow: number;
  averageWait: string;
}

export const WalkInEntryInfo: React.FC<WalkInEntryInfoProps> = ({
  waitingNow,
  averageWait,
}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 space-y-6">
      <div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Walk-in Entry
        </h3>
        <p className="text-sm text-gray-600">
          Create a new ticket for an in-person customer and optionally send them
          a live queue link by SMS.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{waitingNow}</div>
          <p className="text-xs text-gray-600 uppercase font-semibold mt-1">
            waiting now
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{averageWait}</div>
          <p className="text-xs text-gray-600 uppercase font-semibold mt-1">
            average wait
          </p>
        </div>
      </div>

      {/* Info Sections */}
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-2">
            Current default
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Walk-ins are added to the same live department queue and follow the
            tenant no-show timer automatically.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-2">
            Issue next sequential ticket instantly
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Link the customer to SMS notifications if a phone is provided
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-2">
            Keep queue timing and analytics consistent
          </h4>
          <p className="text-xs text-gray-600 leading-relaxed">
            Walk-in entries are counted in queue metrics and reports
          </p>
        </div>
      </div>
    </div>
  );
};
