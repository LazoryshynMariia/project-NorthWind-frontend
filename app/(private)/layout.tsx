import ProtectedRoute from '@/components/ProtectedRoute/ProtectedRoute';
import { ReactNode } from 'react';

type PrivateLayoutProps = {
  children: ReactNode;
};

export default function PrivateLayout({ children }: PrivateLayoutProps) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
