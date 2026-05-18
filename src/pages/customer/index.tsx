import React, { useState } from "react";
import {
  LocationSelect,
  ServiceSelect,
  YourDetails,
  QueueStatus,
} from "./components";
import type { LocationData } from "./components/location-select";
import type { Service } from "./components/service-select";

type Step = "location" | "service" | "details" | "status";

const mockLocations: LocationData[] = [
  {
    id: "1",
    name: "CityBank Downtown",
    openUntil: "5:00 PM",
  },
];

const mockServices: Service[] = [
  {
    id: "A",
    name: "Account Services",
    waitTime: "15 min",
  },
  {
    id: "B",
    name: "Loan Applications",
    waitTime: "5 min",
  },
  {
    id: "C",
    name: "Teller Services",
    waitTime: "25 min",
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
  const [ticketNumber, setTicketNumber] = useState("A042");

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
    const service = mockServices.find((s) => s.id === customerData.serviceId);
    if (service) {
      setTicketNumber(`${service.id}042`);
    }
    setCurrentStep("status");
  };

  const handleLeaveQueue = () => {
    setCurrentStep("service");
    setCustomerData({});
    setTicketNumber("A042");
  };

  const selectedService = mockServices.find(
    (s) => s.id === customerData.serviceId,
  );

  return (
    <div className="overflow-x-auto max-h-[calc(135vh-300px)]">
      {currentStep === "location" && (
        <LocationSelect
          locations={mockLocations}
          onSelect={handleLocationSelect}
        />
      )}

      {currentStep === "service" && (
        <ServiceSelect
          services={mockServices}
          onSelectService={handleServiceSelect}
        />
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
          ticketNumber={ticketNumber}
          position="3rd in line"
          estimatedWait="~12 min"
          status="Waiting for teller"
          preparationNotes="Please have your ID and account number ready. We will notify you when it's your turn."
          onLeaveQueue={handleLeaveQueue}
        />
      )}
    </div>
  );
};

export default Customer;
