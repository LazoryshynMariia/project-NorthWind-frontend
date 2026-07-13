import { nextServer } from './api';
import { getAuthHeaders } from './authHeaders';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';

export async function getSavedStories(
  page = 1,
  perPage = 12
): Promise<PaginatedResponse<Story>> {
  const response = await nextServer.get<PaginatedResponse<Story>>(
    '/users/saved-stories',
    { params: { page, perPage }, headers: getAuthHeaders() }
  );
  return response.data;
}
