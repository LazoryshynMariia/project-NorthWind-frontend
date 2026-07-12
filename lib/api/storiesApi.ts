import { AddStory, Story } from '@/types/stories';
import { nextServer } from './api';

export const addStory = async (data: AddStory, img: File): Promise<Story> => {
  const formData = new FormData();
  formData.append('img', img);
  formData.append('title', data.title);
  formData.append('article', data.article);
  formData.append('category', data.category);

  const res = await nextServer.post<Story>('/stories', formData);

  return res.data;
};
