import React from "react";
import { FiUser } from "react-icons/fi";
import { LuBuilding2 } from "react-icons/lu";

export interface LocationData {
  id: string;
  name: string;
  openUntil: string;
}

interface LocationSelectProps {
  locations: LocationData[];
  onSelect: (locationId: string) => void;
}

export const LocationSelect: React.FC<LocationSelectProps> = ({
  locations,
  onSelect,
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-b from-gray-100 to-gray-50 px-4">
      <div className="w-full max-w-md text-center mb-12">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-sm">
            <LuBuilding2 className="w-12 h-12 text-blue-900" />
          </div>
        </div>

        {/* Location Details */}
        {locations.length > 0 && (
          <>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              {locations[0].name}
            </h1>
            <p className="text-lg text-gray-600">
              Open until {locations[0].openUntil}
            </p>
          </>
        )}
      </div>

      {/* Service Selection */}
      <div className="w-full max-w-2xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">
          Select Service
        </h2>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <button
            onClick={() => onSelect(locations[0]?.id || "1")}
            className="bg-white border-2 border-blue-200 rounded-2xl p-8 text-center hover:border-gray-400 transition-colors"
          >
            <div className="text-4xl mb-4">💼</div>
            <div className="text-xl font-semibold text-blue-900">Accounts</div>
          </button>

          <button
            onClick={() => onSelect(locations[0]?.id || "1")}
            className="bg-white border-2 border-blue-200 rounded-2xl p-8 text-center hover:border-gray-400 transition-colors"
          >
            <div className="text-4xl mb-4">👥</div>
            <div className="text-xl font-semibold text-blue-900">Tellers</div>
          </button>
        </div>

        {/* Department Detail Card */}
        <div className="bg-white rounded-3xl border-2 border-blue-300 p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-bold text-blue-900">
              Loan Applications
            </h3>
            <button className="text-blue-900 hover:text-blue-600 text-xl">
              ✕
            </button>
          </div>

          <p className="text-gray-600 mb-6">
            Current wait: <span className="font-semibold">~5 mins</span>
          </p>

          {/* Customer Info */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="text-2xl">
                <FiUser />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Name</p>
                <p className="text-blue-900 font-semibold">Jane Doe</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="text-2xl">📱</div>
              <div>
                <p className="text-gray-600 text-sm">Mobile Number</p>
                <p className="text-blue-900 font-semibold">+1 (555) 987-6543</p>
              </div>
            </div>
          </div>

          {/* Confirm & Join Button */}
          <button
            onClick={() => onSelect(locations[0]?.id || "1")}
            className="w-full bg-blue-900 text-white font-semibold py-4 rounded-full hover:bg-gray-800 transition-colors text-lg"
          >
            Confirm & Join
          </button>
        </div>
      </div>
    </div>
  );
};
