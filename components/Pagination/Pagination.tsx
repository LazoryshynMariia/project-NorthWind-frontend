'use client';

import { DotPulse } from 'ldrs/react';

import css from './Pagination.module.css';

export interface PaginationProps {
  onClick: () => void | Promise<void>;
  isLoading?: boolean;
  text?: string;
  disabled?: boolean;
  className?: string;
}

export default function Pagination({
  onClick,
  isLoading = false,
  text = 'Показати ще',
  disabled = false,
  className = '',
}: PaginationProps) {
  const isDisabled = disabled || isLoading;

  return (
    <div className={`${css.wrapper} ${className}`.trim()}>
      {isLoading ? (
        <div
          className={css.loaderWrapper}
          role="status"
          aria-label="Завантаження даних"
        >
          <DotPulse size="43" speed="1.3" color="#254c24" />
        </div>
      ) : (
        <button
          type="button"
          className={css.button}
          onClick={onClick}
          disabled={isDisabled}
          aria-disabled={isDisabled}
        >
          {text}
        </button>
      )}
    </div>
  );
}
