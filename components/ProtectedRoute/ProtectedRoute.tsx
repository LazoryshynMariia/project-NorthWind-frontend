'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/lib/store/authStore';

type ProtectedRouteProps = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);

  useEffect(() => {
    if (!isCheckingAuth && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, isCheckingAuth, router]);

  if (isCheckingAuth || !isAuthenticated) {
    return null;
  }

  return children;
}
