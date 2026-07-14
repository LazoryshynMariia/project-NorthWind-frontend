'use client';

import Link from 'next/link';
import css from './AuthBar.module.css';

export default function AuthBar() {
  return (
    <div className={css.authBar}>
      <Link href="/login" className={css.loginButton}>
        Вхід
      </Link>

      <Link href="/register" className={css.registerButton}>
        Реєстрація
      </Link>
    </div>
  );
}