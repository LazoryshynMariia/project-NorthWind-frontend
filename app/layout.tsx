import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';

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

// Runs before hydration so the correct theme is applied immediately,
// avoiding a flash of the wrong theme on page load.
const themeInitScript = `
  (function () {
    try {
      var stored = localStorage.getItem('theme');
      var theme = stored === 'dark' || stored === 'light' ? stored : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    } catch (e) {}
  })();
`;

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
        <ThemeProvider>
          <LoaderProvider>{children}</LoaderProvider>
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}
