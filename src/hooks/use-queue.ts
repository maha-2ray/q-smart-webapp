import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queueService } from "../services/queue";
import type {
  CreateTicketRequest,
  QueueTicket,
  QueueTicketStatus,
  TicketListParams,
  TicketListResponse,
  UpdateTicketRequest,
} from "../services/queue";
import type { EntityId } from "../services/shared";

export const queueQueryKeys = {
  all: ["tickets"] as const,
  lists: () => [...queueQueryKeys.all, "list"] as const,
  list: (params?: TicketListParams) =>
    [...queueQueryKeys.lists(), params] as const,
  myTickets: () => [...queueQueryKeys.all, "my-tickets"] as const,
  unit: (unitId: EntityId) => [...queueQueryKeys.all, "unit", unitId] as const,
  unitStatus: (unitId: EntityId, status: QueueTicketStatus) =>
    [...queueQueryKeys.unit(unitId), "status", status] as const,
  waitingQueue: (unitId: EntityId) =>
    [...queueQueryKeys.unit(unitId), "queue"] as const,
  countByStatus: (unitId: EntityId, status: QueueTicketStatus) =>
    [...queueQueryKeys.unit(unitId), "count", status] as const,
  ticket: (id: EntityId) => [...queueQueryKeys.all, "ticket", id] as const,
  ticketNumber: (ticketNumber: string) =>
    [...queueQueryKeys.all, "number", ticketNumber] as const,
};

export const useTickets = (params?: TicketListParams) =>
  useQuery({
    queryKey: queueQueryKeys.list(params),
    queryFn: () => queueService.getTickets(params),
  });

export const useMyTickets = (enabled = true) =>
  useQuery({
    queryKey: queueQueryKeys.myTickets(),
    queryFn: queueService.getMyTickets,
    enabled,
  });

export const useTicketsByUnit = (unitId: EntityId, enabled = true) =>
  useQuery({
    queryKey: queueQueryKeys.unit(unitId),
    queryFn: () => queueService.getTicketsByUnit(unitId),
    enabled: enabled && !!unitId,
  });

export const useTicketsByUnitAndStatus = (
  unitId: EntityId,
  status: QueueTicketStatus,
  enabled = true,
) =>
  useQuery({
    queryKey: queueQueryKeys.unitStatus(unitId, status),
    queryFn: () => queueService.getTicketsByUnitAndStatus(unitId, status),
    enabled: enabled && !!unitId && !!status,
  });

export const useWaitingQueue = (unitId: EntityId, enabled = true) =>
  useQuery({
    queryKey: queueQueryKeys.waitingQueue(unitId),
    queryFn: () => queueService.getWaitingQueue(unitId),
    enabled: enabled && !!unitId,
  });

export const useTicket = (id: EntityId, enabled = true) =>
  useQuery({
    queryKey: queueQueryKeys.ticket(id),
    queryFn: () => queueService.getTicket(id),
    enabled: enabled && !!id,
  });

export const useTicketByNumber = (ticketNumber: string, enabled = true) =>
  useQuery({
    queryKey: queueQueryKeys.ticketNumber(ticketNumber),
    queryFn: () => queueService.getTicketByNumber(ticketNumber),
    enabled: enabled && !!ticketNumber,
  });

export const useTicketCountByStatus = (
  unitId: EntityId,
  status: QueueTicketStatus,
  enabled = true,
) =>
  useQuery({
    queryKey: queueQueryKeys.countByStatus(unitId, status),
    queryFn: () => queueService.getTicketCountByStatus(unitId, status),
    enabled: enabled && !!unitId && !!status,
  });

const useQueueMutation = <TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queueQueryKeys.all });
    },
  });
};

export const useCreateTicket = () =>
  useQueueMutation((payload: CreateTicketRequest) =>
    queueService.createTicket(payload),
  );

export const useUpdateTicket = () =>
  useQueueMutation(
    ({ id, payload }: { id: EntityId; payload: UpdateTicketRequest }) =>
      queueService.updateTicket(id, payload),
  );

const upsertTicket = (tickets: QueueTicket[], nextTicket: QueueTicket) => {
  const existingIndex = tickets.findIndex(
    (ticket) => ticket.id === nextTicket.id,
  );

  if (existingIndex === -1) {
    return [nextTicket, ...tickets];
  }

  return tickets.map((ticket, index) =>
    index === existingIndex ? nextTicket : ticket,
  );
};

export const useCallNext = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (unitId: EntityId) => queueService.callNext(unitId),
    onSuccess: (ticket) => {
      queryClient.setQueryData(queueQueryKeys.ticket(ticket.id), ticket);
      queryClient.setQueriesData<TicketListResponse>(
        { queryKey: queueQueryKeys.lists() },
        (previous) =>
          previous
            ? {
                ...previous,
                tickets: upsertTicket(previous.tickets, ticket),
              }
            : previous,
      );
      queryClient.setQueryData<QueueTicket[]>(
        queueQueryKeys.unit(ticket.unitId),
        (previous) => (previous ? upsertTicket(previous, ticket) : previous),
      );
      queryClient.invalidateQueries({ queryKey: queueQueryKeys.all });
    },
  });
};

export const useCompleteTicket = () =>
  useQueueMutation((id: EntityId) => queueService.completeTicket(id));

export const useCancelTicket = () =>
  useQueueMutation((id: EntityId) => queueService.cancelTicket(id));

export const useDeleteTicket = () =>
  useQueueMutation((id: EntityId) => queueService.deleteTicket(id));
