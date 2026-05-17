import React from "react";
import { Toggle } from "../../../components/ui/toggle";

export interface BusinessHour {
  day: string;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
}

export interface BusinessHoursData {
  hours: BusinessHour[];
  overrideMode: "Manual" | "Auto" | "None Zone";
}

type BusinessHoursProps = {
  data: BusinessHoursData;
  onChange: (data: BusinessHoursData) => void;
};

export const BusinessHours: React.FC<BusinessHoursProps> = ({
  data,
  onChange,
}) => {
  const handleHourChange = (
    index: number,
    field: keyof BusinessHour,
    value: string | boolean,
  ) => {
    const newHours = [...data.hours];
    newHours[index] = {
      ...newHours[index],
      [field]: value,
    };
    onChange({
      ...data,
      hours: newHours,
    });
  };

  const handleOverrideModeChange = (mode: "Manual" | "Auto" | "None Zone") => {
    onChange({
      ...data,
      overrideMode: mode,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Business Hours</h2>
          <p className="text-gray-600 text-sm">
            Configure operating hours. Queue will automatically close outside
            these times.
          </p>
        </div>
        <div className="flex gap-3">
          {(["Manual", "Auto", "None Zone"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => handleOverrideModeChange(mode)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                data.overrideMode === mode
                  ? "bg-blue-900 text-white"
                  : "border border-gray-300 text-gray-900 hover:bg-gray-50"
              }`}
            >
              {mode}
              {mode === "Auto" && " Override"}
            </button>
          ))}
          {/* Time zone option */}
          <button className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-sm text-gray-700 hover:bg-gray-50">
            None Zone
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                DAY
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                STATUS
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                OPENING TIME
              </th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-700">
                CLOSING TIME
              </th>
            </tr>
          </thead>
          <tbody>
            {data.hours.map((hour, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 font-medium text-gray-900">
                  {hour.day}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <Toggle
                      checked={hour.isOpen}
                      onChange={(checked) =>
                        handleHourChange(index, "isOpen", checked)
                      }
                    />
                    <span className="text-sm text-gray-600">
                      {hour.isOpen ? "Open" : "Closed"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  {hour.isOpen ? (
                    <input
                      type="time"
                      value={hour.openingTime}
                      onChange={(e) =>
                        handleHourChange(index, "openingTime", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {hour.isOpen ? (
                    <input
                      type="time"
                      value={hour.closingTime}
                      onChange={(e) =>
                        handleHourChange(index, "closingTime", e.target.value)
                      }
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
