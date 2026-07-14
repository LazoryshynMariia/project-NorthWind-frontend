'use client';

import { useEffect, type ReactNode } from 'react';

import { getCurrentUser, refreshSession } from '@/lib/api/auth';
import { useAuthStore } from '@/lib/store/authStore';

type AuthProviderProps = {
  children: ReactNode;
};

export default function AuthProvider({ children }: AuthProviderProps) {
  const setAuth = useAuthStore(state => state.setAuth);
  const clearAuth = useAuthStore(state => state.clearAuth);

  useEffect(() => {
    const checkAuth = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken) {
        clearAuth();
        return;
      }

      try {
        const user = await getCurrentUser();
        setAuth(user);
      } catch {
        if (!refreshToken) {
          clearAuth();
          return;
        }

        try {
          const response = await refreshSession(refreshToken);

          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);

          const user = await getCurrentUser();
          setAuth(user);
        } catch {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          clearAuth();
        }
      }
    };

    checkAuth();
  }, [setAuth, clearAuth]);

  return children;
}
