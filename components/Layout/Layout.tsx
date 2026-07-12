'use client';

import { ReactNode } from 'react';

import  Header from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

import css from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
  isAuthenticated?: boolean;
}

export default function Layout({
  children,
  isAuthenticated = false,
}: LayoutProps) {
  const handleOpenLogin = () => {
    // TODO: открыть модальное окно авторизации
  };

  const handleOpenRegister = () => {
    // TODO: открыть модальное окно регистрации
  };

  return (
    <div className={css.layout}>
      <Header
        isAuthenticated={isAuthenticated}
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />

      <main className={css.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}