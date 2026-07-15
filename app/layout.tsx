import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import Layout from '@/components/Layout/Layout';
import AuthProvider from '@/components/AuthProvider/AuthProvider';
import ToastProvider from '@/components/ToastProvider/ToastProvider';
import LoaderProvider from '@/components/LoaderProvider/LoaderProvider';
import { ThemeProvider } from '@/context/ThemeContext';

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Природні мандри',
};

const themeInitScript = [
  "(function () {",
  "  try {",
  "    var stored = localStorage.getItem('theme');",
  "    var theme = stored === 'dark' || stored === 'light' ? stored : 'light';",
  "    document.documentElement.setAttribute('data-theme', theme);",
  "  } catch (e) {}",
  "})();"
].join('\n');

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={montserrat.variable}>
        <AuthProvider>
          <ThemeProvider>
            <LoaderProvider>{children}</LoaderProvider>
            <ToastProvider />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
