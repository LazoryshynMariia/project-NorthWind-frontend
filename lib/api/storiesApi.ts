import { nextServer } from './api';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';

export async function getStoriesByAuthor(
  author: string,
  page = 1,
  perPage = 12
): Promise<PaginatedResponse<Story>> {
  const response = await nextServer.get<PaginatedResponse<Story>>('/stories', {
    params: { author, page, perPage },
  });
  return response.data;
}
