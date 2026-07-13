import { nextServer } from './api';
import { getAuthHeaders } from './authHeaders';
import type { ApiResponse } from '@/types/api';
import type { Traveller } from '@/types/traveller';

export async function getMe(): Promise<Traveller> {
  const response = await nextServer.get<ApiResponse<Traveller>>('/users/me', {
    headers: getAuthHeaders(),
  });
  return response.data.data;
}
