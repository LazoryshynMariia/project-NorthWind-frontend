export type ApiErrorResponse = {
  message: string;
};

export type ApiResponse<T> = {
  status?: number | string;
  message?: string;
  data: T;
};

export type PaginationParams = {
  page?: number;
  perPage?: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
};
