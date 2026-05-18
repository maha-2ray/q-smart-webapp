import React, { useState } from "react";
import { FiBell } from "react-icons/fi";
import { MdOutlineMessage } from "react-icons/md";

import { LuClock } from "react-icons/lu";

export interface Service {
  id: string;
  name: string;
  waitTime: string;
  icon?: string;
}

interface ServiceSelectProps {
  services: Service[];
  onSelectService: (serviceData: {
    serviceId: string;
    name: string;
    mobileNumber: string;
    notification: "sms" | "browser";
  }) => void;
}

export const ServiceSelect: React.FC<ServiceSelectProps> = ({
  services,
  onSelectService,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    services[1]?.id || null,
  );
  const [fullName, setFullName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [notification, setNotification] = useState<"sms" | "browser">(
    "browser",
  );

  const selectedService = services.find((s) => s.id === selectedServiceId);

  const handleSubmit = () => {
    if (selectedServiceId && fullName && mobileNumber) {
      onSelectService({
        serviceId: selectedServiceId,
        name: fullName,
        mobileNumber,
        notification,
      });
    }
  };

  return (
    <div className="min-h-screen bg-white px-4 py-8 overflow-x-auto">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Join the Queue
          </h1>
          <p className="text-gray-600">
            Select a service department to secure your place in line.
          </p>
        </div>

        {/* Status */}
        <div className="text-right mb-4">
          <span className="inline-block w-3 h-3 bg-green-500 rounded-full mr-2"></span>
          <span className="text-sm text-gray-600">Open</span>
        </div>

        {/* Service List */}
        <div className="space-y-4 mb-8">
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedServiceId(service.id)}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                selectedServiceId === service.id
                  ? "border-blue-900 bg-blue-100"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <LuClock className="w-4 h-4" />
                    <span>{service.waitTime} wait</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-400">
                    {service.id}
                  </div>
                  {selectedServiceId === service.id && (
                    <div className="text-green-600">✓</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Expanded Form for Selected Service */}
        {selectedService && (
          <div className="bg-white border-2 border-blue-900 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {selectedService.name}
            </h3>

            <div className="space-y-6 mb-8">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  FULL NAME
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jane Doe"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-2">
                  MOBILE NUMBER
                </label>
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>

              {/* Notifications */}
              <div>
                <label className="block text-sm font-semibold text-gray-600 mb-4">
                  NOTIFICATIONS
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => setNotification("sms")}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 text-center transition-all ${
                      notification === "sms"
                        ? "border-gray-300 bg-blue-900 text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      <MdOutlineMessage />
                    </div>
                    <div className="font-semibold">SMS</div>
                  </button>

                  <button
                    onClick={() => setNotification("browser")}
                    className={`flex flex-col items-center p-4 rounded-xl border-2 text-center transition-all ${
                      notification === "browser"
                        ? "border-blue-900 bg-blue-900 text-white"
                        : "border-gray-200 hover:border-gray-400"
                    }`}
                  >
                    <div className="text-2xl mb-2">
                      <FiBell />
                    </div>
                    <div className="font-semibold">Browser</div>
                  </button>
                </div>
              </div>
            </div>

            {/* Join Button */}
            <button
              onClick={handleSubmit}
              disabled={!fullName || !mobileNumber}
              className="w-full bg-blue-900 text-white font-semibold py-4 rounded-full hover:bg-blue-800 disabled:opacity-50 transition-colors text-lg"
            >
              Join Queue
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
