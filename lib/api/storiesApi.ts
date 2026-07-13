import { nextServer } from '@/lib/api/api';
import type { Story } from '@/types';
import type { ApiResponse } from '@/types/api';

type SavedStory = {
  _id: string;
  userId: string;
  storyId: string;
  createdAt: string;
  updatedAt: string;
};

type CheckSavedStoryResponse = {
  isSaved: boolean;
};

type RemoveSavedStoryResponse = {
  message: string;
};

function getAuthHeaders() {
  if (typeof window === 'undefined') {
    return {};
  }

  const accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    return {};
  }

  return {
    Authorization: `Bearer ${accessToken}`,
  };
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

export async function checkSavedStory(storyId: string): Promise<boolean> {
  const response = await nextServer.get<CheckSavedStoryResponse>(
    `/users/saved-stories/${storyId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data.isSaved;
}

export async function saveStory(storyId: string): Promise<SavedStory> {
  const response = await nextServer.post<SavedStory>(
    '/users/saved-stories',
    { storyId },
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
}

export async function removeSavedStory(
  storyId: string
): Promise<RemoveSavedStoryResponse> {
  const response = await nextServer.delete<RemoveSavedStoryResponse>(
    `/users/saved-stories/${storyId}`,
    {
      headers: getAuthHeaders(),
    }
  );

  return response.data;
}
