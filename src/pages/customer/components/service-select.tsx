import React, { useState } from "react";

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
    serviceType: string;
  }) => void;
}

export const ServiceSelect: React.FC<ServiceSelectProps> = ({
  services,
  onSelectService,
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(
    services[0]?.id ?? null,
  );

  const [selectedServiceType, setSelectedServiceType] = useState<string | null>(
    services[0]?.name ?? null,
  );

  const effectiveSelectedServiceId =
    selectedServiceId ?? services[0]?.id ?? null;

  const selectedService = services.find(
    (s) => s.id === effectiveSelectedServiceId,
  );

  const effectiveSelectedServiceType =
    selectedServiceType ?? services[0]?.name ?? null;

  const handleSubmit = () => {
    if (effectiveSelectedServiceId) {
      onSelectService({
        serviceId: effectiveSelectedServiceId,
        serviceType: effectiveSelectedServiceType,
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
              onClick={() => {
                setSelectedServiceId(service.id);
                setSelectedServiceType(service.name);
              }}
              className={`w-full text-left p-6 rounded-2xl border-2 transition-all ${
                effectiveSelectedServiceId === service.id
                  ? "border-blue-900 bg-blue-100"
                  : "border-gray-200 hover:border-gray-400"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-md font-semibold text-gray-900">
                    {service.name}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-600 mt-2">
                    <LuClock className="w-4 h-4" />
                    <span>{service.waitTime} wait</span>
                  </div>
                </div>
                <div className="text-right">
                  {selectedServiceId === service.id && (
                    <div className="text-green-600">✓</div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={handleSubmit}
          disabled={!selectedService}
          className="w-full bg-blue-900 text-white font-semibold py-4 rounded-full hover:bg-blue-800 disabled:opacity-50 transition-colors text-lg"
        >
          Join Queue
        </button>
      </div>
    </div>
  );
};
