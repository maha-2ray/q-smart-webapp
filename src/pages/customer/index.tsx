import React, { useState } from "react";
import {
  LocationSelect,
  ServiceSelect,
  YourDetails,
  QueueStatus,
} from "./components";
import type { LocationData } from "./components/location-select";
import type { Service } from "./components/service-select";
import { useUnits } from "../../hooks/use-departments";
import { useCancelTicket, useCreateTicket } from "../../hooks/use-queue";
import type { QueueTicket } from "../../services/queue";

type Step = "location" | "service" | "details" | "status";

const mockLocations: LocationData[] = [
  {
    id: "1",
    name: "CityBank Downtown",
    openUntil: "5:00 PM",
  },
];

interface CustomerData {
  locationId: string;
  serviceId: string;
  fullName: string;
  mobileNumber: string;
  notification: "sms" | "browser";
}

const Customer: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("service");
  const [customerData, setCustomerData] = useState<Partial<CustomerData>>({
    notification: "browser",
  });
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  const unitsQuery = useUnits();
  const createTicket = useCreateTicket();
  const cancelTicket = useCancelTicket();

  const services: Service[] = (unitsQuery.data || []).map((unit) => ({
    id: unit.id,
    name: unit.name,
    waitTime: "-",
  }));

  const handleLocationSelect = (locationId: string) => {
    setCustomerData((prev) => ({ ...prev, locationId }));
    setCurrentStep("service");
  };

  const handleServiceSelect = (data: {
    serviceId: string;
    name: string;
    mobileNumber: string;
    notification: "sms" | "browser";
  }) => {
    setCustomerData((prev) => ({
      ...prev,
      serviceId: data.serviceId,
      fullName: data.name,
      mobileNumber: data.mobileNumber,
      notification: data.notification,
    }));
    setCurrentStep("details");
  };

  const handleContinueDetails = (data: {
    name: string;
    phone: string;
    notification: "sms" | "browser";
  }) => {
    setCustomerData((prev) => ({
      ...prev,
      fullName: data.name,
      mobileNumber: data.phone,
      notification: data.notification,
    }));
    // Generate ticket number based on service
    if (!customerData.serviceId) return;

    createTicket.mutate(
      {
        unitId: customerData.serviceId,
        customerName: data.name,
        customerPhone: data.phone,
      },
      {
        onSuccess: (createdTicket) => {
          setTicket(createdTicket);
          setCurrentStep("status");
        },
      },
    );
  };

  const handleLeaveQueue = () => {
    if (ticket) {
      cancelTicket.mutate(ticket.id);
    }

    setCurrentStep("service");
    setCustomerData({});
    setTicket(null);
  };

  const selectedService = services.find((s) => s.id === customerData.serviceId);

  return (
    <div className="overflow-x-auto max-h-[calc(135vh-300px)]">
      {currentStep === "location" && (
        <LocationSelect
          locations={mockLocations}
          onSelect={handleLocationSelect}
        />
      )}

      {currentStep === "service" && (
        <>
          {unitsQuery.isLoading && (
            <p className="p-6 text-sm text-gray-500">Loading services...</p>
          )}
          {unitsQuery.isError && (
            <p className="p-6 text-sm text-red-600">Unable to load services.</p>
          )}
          <ServiceSelect
            services={services}
            onSelectService={handleServiceSelect}
          />
        </>
      )}

      {currentStep === "details" && selectedService && (
        <YourDetails
          serviceName={selectedService.name}
          initialName={customerData.fullName || ""}
          initialPhone={customerData.mobileNumber || ""}
          initialNotification={customerData.notification || "browser"}
          onBack={() => setCurrentStep("service")}
          onContinue={handleContinueDetails}
        />
      )}

      {currentStep === "status" && selectedService && (
        <QueueStatus
          ticketNumber={ticket?.ticketNumber || "-"}
          position={
            ticket?.queuePosition ? `${ticket.queuePosition} in line` : "Queued"
          }
          estimatedWait="-"
          status={ticket?.status || "WAITING"}
          preparationNotes={
            createTicket.isPending
              ? "Creating your ticket..."
              : "We will notify you when it is your turn."
          }
          onLeaveQueue={handleLeaveQueue}
        />
      )}
    </div>
  );
};

export default Customer;
