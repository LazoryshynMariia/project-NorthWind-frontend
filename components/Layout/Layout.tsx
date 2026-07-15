import { ReactNode } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

import styles from './Layout.module.css';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
}
