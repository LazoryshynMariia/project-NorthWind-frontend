'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { IoCloseOutline } from 'react-icons/io5';

import css from './BurgerMenu.module.css';

import Logo from '@/components/Logo/Logo';
import  AuthBar  from '@/components/AuthBar/AuthBar';
import { UserBar } from '@/components/UserBar/UserBar';

import type { AuthUser } from '@/lib/api/auth';

interface LinkItem {
  href: string;
  label: string;
}

interface BurgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  user?: AuthUser;
  links: LinkItem[];
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => Promise<void> | void;
}

export const BurgerMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  user,
  links,
  onOpenLogin,
  onOpenRegister,
  onLogout,
}: BurgerMenuProps) => {
  useEffect(() => {
    if (!isOpen) return;

    const html = document.documentElement;
    const { body } = document;

    const prevHtmlOverflow = html.style.overflow;
    const prevBodyOverflow = body.style.overflow;

    html.style.overflow = 'hidden';
    body.style.overflow = 'hidden';

    return () => {
      html.style.overflow = prevHtmlOverflow;
      body.style.overflow = prevBodyOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
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
                  <AuthBar
                    
                    onOpenLogin={onOpenLogin}
                    onOpenRegister={onOpenRegister}
                  />
                </div>
              )}

              <button
                type="button"
                className={css.closeButton}
                aria-label="Закрити меню"
                onClick={onClose}
              >
                <IoCloseOutline size={24} />
              </button>
            </div>
          </div>

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
            {isAuthenticated && (
              <Link
                href="/articles/create"
                className={css.publishButton}
                onClick={onClose}
              >
                Опублікувати статтю
              </Link>
            )}

            {isAuthenticated && user ? (
              <UserBar
                user={user}
                onLogout={onLogout}
              />
            ) : (
              <div className={css.bottomAuthBar}>
                <AuthBar
                  onOpenLogin={onOpenLogin}
                  onOpenRegister={onOpenRegister}
                />
              </div>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
};

export default BurgerMenu;