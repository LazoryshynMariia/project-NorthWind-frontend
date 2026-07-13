import { ReactNode } from 'react';

import Footer from '@/components/Footer/Footer';

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <>
      {children}
      
    </>
  );
}
