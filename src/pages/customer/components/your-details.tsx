import React, { useState } from "react";
import { FiBell, FiMessageSquare } from "react-icons/fi";
import { LuArrowLeft } from "react-icons/lu";

interface YourDetailsProps {
  serviceType: string;
  initialName: string;
  initialPhone: string;
  initialNotification: "sms" | "browser";
  onBack: () => void;
  onContinue: (data: {
    name: string;
    phone: string;
    notification: "sms" | "browser";
  }) => void;
}

export const YourDetails: React.FC<YourDetailsProps> = ({
  serviceType,
  initialName,
  initialPhone,
  initialNotification,
  onBack,
  onContinue,
}) => {
  const [fullName, setFullName] = useState(initialName);
  const [mobileNumber, setMobileNumber] = useState(initialPhone);
  const [notification, setNotification] = useState<"sms" | "browser">(
    initialNotification,
  );

  const handleContinue = () => {
    if (fullName && mobileNumber) {
      onContinue({
        name: fullName,
        phone: mobileNumber,
        notification,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8">
      <div className="max-w-md mx-auto">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-12">
          <button
            onClick={onBack}
            className="w-12 h-12 flex items-center justify-center rounded-full border-2 border-gray-300 hover:border-gray-500 transition-colors"
          >
            <LuArrowLeft className="w-6 h-6 text-gray-900" />
          </button>
          <div className="flex-1 text-center">
            <div className="w-3 h-3 bg-gray-300 rounded-full inline-block"></div>
            <div className="w-3 h-3 bg-gray-900 rounded-full inline-block mx-2"></div>
          </div>
        </div>

        {/* Title */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Your Details
          </h1>
          <p className="text-gray-600">
            You selected {serviceType}. How should we reach you?
          </p>
        </div>

        {/* Form */}
        <div className="space-y-8">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Full Name
            </label>
            <div className="flex items-center">
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="flex-1 bg-transparent border-b-2 border-gray-900 pb-2 text-gray-900 focus:outline-none"
              />
              {fullName && (
                <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center ml-2">
                  ✓
                </div>
              )}
            </div>
          </div>

          {/* Mobile Number */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Mobile Number
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              className="w-full bg-transparent border-b-2 border-gray-900 pb-2 text-gray-900 focus:outline-none placeholder:text-gray-400"
              placeholder="+1 (555) 123-4567"
            />
          </div>

          {/* Notifications */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              Notify me via
            </h3>

            <div className="space-y-3">
              {/* SMS Option */}
              <button
                onClick={() => setNotification("sms")}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all ${
                  notification === "sms"
                    ? "border-blue-900 bg-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="text-2xl">
                  <FiMessageSquare />
                </div>
                <span className="text-gray-900 font-medium">
                  Text Message (SMS)
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 ml-auto ${
                    notification === "sms"
                      ? "border-blue-900 bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {notification === "sms" && (
                    <div className="w-full h-full rounded-full bg-blue-900"></div>
                  )}
                </div>
              </button>

              {/* Browser Notification Option */}
              <button
                onClick={() => setNotification("browser")}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${
                  notification === "browser"
                    ? "border-blue-900 bg-white"
                    : "border-gray-200 hover:border-gray-400"
                }`}
              >
                <div className="text-2xl">
                  <FiBell />
                </div>
                <span className="text-gray-900 font-medium">
                  Browser Notification
                </span>
                <div
                  className={`w-6 h-6 rounded-full border-2 ml-auto ${
                    notification === "browser"
                      ? "border-white bg-white"
                      : "border-gray-300 bg-white"
                  }`}
                >
                  {notification === "browser" && (
                    <div className="w-full h-full rounded-full bg-blue-900"></div>
                  )}
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <button
          onClick={handleContinue}
          disabled={!fullName || !mobileNumber}
          className="w-full bg-blue-900 text-white font-semibold py-4 rounded-full hover:bg-gray-800 disabled:opacity-50 transition-colors mt-12 text-lg"
        >
          Continue →
        </button>
      </div>
    </div>
  );
};
