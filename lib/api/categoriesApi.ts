import { nextServer } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type { Category } from '@/types/categories';

export const getCategories = async (): Promise<Category[]> => {
  const response = await nextServer.get<ApiResponse<Category[]>>('/categories');

  return response.data.data;
};
