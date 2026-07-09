'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

import { apiFetch } from '@/lib/api';
import { isAuthenticated } from '@/lib/auth';

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const THEME_STORAGE_KEY = 'theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

function applyThemeToDocument(theme: Theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light');

  // On mount: read local preference first (instant, no server round-trip),
  // then reconcile with the server if the user is logged in.
  useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as Theme | null;
    const initialTheme = stored === 'dark' || stored === 'light' ? stored : 'light';

    setThemeState(initialTheme);
    applyThemeToDocument(initialTheme);

    if (!isAuthenticated()) return;

    apiFetch<{ data: { theme: Theme } }>('/users/me')
      .then((res) => {
        const serverTheme = res.data.theme;
        if (serverTheme && serverTheme !== initialTheme) {
          setThemeState(serverTheme);
          applyThemeToDocument(serverTheme);
          localStorage.setItem(THEME_STORAGE_KEY, serverTheme);
        }
      })
      .catch(() => {
        // Not fatal — keep the locally stored/default theme.
      });
  }, []);

  const setTheme = useCallback((next: Theme) => {
    setThemeState(next);
    applyThemeToDocument(next);
    localStorage.setItem(THEME_STORAGE_KEY, next);

    if (isAuthenticated()) {
      apiFetch('/users/me/theme', {
        method: 'PATCH',
        body: { theme: next },
      }).catch(() => {
        // Keep the UI change even if the sync to the server fails;
        // it will be retried the next time the user toggles or logs in.
      });
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  }, [theme, setTheme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
