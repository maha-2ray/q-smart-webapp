export type EntityId = string | number;

export interface ListParams {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  sort?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface PageResponse<T> {
  content: T[];
  totalElements?: number;
  totalPages?: number;
  size?: number;
  number?: number;
}

export type ListResponse<T> = T[] | PageResponse<T>;

export interface MessageResponse {
  message?: string;
}
