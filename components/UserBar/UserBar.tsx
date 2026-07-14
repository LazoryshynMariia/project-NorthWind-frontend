'use client';

import { useState } from 'react';
import Image from 'next/image';

import ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

import type { AuthUser } from '@/types/auth';

import css from './UserBar.module.css';

type UserBarProps = {
  user: AuthUser;
  onLogout: () => Promise<void> | void;
};

function LogoutIcon() {
  return (
    <svg
      width="18"
      height="19"
      viewBox="0 0 18 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M1.703 18.305q-.69 0-1.196-.507A1.64 1.64 0 0 1 0 16.602V1.709q0-.692.507-1.2A1.63 1.63 0 0 1 1.703 0H8.31q.36 0 .606.25a.84.84 0 0 1 .245.613.82.82 0 0 1-.245.604.83.83 0 0 1-.606.242H1.703v14.893H8.31q.36 0 .606.247a.83.83 0 0 1 .245.609.82.82 0 0 1-.245.605.83.83 0 0 1-.606.242zm13.338-8.298H6.965a.82.82 0 0 1-.606-.247.83.83 0 0 1-.245-.609q0-.363.245-.605a.83.83 0 0 1 .606-.242h8.026L13.068 6.38a.78.78 0 0 1-.242-.6.86.86 0 0 1 .267-.596.81.81 0 0 1 .607-.255.85.85 0 0 1 .612.258l3.396 3.397q.249.256.249.598a.83.83 0 0 1-.249.595l-3.371 3.372a.77.77 0 0 1-.595.245.9.9 0 0 1-.609-.264.86.86 0 0 1-.248-.609.81.81 0 0 1 .258-.61z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function UserBar({ user, onLogout }: UserBarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);

    try {
      await onLogout();
    } finally {
      setIsLoggingOut(false);
      setIsModalOpen(false);
    }
  };

  const closeModal = () => {
    if (!isLoggingOut) {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={css.userBar}>
      <Image
        src={user.avatarUrl || '/placeholder-avatar.svg'}
        alt={
          user.name ? `Аватар користувача ${user.name}` : 'Аватар користувача'
        }
        width={32}
        height={32}
        className={css.avatar}
      />

      <span className={css.userName}>{user.name || "Ім'я"}</span>

      <span className={css.divider} aria-hidden="true" />

      <button
        type="button"
        className={css.logoutButton}
        aria-label="Вийти з облікового запису"
        onClick={() => setIsModalOpen(true)}
      >
        <LogoutIcon />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Ви точно хочете вийти?"
        description="Ми будемо сумувати за вами!"
        confirmButtonText={isLoggingOut ? 'Вихід...' : 'Вийти'}
        cancelButtonText="Скасувати"
        onConfirm={handleLogout}
        onCancel={closeModal}
      />
    </div>
  );
}
