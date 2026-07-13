import type { Metadata } from "next";
import "./globals.css";
import Layout from '@/components/Layout/Layout';
import { Montserrat } from 'next/font/google';


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

    <html lang="uk">
      <body className={montserrat.variable}>
        <Layout>
        <LoaderProvider>{children}</LoaderProvider>
        </Layout>
        <ToastProvider />
          </body>
    </html>
  );
}
