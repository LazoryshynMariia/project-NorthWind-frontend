import { ReactNode } from 'react';

import Layout from '@/components/Layout/Layout';

type PublicLayoutProps = {
  children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return <Layout>{children}</Layout>;
}
