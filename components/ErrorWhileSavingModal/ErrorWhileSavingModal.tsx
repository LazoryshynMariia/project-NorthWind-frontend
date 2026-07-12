'use client';

import { useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './ErrorWhileSavingModal.module.css';

interface ErrorWhileSavingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ErrorWhileSavingModal({
  isOpen,
  onClose,
}: ErrorWhileSavingModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Закрити"
          type="button"
        >
          &#10005;
        </button>

        <h2 className={styles.title}>Помилка під час збереження</h2>

        <p className={styles.text}>
          Щоб зберегти статтю вам треба увійти, якщо ще немає облікового запису
          зареєструйтесь
        </p>

        <div className={styles.actions}>
          <Link
            href="/auth/login"
            className={styles.linkOutline}
            onClick={onClose}
          >
            Увійти
          </Link>
          <Link href="/auth/register" className={styles.link} onClick={onClose}>
            Зареєструватись
          </Link>
        </div>
      </div>
    </div>
  );
}
