const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '/api-proxy').replace(
  /\/$/,
  ''
);

const API_URL =
  API_BASE_URL.endsWith('/api') || API_BASE_URL.endsWith('/api-proxy')
    ? API_BASE_URL
    : `${API_BASE_URL}/api`;

interface ApiErrorResponse {
  message?: string | string[];
  error?: string;
  statusCode?: number;
}

interface SavedStoryStatusResponse {
  isSaved: boolean;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  theme?: string;
}

export interface AuthResponse {
  status: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    user: AuthUser;
  };
}

export interface StoriesResponse<TStory> {
  data: TStory[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export const getApiUrl = () => API_URL;

function headers(authToken?: string): Record<string, string> {
  const h: Record<string, string> = { 'Content-Type': 'application/json' };
  if (authToken) {
    h['Authorization'] = `Bearer ${authToken}`;
  }
  return h;
}

async function getErrorMessage(
  res: Response,
  fallbackMessage: string
): Promise<string> {
  try {
    const data = (await res.json()) as ApiErrorResponse;
    const message = Array.isArray(data.message)
      ? data.message.join(', ')
      : data.message;

    return message || data.error || `${fallbackMessage} (${res.status})`;
  } catch {
    return `${fallbackMessage} (${res.status})`;
  }
}

async function requestJson<TResponse>(
  path: string,
  options: RequestInit = {},
  fallbackMessage = 'Помилка запиту'
): Promise<TResponse> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(await getErrorMessage(res, fallbackMessage));
  }

  return res.json() as Promise<TResponse>;
}

export async function registerUser(
  payload: RegisterPayload
): Promise<AuthUser> {
  return requestJson<AuthUser>(
    '/auth/register',
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(payload),
    },
    'Не вдалося зареєструвати користувача'
  );
}

export async function loginUser(payload: LoginPayload): Promise<AuthResponse> {
  return requestJson<AuthResponse>(
    '/auth/login',
    {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify(payload),
    },
    'Не вдалося увійти'
  );
}

export async function getStories<TStory>(
  page = 1,
  perPage = 10
): Promise<StoriesResponse<TStory>> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  return requestJson<StoriesResponse<TStory>>(
    `/stories?${params}`,
    {},
    'Не вдалося отримати історії'
  );
}

export async function saveStory(
  storyId: string,
  authToken?: string
): Promise<void> {
  const res = await fetch(`${API_URL}/users/saved-stories`, {
    method: 'POST',
    headers: headers(authToken),
    body: JSON.stringify({ storyId }),
  });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(
        res,
        res.status === 409
          ? 'Ця історія вже є у збережених'
          : 'Не вдалося зберегти історію'
      )
    );
  }
}

export async function deleteSavedStory(
  storyId: string,
  authToken?: string
): Promise<void> {
  const res = await fetch(`${API_URL}/users/saved-stories/${storyId}`, {
    method: 'DELETE',
    headers: headers(authToken),
  });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, 'Не вдалося видалити історію зі збережених')
    );
  }
}

export async function checkIsSaved(
  storyId: string,
  authToken?: string
): Promise<boolean> {
  const res = await fetch(`${API_URL}/users/saved-stories/${storyId}`, {
    headers: headers(authToken),
  });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, 'Не вдалося перевірити статус збереження')
    );
  }

  const data = (await res.json()) as SavedStoryStatusResponse;
  return Boolean(data.isSaved);
}

export async function getSavedStories(
  authToken?: string,
  page = 1,
  perPage = 10
): Promise<unknown> {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  });

  const res = await fetch(`${API_URL}/users/saved-stories?${params}`, {
    headers: headers(authToken),
  });

  if (!res.ok) {
    throw new Error(
      await getErrorMessage(res, 'Не вдалося отримати збережені історії')
    );
  }

  return res.json();
}
