'use client';
import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';
import Logo from '@/components/Logo/Logo';
import AuthBar from '@/components/AuthBar/AuthBar';
import UserBar from '@/components/UserBar/UserBar';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import type { AuthUser } from '@/types/auth';
import css from './Header.module.css';

interface LinkItem {
  href: string;
  label: string;
}

interface HeaderProps {
  isAuthenticated: boolean;
  user?: AuthUser;
  onLogout: () => Promise<void> | void;
}

const publicLinks: LinkItem[] = [
  { label: 'Головна', href: '/' },
  { label: 'Статті', href: '/stories' },
  { label: 'Еко-Мандрівники', href: '/travellers' },
];

const privateLinks: LinkItem[] = [
  { href: '/profile', label: 'Мій профіль' },
];

const Header: FC<HeaderProps> = ({ isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  const links = isAuthenticated
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        '--header-height',
        `${header.offsetHeight}px`
      );
    };

    updateHeaderHeight();
    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    return () => resizeObserver.disconnect();
  }, []);

  return (
    <>
      <header ref={headerRef} className={css.header}>
        <div className={css.content}>
          <Logo />
          <div className={css.rightGroup}>
            <nav className={css.navigation}>
              {publicLinks.map((link) => (
                <Link key={link.href} href={link.href} className={css.navLink}>
                  {link.label}
                </Link>
              ))}
              {isAuthenticated &&
                privateLinks.map((link) => (
                  <Link key={link.href} href={link.href} className={css.navLink}>
                    {link.label}
                  </Link>
                ))}
            </nav>

            <div className={css.actions}>
              <ThemeToggle />
              {isAuthenticated && user ? (
                <>
                  <Link href="/articles/create" className={css.publishButton}>
                    Опублікувати статтю
                  </Link>
                  <UserBar user={user} onLogout={onLogout} />
                </>
              ) : (
                <AuthBar />
              )}
            </div>
          </div>

          <button
            type="button"
            className={css.burgerButton}
            aria-label="Відкрити меню"
            onClick={() => setIsMenuOpen(true)}
          >
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </header>

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        links={links}
        isAuthenticated={isAuthenticated}
        user={user}
        onLogout={onLogout}
      />
    </>
  );
};

export default Header;
