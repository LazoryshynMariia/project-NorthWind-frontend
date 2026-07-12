'use client';

import { ReactNode, useEffect, useState } from 'react';

import Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import { getMe, type AuthUser } from '@/lib/api/auth';

import css from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
      } catch (error) {
        // Если пользователь не авторизован (например, 401)
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleOpenLogin = () => {
    // открыть модальное окно входа
  };

  const handleOpenRegister = () => {
    // открыть модальное окно регистрации
  };

  const handleLogout = async () => {
    // вызвать logout()
    setUser(null);
  };

  return (
    <div className={css.layout}>
      <Header
        isAuthenticated={!!user}
        user={user ?? undefined}
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
        onLogout={handleLogout}
      />

      <main className={css.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}