export interface UserProfile {
  id?: string;
  _id?: string;
  name: string;
  email?: string;
  avatarUrl: string | null;
}

export interface UpdateUserProfileData {
  name: string;
}
