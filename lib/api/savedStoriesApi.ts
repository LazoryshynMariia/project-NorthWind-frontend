import { nextServer } from '@/lib/api/api';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';

interface SavedStoryLink {
  _id: string;
  storyId: Story;
}

type SavedStoryStatusResponse = {
  isSaved: boolean;
};

type ApiErrorLike = {
  response?: {
    status?: number;
    data?: {
      message?: string | string[];
      error?: string;
    };
  };
};

function getApiErrorMessage(error: unknown, fallbackMessage: string): string {
  const apiError = error as ApiErrorLike;
  const data = apiError.response?.data;
  const message = Array.isArray(data?.message)
    ? data.message.join(', ')
    : data?.message;

  return message || data?.error || fallbackMessage;
}

export async function saveStory(storyId: string): Promise<void> {
  try {
    await nextServer.post('/users/saved-stories', {
      storyId,
    });
  } catch (error) {
    throw new Error(
      getApiErrorMessage(
        error,
        (error as ApiErrorLike).response?.status === 409
          ? 'Ця історія вже є у збережених'
          : 'Не вдалося зберегти історію'
      )
    );
  }
}

export async function deleteSavedStory(storyId: string): Promise<void> {
  try {
    await nextServer.delete(`/users/saved-stories/${storyId}`);
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, 'Не вдалося видалити історію зі збережених')
    );
  }
}

export async function checkIsSaved(storyId: string): Promise<boolean> {
  try {
    const { data } = await nextServer.get<SavedStoryStatusResponse>(
      `/users/saved-stories/${storyId}`
    );

    return Boolean(data.isSaved);
  } catch (error) {
    throw new Error(
      getApiErrorMessage(error, 'Не вдалося перевірити статус збереження')
    );
  }
}

export interface SavedStoriesPage {
  stories: Story[];
  totalPages: number;
}

// saved-stories returns link objects, the real story lives in storyId
export async function getSavedStories(
  page = 1,
  perPage = 12
): Promise<SavedStoriesPage> {
  const response = await nextServer.get<PaginatedResponse<SavedStoryLink>>(
    '/users/saved-stories',
    { params: { page, perPage } }
  );

  // some saved links can point to a deleted story (storyId is null), skip them
  const links = response.data.data.filter(item => item.storyId);

  return {
    stories: links.map(item => item.storyId),
    totalPages: response.data.totalPages,
  };
}
