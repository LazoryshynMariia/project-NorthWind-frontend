import { Category } from '@/types/categories';
import { nextServer } from './api';

export const getGategories = async (): Promise<Category[]> => {
  const res = await nextServer.get('/categories');
  return res.data.data;
};
