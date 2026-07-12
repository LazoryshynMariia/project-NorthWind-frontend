'use client';

import css from './AuthBar.module.css';

interface AuthBarProps {
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  variant?: 'default' | 'inline';
}

const AuthBar = ({
  onOpenLogin,
  onOpenRegister,
  variant = 'default',
}: AuthBarProps) => {
  return (
    <div
      className={`${css.AuthBar} ${
        variant === 'inline' ? css.inline : ''
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
};

export default AuthBar;