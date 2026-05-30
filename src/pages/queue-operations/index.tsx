import { PageLayout } from "../../components/layouts/page-layout";
import React, { useMemo, useState } from "react";
import QueueControl from "./components/queue-control";
import CurrentlyServing from "./components/currently-serving";
import { QUEUE_TABLE_COLUMNS } from "./components/queue-table";
import type { QueueEntry } from "./components/queue-table";
import Table from "../../components/ui/table";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";
import { WalkInEntryModal } from "./components/walk-in-entry";
import type { DepartmentOption } from "./components/walk-in-entry";
import { useDepartments, useUnits } from "../../hooks/use-departments";
import {
  useCallNext,
  useCompleteTicket,
  useCreateTicket,
  useTickets,
  useUpdateTicket,
} from "../../hooks/use-queue";
import type { QueueTicket } from "../../services/queue";

const getWaitMinutes = (issuedAt?: string) => {
  if (!issuedAt) return 0;

  return Math.max(
    0,
    Math.floor((Date.now() - new Date(issuedAt).getTime()) / 60000),
  );
};

const formatTime = (dateTime?: string) =>
  dateTime
    ? new Intl.DateTimeFormat(undefined, {
        hour: "numeric",
        minute: "2-digit",
      }).format(new Date(dateTime))
    : "-";

const mapTicketStatus = (status: string): QueueEntry["status"] => {
  if (status === "CALLED" || status === "SERVING") return "Called";
  if (status === "NO_SHOW") return "No Show";
  return "Waiting";
};

const QueueOperations: React.FC = () => {
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const departmentsQuery = useDepartments();
  const unitsQuery = useUnits();
  const ticketsQuery = useTickets({ pageNumber: 0, pageSize: 50 });
  const createTicket = useCreateTicket();
  const callNext = useCallNext();
  const completeTicket = useCompleteTicket();
  const updateTicket = useUpdateTicket();

  const tickets = ticketsQuery.data?.tickets || [];
  const selectedUnit = unitsQuery.data?.[0];
  const selectedDepartment = departmentsQuery.data?.find(
    (department) => department.id === selectedUnit?.departmentId,
  );
  const waitingTickets = tickets.filter(
    (ticket) => ticket.status === "WAITING",
  );
  const currentlyServing =
    tickets.find((ticket) => ticket.status === "CALLED") ||
    tickets.find((ticket) => ticket.status === "SERVING");

  const departmentOptions: DepartmentOption[] = useMemo(
    () =>
      (unitsQuery.data || []).map((unit, index) => {
        const department = departmentsQuery.data?.find(
          (item) => item.id === unit.departmentId,
        );

        return {
          id: unit.id,
          prefix: unit.name.slice(0, 1).toUpperCase() || `${index + 1}`,
          name: department ? `${department.name} / ${unit.name}` : unit.name,
          targetTime: "-",
          peopleWaiting: tickets.filter(
            (ticket) =>
              ticket.unitId === unit.id && ticket.status === "WAITING",
          ).length,
        };
      }),
    [departmentsQuery.data, tickets, unitsQuery.data],
  );

  const tableData: QueueEntry[] = tickets.map((ticket: QueueTicket) => ({
    ticket: ticket.ticketNumber,
    customerName: ticket.customerName,
    waitTime: getWaitMinutes(ticket.issuedAt || ticket.createdAt),
    joinedAt: formatTime(ticket.issuedAt || ticket.createdAt),
    status: mapTicketStatus(ticket.status),
  }));

  return (
    <>
      <PageLayout
        title="Queue Operations"
        subtitle="Manage and monitor all queue operations"
      >
        <div className="grid grid-cols-[1fr_3fr] gap-6">
          <div className="grid grid-rows-[2fr_3fr] gap-6">
            <QueueControl
              departmentName={selectedDepartment?.name || "All"}
              numberWaiting={waitingTickets.length}
              avgWaitTime={0}
              onCallNext={() =>
                selectedUnit && callNext.mutate(selectedUnit.id)
              }
            />
            <CurrentlyServing
              ticketNumber={currentlyServing?.ticketNumber || "-"}
              ticketHolder={
                currentlyServing?.customerName || "No ticket called"
              }
              holderPhoneNumber={currentlyServing?.customerPhone || "-"}
              onServed={() =>
                currentlyServing && completeTicket.mutate(currentlyServing.id)
              }
              onNoShow={() =>
                currentlyServing &&
                updateTicket.mutate({
                  id: currentlyServing.id,
                  payload: { status: "NO_SHOW" },
                })
              }
              onRecall={() =>
                currentlyServing &&
                updateTicket.mutate({
                  id: currentlyServing.id,
                  payload: { status: "CALLED" },
                })
              }
            />
          </div>
          <div className="bg-white border-gray-200 border-2 rounded-lg p-2">
            <div className="p-4">
              <span className="flex items-center justify-between">
                <p>Upcoming Queue</p>
                <Button
                  variant="outline"
                  size="md"
                  iconLeft={<LuPlus />}
                  title="Walk-in Entry"
                  onClick={() => setIsWalkInModalOpen(true)}
                  className="cursor-pointer"
                />
              </span>
            </div>
            {ticketsQuery.isLoading && (
              <p className="p-4 text-sm text-gray-500">Loading tickets...</p>
            )}
            {ticketsQuery.isError && (
              <p className="p-4 text-sm text-red-600">
                Unable to load tickets.
              </p>
            )}
            <Table columns={QUEUE_TABLE_COLUMNS} data={tableData} />
          </div>
        </div>
      </PageLayout>

      {/* Walk-in Entry Modal */}
      <WalkInEntryModal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
        departments={departmentOptions}
        isCreating={createTicket.isPending}
        onCreateTicket={(data) =>
          createTicket.mutate(
            {
              unitId: data.unitId,
              customerName: data.customerName,
              customerPhone: data.mobileNumber || undefined,
            },
            {
              onSuccess: () => setIsWalkInModalOpen(false),
            },
          )
        }
      />
    </>
  );
};

export default QueueOperations;
