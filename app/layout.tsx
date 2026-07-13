<<<<<<< HEAD
import type { Metadata } from "next";
import "./globals.css";
import Layout from '@/components/Layout/Layout';
import { Montserrat } from 'next/font/google';

=======
import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
>>>>>>> origin/main

import ToastProvider from '@/components/ToastProvider/ToastProvider';
import LoaderProvider from '@/components/LoaderProvider/LoaderProvider';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Природні мандри',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
<<<<<<< HEAD

    <html lang="uk">
      <body className={montserrat.variable}>
        <Layout>
        <LoaderProvider>{children}</LoaderProvider>
        </Layout>
        <ToastProvider />
          </body>
=======
    <html lang="uk">
      <body className={montserrat.variable}>
        <LoaderProvider>{children}</LoaderProvider>
        <ToastProvider />
      </body>
>>>>>>> origin/main
    </html>
  );
}
