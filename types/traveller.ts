export interface Traveller {
  _id: string;
  name: string;
  avatarUrl: string | null;
  articlesAmount: number;
}

export interface TravellersResponse {
  data: Traveller[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
