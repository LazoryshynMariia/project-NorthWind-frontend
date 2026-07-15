import { nextServer } from '@/lib/api/api';
import type { ApiResponse } from '@/types/api';
import type { Traveller } from '@/types/traveller';
import type { UpdateUserProfileData, UserProfile } from '@/types/user';

type UserProfileResponse = ApiResponse<UserProfile> | UserProfile;

const resolveUserProfile = (payload: UserProfileResponse) => {
  return 'data' in payload ? payload.data : payload;
};

export async function getMe(): Promise<Traveller> {
  const response = await nextServer.get<ApiResponse<Traveller>>('/users/me');

  return response.data.data;
}

export const getCurrentUser = async () => {
  const response =
    await nextServer.get<UserProfileResponse>('/users/me');

  return resolveUserProfile(response.data);
};

export const updateCurrentUser = async (
  data: UpdateUserProfileData,
  avatar?: File | null
) => {
  const formData = new FormData();

  formData.append('name', data.name);

  if (avatar) {
    formData.append('avatar', avatar);
  }

  const response = await nextServer.patch<UserProfileResponse>(
    '/users/me/personal',
    formData
  );

  return resolveUserProfile(response.data);
};
