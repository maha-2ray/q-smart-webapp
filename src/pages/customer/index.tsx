import React, { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LocationSelect,
  ServiceSelect,
  YourDetails,
  QueueStatus,
} from "./components";
import type { LocationData } from "./components/location-select";
import type { Service } from "./components/service-select";
import { useUnits } from "../../hooks/use-departments";
import {
  useCancelTicket,
  useCreateTicket,
  useMyTickets,
} from "../../hooks/use-queue";
import type { QueueTicket } from "../../services/queue";
import { useCurrentUser } from "../../hooks/use-auth";

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

const currentTicketStatuses = new Set(["WAITING", "CALLED", "SERVING"]);
const previousTicketStatuses = new Set([
  "COMPLETED",
  "CANCELLED",
  "EXPIRED",
  "NO_SHOW",
]);

const formatTicketDate = (ticket: QueueTicket) => {
  const dateValue = ticket.issuedAt || ticket.createdAt || ticket.updatedAt;

  if (!dateValue) return "-";

  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(dateValue));
};

const TicketList: React.FC<{
  title: string;
  emptyMessage: string;
  tickets: QueueTicket[];
  isLoading: boolean;
  isError: boolean;
}> = ({ title, emptyMessage, tickets, isLoading, isError }) => (
  <div className="min-h-screen bg-white px-4 py-8">
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          <p className="text-gray-600 mt-2">
            Track your queue activity and ticket status.
          </p>
        </div>
        <Link
          to="/customer"
          className="inline-flex justify-center rounded-full bg-blue-900 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800"
        >
          Book Ticket
        </Link>
      </div>

      {isLoading && (
        <p className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
          Loading tickets...
        </p>
      )}

      {isError && (
        <p className="rounded-lg border border-red-200 bg-red-50 p-6 text-sm text-red-600">
          Unable to load tickets.
        </p>
      )}

      {!isLoading && !isError && tickets.length === 0 && (
        <p className="rounded-lg border border-gray-200 p-6 text-sm text-gray-500">
          {emptyMessage}
        </p>
      )}

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <article
            key={ticket.id}
            className="rounded-lg border border-gray-200 p-5 shadow-sm"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase text-gray-500">
                  Ticket
                </p>
                <h2 className="mt-1 font-mono text-3xl font-bold text-gray-900">
                  {ticket.ticketNumber}
                </h2>
              </div>
              <span className="w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-900">
                {ticket.status}
              </span>
            </div>

            <dl className="mt-5 grid gap-4 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500">
                  Name
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {ticket.customerName}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500">
                  Position
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {ticket.queuePosition || "-"}
                </dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase text-gray-500">
                  Date
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {formatTicketDate(ticket)}
                </dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  </div>
);

const Customer: React.FC = () => {
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<Step>("service");
  const [customerData, setCustomerData] = useState<Partial<CustomerData>>({
    notification: "browser",
  });
  const [ticket, setTicket] = useState<QueueTicket | null>(null);
  const currentUserQuery = useCurrentUser();
  const unitsQuery = useUnits();
  const isCurrentTicketsView = location.pathname.endsWith("/current-tickets");
  const isPreviousTicketsView = location.pathname.endsWith("/previous-tickets");
  const myTicketsQuery = useMyTickets(
    isCurrentTicketsView || isPreviousTicketsView,
  );
  const createTicket = useCreateTicket();
  const cancelTicket = useCancelTicket();

  const isLoadingTickets = myTicketsQuery.isLoading;

  const services: Service[] = (unitsQuery.data || []).map((unit) => ({
    id: unit.id,
    name: unit.name,
    waitTime: "-",
  }));

  const tickets = myTicketsQuery.data || [];
  const currentTickets = useMemo(
    () =>
      tickets.filter((queueTicket) =>
        currentTicketStatuses.has(String(queueTicket.status).toUpperCase()),
      ),
    [tickets],
  );
  const previousTickets = useMemo(
    () =>
      tickets.filter((queueTicket) =>
        previousTicketStatuses.has(String(queueTicket.status).toUpperCase()),
      ),
    [tickets],
  );

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
        customerEmail: currentUserQuery.data?.email,
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

  if (isCurrentTicketsView) {
    return (
      <TicketList
        title="Current Tickets"
        emptyMessage="You do not have any active tickets right now."
        tickets={currentTickets}
        isLoading={isLoadingTickets}
        isError={myTicketsQuery.isError}
      />
    );
  }

  if (isPreviousTicketsView) {
    return (
      <TicketList
        title="Previously Booked Tickets"
        emptyMessage="You do not have any previous tickets yet."
        tickets={previousTickets}
        isLoading={isLoadingTickets}
        isError={myTicketsQuery.isError}
      />
    );
  }

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
