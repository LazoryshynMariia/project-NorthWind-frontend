import { nextServer } from '@/lib/api/api';

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
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

export const login = async (data: LoginData) => {
  const response = await nextServer.post<AuthResponse>('/auth/login', data);

  return response.data;
};
