'use client';

import { ReactNode, useState } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import type { AuthUser } from '@/types/auth';

import css from './Layout.module.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
;

  return (
    <div className={css.layout}>
      <Header  />
     
      <main className={css.main}>
        {children}
      </main>

      <Footer />
    </div>
  );
}