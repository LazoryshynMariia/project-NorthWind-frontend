import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

import ToastProvider from '@/components/ToastProvider/ToastProvider';
import LoaderProvider from '@/components/LoaderProvider/LoaderProvider';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = { title: 'Природні Мандри' };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={montserrat.variable}>
        <LoaderProvider>{children}</LoaderProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
