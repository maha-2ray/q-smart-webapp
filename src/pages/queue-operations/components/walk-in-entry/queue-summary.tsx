import React from "react";

export interface QueueSummaryData {
  department: string;
  peopleAhead: number;
  estimatedWait: string;
  notification: string;
  ticketNumber: string;
}

interface QueueSummaryProps {
  data: QueueSummaryData;
}

export const QueueSummary: React.FC<QueueSummaryProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="space-y-6">
        {/* Assigned Ticket */}
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-sm font-semibold text-gray-600 mb-2 uppercase">
            Assigned Ticket
          </h3>
          <div className="text-4xl font-bold text-gray-900 mb-2">
            {data.ticketNumber}
          </div>
          <p className="text-sm text-gray-600">
            Next available in {data.department}
          </p>
        </div>

        {/* Queue Summary */}
        <div className="px-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Queue Summary
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Department</span>
              <span className="text-sm font-medium text-gray-900">
                {data.department}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">People ahead</span>
              <span className="text-sm font-medium text-gray-900">
                {data.peopleAhead}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Estimated wait</span>
              <span className="text-sm font-medium text-gray-900">
                {data.estimatedWait}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-600">Notification</span>
              <span className="text-sm font-medium text-gray-900">
                {data.notification}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
