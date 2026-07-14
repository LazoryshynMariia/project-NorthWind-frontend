import { ReactNode } from 'react';

import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
