'use client';

import css from './AuthBar.module.css';

interface AuthBarProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  variant?: 'default' | 'vertical';
}

export default function AuthBar({
  onOpenLogin,
  onOpenRegister,
  variant = 'default',
}: AuthBarProps) {
  return (
    <div
      className={`${css.authBar} ${
        variant === 'vertical' ? css.vertical : ''
      }`}
    >
      <button
        type="button"
        className={css.loginButton}
        onClick={onOpenLogin}
      >
        Вхід
      </button>

      <button
        type="button"
        className={css.registerButton}
        onClick={onOpenRegister}
      >
        Реєстрація
      </button>
    </div>
  );
}