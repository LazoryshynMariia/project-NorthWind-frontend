import { nextServer } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type { UpdateUserProfileData, UserProfile } from '@/types/user';

type UserProfileResponse = ApiResponse<UserProfile> | UserProfile;

const getAuthHeaders = () => {
  if (typeof window === 'undefined') {
    return undefined;
  }

  const token = localStorage.getItem('accessToken');

  return token ? { Authorization: `Bearer ${token}` } : undefined;
};

const resolveUserProfile = (payload: UserProfileResponse) => {
  return 'data' in payload ? payload.data : payload;
};

export const getCurrentUser = async () => {
  const response = await nextServer.get<UserProfileResponse>(
    '/users/me',
    {
      headers: getAuthHeaders(),
    }
  );

  return resolveUserProfile(response.data);
};

export const updateCurrentUser = async (data: UpdateUserProfileData) => {
  const response = await nextServer.patch<UserProfileResponse>(
    '/users/me/personal',
    data,
    {
      headers: getAuthHeaders(),
    }
  );

  return resolveUserProfile(response.data);
};
