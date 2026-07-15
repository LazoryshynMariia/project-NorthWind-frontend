'use client';

import { ReactNode } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import css from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className={css.layout}>
      <Header
        isAuthenticated={false}
        onLogout={() => {}}
      />

      <main className={css.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}