'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';
import Logo from '@/components/Logo/Logo';
import AuthBar from '@/components/AuthBar/AuthBar';
import UserBar from '@/components/UserBar/UserBar';
import type { AuthUser } from '@/types/auth';
import css from './BurgerMenu.module.css';

interface LinkItem {
  href: string;
  label: string;
}

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  links: LinkItem[];
  user?: AuthUser;
  onLogout: () => Promise<void> | void;
}

export default function BurgerMenu({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  links,
  onLogout,
}: BurgerMenuProps) {
  useEffect(() => {
    if (!isOpen) return;

    const { documentElement, body } = document;
    const htmlOverflow = documentElement.style.overflow;
    const bodyOverflow = body.style.overflow;

    documentElement.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleEscape);

    return () => {
      documentElement.style.overflow = htmlOverflow;
      body.style.overflow = bodyOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={css.overlay}>
      <aside className={css.panel}>
        <div className="container">
          <div className={css.topBar}>
            <Logo />

            <div className={css.topBarActions}>
              {isAuthenticated ? (
                <Link
                  href="/articles/create"
                  className={css.topBarPublishButton}
                  onClick={onClose}
                >
                  Опублікувати статтю
                </Link>
              ) : (
                <div className={css.topBarAuthBar}>
                  <AuthBar />
                </div>
              )}

              <button
                type="button"
                className={css.closeButton}
                onClick={onClose}
                aria-label="Закрити меню"
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
          </div>

          <div className={css.burgerGroup}>
            <nav className={css.nav}>
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={css.navLink}
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <div className={css.bottomGroup}>
              {isAuthenticated ? (
                <>
                  <Link
                    href="/articles/create"
                    className={css.publishButton}
                    onClick={onClose}
                  >
                    Опублікувати статтю
                  </Link>

                  {user && <UserBar user={user} onLogout={onLogout} />}
                </>
              ) : (
                <div className={css.bottomAuthBar}>
                  <AuthBar fullWidth />
                </div>
              )}
            </div>
          </div>
        </div>
      </aside>
    </div>,
    document.body
  );
}
