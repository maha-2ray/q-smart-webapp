import React from "react";

type NotificationPreference = "browser" | "sms" | "both";

interface NotificationPreferenceProps {
  selected: NotificationPreference;
  onSelect: (value: NotificationPreference) => void;
}

export const NotificationPreference: React.FC<NotificationPreferenceProps> = ({
  selected,
  onSelect,
}) => {
  const preferences: Array<{
    value: NotificationPreference;
    label: string;
    description: string;
  }> = [
    {
      value: "browser",
      label: "Browser",
      description: "If customer scans queue link",
    },
    {
      value: "sms",
      label: "SMS",
      description: "Send live updates by text",
    },
    {
      value: "both",
      label: "Both",
      description: "SMS and browser updates",
    },
  ];

  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-4">
        Notification Preference
      </label>
      <div className="grid grid-cols-3 gap-4">
        {preferences.map((pref) => (
          <button
            key={pref.value}
            onClick={() => onSelect(pref.value)}
            className={`p-4 rounded-lg border-2 transition-all text-center ${
              selected === pref.value
                ? "border-gray-900 bg-gray-50"
                : "border-gray-300 bg-white hover:border-gray-500"
            }`}
          >
            <div className="flex items-center justify-center mb-2">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selected === pref.value
                    ? "border-blue-900 bg-blue-900"
                    : "border-gray-400"
                }`}
              >
                {selected === pref.value && (
                  <div className="w-2 h-2 rounded-full bg-white" />
                )}
              </div>
            </div>
            <div className="text-sm font-medium text-gray-900">
              {pref.label}
            </div>
            <div className="text-xs text-gray-600 mt-1">{pref.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};
