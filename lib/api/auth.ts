import nextServer  from '@/lib/api/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
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

export interface GetMeResponse {
  status: number;
  message: string;
  data: AuthUser;
}

export const login = async (data: LoginData) => {
  const response = await nextServer.post<AuthResponse>(
    '/auth/login',
    data,
  );

  return response.data;
};

export const getMe = async () => {
  const response = await nextServer.get<GetMeResponse>(
    '/users/me',
  );

  return response.data.data;
};

export const logout = async () => {
  await nextServer.post('/auth/logout');
};