'use client';

import Link from 'next/link';
import css from './AuthBar.module.css';

interface AuthBarProps {
  fullWidth?: boolean;
}

export default function AuthBar({
  fullWidth = false,
}: AuthBarProps) {
  return (
    <div
      className={`${css.authBar} ${fullWidth ? css.fullWidth : ''}`}
    >
      <Link href="/login" className={css.loginButton}>
        Вхід
      </Link>

      <Link href="/register" className={css.registerButton}>
        Реєстрація
      </Link>
    </div>
  );
}