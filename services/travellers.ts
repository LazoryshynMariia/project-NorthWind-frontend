import type { TravellersResponse } from '@/types/traveller';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

export async function getTravellers(
  page: number,
  perPage: number
): Promise<TravellersResponse> {
  const response = await fetch(
    `${API_URL}/users/travellers?page=${page}&perPage=${perPage}`,
    {
      cache: 'no-store',
    }
  );

  if (!response.ok) {
    throw new Error('Не вдалося завантажити мандрівників');
  }

  return response.json();
}
