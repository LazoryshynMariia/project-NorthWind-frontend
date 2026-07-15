'use client';
import Link from 'next/link';
import css from './AuthBar.module.css';

interface AuthBarProps {
  fullWidth?: boolean;
  onNavigate?: () => void;
}

export default function AuthBar({ fullWidth = false, onNavigate }: AuthBarProps) {
  return (
    <div
      className={`${css.authBar} ${fullWidth ? css.fullWidth : ''}`}
      aria-label="Авторизація"
    >
      <Link href="/login" className={css.loginButton} onClick={onNavigate}>
        Вхід
      </Link>
      <Link href="/register" className={css.registerButton} onClick={onNavigate}>
        Реєстрація
      </Link>
    </div>
  );
}
