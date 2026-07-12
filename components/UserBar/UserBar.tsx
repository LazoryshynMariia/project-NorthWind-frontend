'use client';

import { useState } from 'react';
import Image from 'next/image';
import { RxExit } from 'react-icons/rx';
import { AuthUser } from '@/lib/api/auth';
import  ConfirmModal from '@/components/ConfirmModal/ConfirmModal';

import css from './UserBar.module.css';

interface User {
  name: string;
  avatarUrl?: string;
}

interface UserBarProps {
  user: AuthUser;
  onLogout: () => Promise<void> | void;
}

export const UserBar = ({ user, onLogout }: UserBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await onLogout();
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className={css.userBar}>
      <Image
        src={user.avatarUrl || '/default-avatar.png'}
        alt={
          user.name
            ? `Аватар користувача ${user.name}`
            : 'Аватар користувача'
        }
        width={32}
        height={32}
        className={css.avatar}
      />

      <span className={css.userName}>
        {user.name || "Ім'я"}
      </span>

      <span className={css.divider} />

      <button
        type="button"
        className={css.logoutButton}
        aria-label="Вийти з системи"
        onClick={() => setIsModalOpen(true)}
      >
        <RxExit size={20} />
      </button>

      <ConfirmModal
        isOpen={isModalOpen}
        title="Ви точно хочете вийти?"
        confirmButtonText="Вийти"
        cancelButtonText="Відмінити"
        onConfirm={handleLogout}
        onCancel={() => setIsModalOpen(false)}
        description= "Ми будемо сумувати за вами!"       
      />
    </div>
  );
};

export default UserBar;