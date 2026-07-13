import { create } from 'zustand';

import type { AuthUser } from '@/types/auth';

type AuthStore = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isCheckingAuth: boolean;
  setAuth: (user: AuthUser) => void;
  clearAuth: () => void;
  setIsCheckingAuth: (value: boolean) => void;
};

export const useAuthStore = create<AuthStore>()(set => ({
  user: null,
  isAuthenticated: false,
  isCheckingAuth: true,

  setAuth: user =>
    set({
      user,
      isAuthenticated: true,
      isCheckingAuth: false,
    }),

  clearAuth: () =>
    set({
      user: null,
      isAuthenticated: false,
      isCheckingAuth: false,
    }),

  setIsCheckingAuth: value =>
    set({
      isCheckingAuth: value,
    }),
}));
