import { nextServer } from '@/lib/api/api';
import type { TravellersResponse, Traveller } from '@/types/traveller';
import type { ApiResponse, PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';

export async function getTravellers(
  page: number,
  perPage: number
): Promise<TravellersResponse> {
  const { data } = await nextServer.get<TravellersResponse>(
    '/users/travellers',
    {
      params: {
        page,
        perPage,
      },
    }
  );

  return data;
}

export async function getTravellerById(id: string): Promise<Traveller | null> {
  try {
    const response = await nextServer.get<ApiResponse<Traveller>>(
      `/users/travellers/${id}`
    );
    return response.data.data;
  } catch {
    return null;
  }
}

export async function getTravellerStories(
  id: string,
  page: number,
  perPage: number
): Promise<PaginatedResponse<Story> | null> {
  try {
    const response = await nextServer.get<PaginatedResponse<Story>>(
      '/stories',
      { params: { author: id, page, perPage } }
    );
    return response.data;
  } catch {
    return null;
  }
}
