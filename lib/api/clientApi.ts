import { AddStory } from '@/types/stories';
import { nextServer } from './api';

export const addStory = async (data: AddStory, img: File): Promise<string> => {
  const formData = new FormData();
  formData.append('img', img);
  formData.append('title', data.title);
  formData.append('article', data.article);
  //formData.append("category", data.category);
  formData.append('category', '6966a5cdbc1b90f344c2e0bb');
  for (const [key, value] of formData.entries()) {
    console.log(key, value);
  }

  const res = await nextServer.post('/stories', formData);
  console.log(res);

  return res.data.url;
};
