import { nextServer } from '@/lib/api/api';
import type { TravellersResponse } from '@/types/traveller';

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
