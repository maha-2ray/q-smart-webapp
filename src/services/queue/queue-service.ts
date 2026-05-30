import { apiClient } from "../../libs/api/api-client";
import type { EntityId, MessageResponse } from "../shared";
import type {
  CreateTicketRequest,
  QueueTicketStatus,
  TicketListParams,
  TicketListResponse,
  QueueTicket,
  UpdateTicketRequest,
} from "./types";

const TICKETS_BASE_PATH = "/api/v1/tickets";

export const queueService = {
  getTickets: async (params?: TicketListParams) => {
    const response = await apiClient.get<TicketListResponse>(
      TICKETS_BASE_PATH,
      { params },
    );
    return response.data;
  },

  getTicketsByUnit: async (unitId: EntityId) => {
    const response = await apiClient.get<QueueTicket[]>(
      `${TICKETS_BASE_PATH}/unit/${unitId}`,
    );
    return response.data;
  },

  getTicketsByUnitAndStatus: async (
    unitId: EntityId,
    status: QueueTicketStatus,
  ) => {
    const response = await apiClient.get<QueueTicket[]>(
      `${TICKETS_BASE_PATH}/unit/${unitId}/status/${status}`,
    );
    return response.data;
  },

  getWaitingQueue: async (unitId: EntityId) => {
    const response = await apiClient.get<QueueTicket[]>(
      `${TICKETS_BASE_PATH}/unit/${unitId}/queue`,
    );
    return response.data;
  },

  createTicket: async (payload: CreateTicketRequest) => {
    const response = await apiClient.post<QueueTicket>(
      TICKETS_BASE_PATH,
      payload,
    );
    return response.data;
  },

  getTicket: async (id: EntityId) => {
    const response = await apiClient.get<QueueTicket>(
      `${TICKETS_BASE_PATH}/${id}`,
    );
    return response.data;
  },

  getTicketByNumber: async (ticketNumber: string) => {
    const response = await apiClient.get<QueueTicket>(
      `${TICKETS_BASE_PATH}/number/${ticketNumber}`,
    );
    return response.data;
  },

  getTicketCountByStatus: async (
    unitId: EntityId,
    status: QueueTicketStatus,
  ) => {
    const response = await apiClient.get<number>(
      `${TICKETS_BASE_PATH}/unit/${unitId}/count/${status}`,
    );
    return response.data;
  },

  updateTicket: async (id: EntityId, payload: UpdateTicketRequest) => {
    const response = await apiClient.put<QueueTicket>(
      `${TICKETS_BASE_PATH}/${id}`,
      payload,
    );
    return response.data;
  },

  callNext: async (unitId: EntityId) => {
    const response = await apiClient.post<QueueTicket>(
      `${TICKETS_BASE_PATH}/unit/${unitId}/call-next`,
    );
    return response.data;
  },

  completeTicket: async (id: EntityId) => {
    const response = await apiClient.post<QueueTicket>(
      `${TICKETS_BASE_PATH}/${id}/complete`,
    );
    return response.data;
  },

  cancelTicket: async (id: EntityId) => {
    const response = await apiClient.post<MessageResponse | QueueTicket>(
      `${TICKETS_BASE_PATH}/${id}/cancel`,
    );
    return response.data;
  },

  deleteTicket: async (id: EntityId) => {
    const response = await apiClient.delete<MessageResponse>(
      `${TICKETS_BASE_PATH}/${id}`,
    );
    return response.data;
  },
};
