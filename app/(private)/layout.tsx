import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { ReactNode } from 'react';

import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
<<<<<<< HEAD
  return <ProtectedRoute>{children}</ProtectedRoute>;
=======
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
>>>>>>> origin/main
}
