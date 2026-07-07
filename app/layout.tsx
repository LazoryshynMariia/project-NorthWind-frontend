import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import ToastProvider from '@/components/ToastProvider/ToastProvider';
import LoaderProvider from '@/components/LoaderProvider/LoaderProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <LoaderProvider>{children}</LoaderProvider>
        <ToastProvider />
      </body>
    </html>
  );
}
