import { nextServer } from '@/lib/api/api';
import type { CreateStoryData, Story } from '@/types';
import type { ApiResponse } from '@/types/api';

export async function addStory(
  data: CreateStoryData,
  img: File
): Promise<Story> {
  const formData = new FormData();
  formData.append('img', img);
  formData.append('title', data.title);
  formData.append('article', data.article);
  formData.append('category', data.category);

  const response = await nextServer.post<Story>('/stories', formData);

  return response.data;
}

export async function getPopularStories(): Promise<Story[]> {
  const response =
    await nextServer.get<ApiResponse<Story[]>>('/stories/popular');

  return response.data.data;
}

export async function getStoryById(storyId: string): Promise<Story | null> {
  try {
    const response = await nextServer.get<ApiResponse<Story>>(
      `/stories/${storyId}`
    );

    return response.data.data;
  } catch {
    return null;
  }
}

export async function getRecommendedStories(): Promise<Story[]> {
  try {
    const response = await nextServer.get<ApiResponse<Story[]>>(
      '/stories/recommended'
    );

    return response.data.data;
  } catch {
    return [];
  }
}
