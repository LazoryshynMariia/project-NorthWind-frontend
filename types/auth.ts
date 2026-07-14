export type Theme = 'light' | 'dark';

export interface AuthUser {
  id?: string;
  _id?: string;
  name: string;
  email: string;
  avatarUrl?: string | null;
  articlesAmount?: number;
  theme?: Theme;
}
