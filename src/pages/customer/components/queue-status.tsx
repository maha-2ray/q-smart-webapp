import React from "react";
import { LuInfo } from "react-icons/lu";

interface QueueStatusProps {
  ticketNumber: string;
  position: string;
  estimatedWait: string;
  status: string;
  preparationNotes: string;
  onLeaveQueue: () => void;
}

export const QueueStatus: React.FC<QueueStatusProps> = ({
  ticketNumber,
  position,
  estimatedWait,
  status,
  preparationNotes,
  onLeaveQueue,
}) => {
  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-2xl font-bold text-gray-900">Q-SMART</h1>
          <button
            onClick={onLeaveQueue}
            className="text-gray-600 hover:text-gray-900 font-semibold underline text-sm"
          >
            Leave Queue
          </button>
        </div>

        {/* Ticket Number */}
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-gray-600 uppercase tracking-wider mb-4">
            Your Ticket
          </p>
          <h2 className="text-8xl font-bold text-gray-900 font-mono">
            {ticketNumber}
          </h2>
        </div>

        {/* Queue Info Card */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 mb-6">
          <div className="grid grid-cols-2 gap-6 mb-6 pb-6 border-b border-gray-300">
            <div>
              <p className="text-sm text-gray-600 font-semibold mb-1">
                Position
              </p>
              <p className="text-2xl font-bold text-gray-900">{position}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600 font-semibold mb-1">
                Est. Wait
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {estimatedWait}
              </p>
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <p className="text-gray-700 font-medium">{status}</p>
          </div>
        </div>

        {/* Preparation Notes */}
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 flex gap-4">
          <div className="flex-shrink-0">
            <LuInfo className="w-6 h-6 text-gray-600 mt-1" />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 mb-2">Preparation Notes</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {preparationNotes}
            </p>
          </div>
        </div>

        {/* Leave Queue Button */}
        <button
          onClick={onLeaveQueue}
          className="w-full bg-white border border-gray-300 text-gray-900 font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors mt-8"
        >
          Leave Queue
        </button>
      </div>
    </div>
  );
};
