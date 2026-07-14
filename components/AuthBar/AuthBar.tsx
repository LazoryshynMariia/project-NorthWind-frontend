import Link from 'next/link';

import css from './AuthBar.module.css';

type AuthBarProps = {
  onNavigate?: () => void;
};

export default function AuthBar({ onNavigate }: AuthBarProps) {
  return (
    <nav className={css.authBar} aria-label="Авторизація">
      <Link href="/login" className={css.loginButton} onClick={onNavigate}>
        Вхід
      </Link>

      <Link
        href="/register"
        className={css.registerButton}
        onClick={onNavigate}
      >
        Реєстрація
      </Link>
    </nav>
  );
}
