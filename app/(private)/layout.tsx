import { ReactNode } from 'react';

import Layout from '@/components/Layout/Layout';
import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return (
    <ProtectedRoute>
      <Layout>{children}</Layout>
    </ProtectedRoute>
  );
}
