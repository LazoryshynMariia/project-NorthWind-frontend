import { ReactNode } from 'react';

<<<<<<< HEAD
import Footer from '@/components/Footer/Footer';
=======
import Layout from '@/components/Layout/Layout';
>>>>>>> origin/main

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
<<<<<<< HEAD
  return (
    <>
      {children}
      
    </>
  );
}
=======
  return <Layout>{children}</Layout>;
}
>>>>>>> origin/main
