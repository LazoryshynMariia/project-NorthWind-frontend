'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';

import AuthBar from '@/components/AuthBar/AuthBar';
import Logo from '@/components/Logo/Logo';
import UserBar from '@/components/UserBar/UserBar';

import type { AuthUser } from '@/types/auth';

import css from './BurgerMenu.module.css';

export type BurgerLink = {
  href: string;
  label: string;
};

type BurgerMenuProps = {
  isOpen: boolean;
  links: BurgerLink[];
  user: AuthUser | null;
  newStoryPath: string;
  onClose: () => void;
  onLogout: () => Promise<void> | void;
};

function CloseIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M17.5996 5.92499C17.7639 5.92499 17.8659 5.97349 17.9463 6.05389C18.0265 6.1342 18.0751 6.23569 18.0752 6.3996C18.0752 6.5638 18.0266 6.66589 17.9463 6.74628L12.6924 12.0002L13.0459 12.3537L17.9463 17.2531C18.0267 17.3335 18.0752 17.4356 18.0752 17.5998C18.0752 17.7641 18.0267 17.8661 17.9463 17.9465C17.8659 18.0269 17.7639 18.0754 17.5996 18.0754C17.4355 18.0753 17.3333 18.0268 17.2529 17.9465L12.3535 13.0461L12 12.6926L6.74609 17.9465C6.66571 18.0268 6.56362 18.0754 6.39941 18.0754C6.23551 18.0753 6.13402 18.0267 6.05371 17.9465C5.97331 17.8661 5.9248 17.7641 5.9248 17.5998C5.92484 17.4356 5.97334 17.3335 6.05371 17.2531L11.3066 12.0002L10.9531 11.6467L6.05371 6.74628C5.97331 6.66587 5.9248 6.56387 5.9248 6.3996C5.92488 6.23556 5.97337 6.13423 6.05371 6.05389C6.13405 5.97356 6.23537 5.92506 6.39941 5.92499C6.56368 5.92499 6.66569 5.97349 6.74609 6.05389L11.6465 10.9533L12 11.3068L17.2529 6.05389C17.3333 5.97352 17.4355 5.92503 17.5996 5.92499Z"
        fill="currentColor"
        stroke="currentColor"
      />
    </svg>
  );
}

function isActiveLink(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  if (href === '/stories') {
    return pathname.startsWith('/stories');
  }

  return pathname === href;
}

export default function BurgerMenu({
  isOpen,
  links,
  user,
  newStoryPath,
  onClose,
  onLogout,
}: BurgerMenuProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const desktopMedia = window.matchMedia('(min-width: 1440px)');

    const handleResize = (event: MediaQueryListEvent) => {
      if (event.matches) {
        onClose();
      }
    };

    desktopMedia.addEventListener('change', handleResize);

    return () => {
      desktopMedia.removeEventListener('change', handleResize);
    };
  }, [isOpen, onClose]);

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.25 };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="burger-menu"
          className={css.overlay}
          role="dialog"
          aria-modal="true"
          aria-label="Навігаційне меню"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={transition}
        >
          <div className={css.menuHeader}>
            <div className={css.logoWrapper}>
              <Logo />
            </div>

            <div className={css.tabletActions}>
              {user ? (
                <Link
                  href={newStoryPath}
                  className={css.publishButton}
                  onClick={onClose}
                >
                  Опублікувати статтю
                </Link>
              ) : (
                <AuthBar onNavigate={onClose} />
              )}
            </div>

            <button
              type="button"
              className={css.closeButton}
              aria-label="Закрити меню"
              onClick={onClose}
            >
              <CloseIcon />
            </button>
          </div>

          <motion.nav
            className={css.navigation}
            aria-label="Навігація в меню"
            initial={reduceMotion ? undefined : { y: -16 }}
            animate={{ y: 0 }}
            exit={reduceMotion ? undefined : { y: -16 }}
            transition={transition}
          >
            <ul className={css.linkList}>
              {links.map(link => {
                const active = isActiveLink(pathname, link.href);

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`${css.link} ${active ? css.activeLink : ''}`}
                      aria-current={active ? 'page' : undefined}
                      onClick={onClose}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.nav>

          <div className={css.menuFooter}>
            {user ? (
              <>
                <Link
                  href={newStoryPath}
                  className={`${css.publishButton} ${css.mobilePublishButton}`}
                  onClick={onClose}
                >
                  Опублікувати статтю
                </Link>

                <UserBar user={user} onLogout={onLogout} />
              </>
            ) : (
              <div className={css.mobileAuthBar}>
                <AuthBar onNavigate={onClose} />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
