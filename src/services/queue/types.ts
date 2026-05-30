import type { ListParams } from "../shared";

export type QueueTicketStatus =
  | "WAITING"
  | "CALLED"
  | "COMPLETED"
  | "CANCELLED"
  | "EXPIRED"
  | "NO_SHOW"
  | string;
export type TicketPriority = "LOW" | "NORMAL" | "HIGH" | "URGENT" | string;

export interface QueueTicket {
  id: string;
  ticketNumber: string;
  unitId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  status: QueueTicketStatus;
  serviceType?: string;
  priority?: TicketPriority;
  queuePosition?: number;
  issuedAt?: string;
  expiresAt?: string;
  calledAt?: string;
  completedAt?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateTicketRequest {
  unitId: string;
  customerName: string;
  customerPhone?: string;
  customerEmail?: string;
  serviceType?: string;
  priority?: TicketPriority;
  notes?: string;
}

export interface UpdateTicketRequest {
  status?: QueueTicketStatus;
  priority?: TicketPriority;
  queuePosition?: number;
  notes?: string;
}

export interface TicketListResponse {
  tickets: QueueTicket[];
  totalCount: number;
  pageNumber: number;
  pageSize: number;
}

export type TicketListParams = Pick<ListParams, "pageNumber" | "pageSize">;
