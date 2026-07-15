import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { ReactNode } from 'react';

import Layout from '@/components/Layout/Layout';


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
