import { nextServer } from '@/lib/api/api';
import type { ApiResponse, PaginatedResponse, PaginationParams } from '@/types/api';
import type { CreateStoryData, Story } from '@/types';

type StoriesParams = PaginationParams & {
  category?: string;
};

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

export async function getStories({
  page = 1,
  perPage = 9,
  category,
}: StoriesParams = {}): Promise<PaginatedResponse<Story>> {
  const response = await nextServer.get<PaginatedResponse<Story>>('/stories', {
    params: {
      page,
      perPage,
      category: category || undefined,
    },
  });

  return response.data;
}

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
