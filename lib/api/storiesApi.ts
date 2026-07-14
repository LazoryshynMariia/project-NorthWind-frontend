import { nextServer } from '@/lib/api/api';
import type { Story } from '@/types';
import type { ApiResponse } from '@/types/api';

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
