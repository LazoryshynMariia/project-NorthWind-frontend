'use client';

import { ReactNode, useEffect, useState } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import LoginForm from '@/components/LoginForm/LoginForm';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

import { getMe, type AuthUser } from '@/lib/api/auth';

import css from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const currentUser = await getMe();
        setUser(currentUser);
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const handleOpenRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleCloseRegister = () => {
    setIsRegisterOpen(false);
  };

  const handleLogout = async () => {
    // await logout();
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

      <main className={css.main}>{children}</main>

      <Footer />

      {isLoginOpen && (
        <div
          className={css.backdrop}
          onClick={handleCloseLogin}
        >
          <div
            className={css.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={css.closeButton}
              onClick={handleCloseLogin}
            >
              ✕
            </button>

            <LoginForm />
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div
          className={css.backdrop}
          onClick={handleCloseRegister}
        >
          <div
            className={css.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className={css.closeButton}
              onClick={handleCloseRegister}
            >
              ✕
            </button>

            <RegistrationForm />
          </div>
        </div>
      )}
    </div>
  );
}
