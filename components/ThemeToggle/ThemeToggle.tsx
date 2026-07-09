'use client';

import { useTheme } from '@/context/ThemeContext';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={styles.toggle}
      aria-label={isDark ? 'Увімкнути світлу тему' : 'Увімкнути темну тему'}
      aria-pressed={isDark}
    >
      <span className={styles.track} data-active={isDark}>
        <span className={styles.thumb} />
      </span>
      <span className={styles.icon} aria-hidden="true">
        {isDark ? '🌙' : '☀️'}
      </span>
    </button>
  );
}
