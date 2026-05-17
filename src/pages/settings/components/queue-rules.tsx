import React from "react";

export interface QueueRulesData {
  noShowTimeout: number;
  notificationPreference: "Browser" | "SMS" | "Both";
}

type QueueRulesProps = {
  data: QueueRulesData;
  onChange: (data: QueueRulesData) => void;
};

export const QueueRules: React.FC<QueueRulesProps> = ({ data, onChange }) => {
  const handleTimeoutChange = (value: string) => {
    onChange({
      ...data,
      noShowTimeout: parseInt(value, 10),
    });
  };

  const handlePreferenceChange = (pref: "Browser" | "SMS" | "Both") => {
    onChange({
      ...data,
      notificationPreference: pref,
    });
  };

  return (
    <div className="bg-white rounded-lg p-6 mb-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-2">Queue Rules</h2>
      <p className="text-gray-600 text-sm mb-6">
        Configure global logic for ticketing and timeouts.
      </p>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-gray-900">No-Show Timeout</h3>
              <p className="text-sm text-gray-600">
                Time until an unrespond customer is automatically skipped
              </p>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={data.noShowTimeout}
                onChange={(e) => handleTimeoutChange(e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-600">Seconds</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium text-gray-900 mb-4">
            Default Notification Preference
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            The selected option for customers calling the queue.
          </p>
          <div className="flex gap-3 flex-wrap">
            {(["Browser", "SMS", "Both"] as const).map((option) => (
              <button
                key={option}
                onClick={() => handlePreferenceChange(option)}
                className={`px-6 py-2 rounded-lg font-medium text-sm transition-colors ${
                  data.notificationPreference === option
                    ? "bg-blue-900 text-white"
                    : "border border-gray-300 text-gray-900 hover:bg-gray-50"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
