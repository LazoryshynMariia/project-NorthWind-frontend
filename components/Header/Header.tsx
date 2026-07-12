
import { FC, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { RxHamburgerMenu } from 'react-icons/rx';

import Logo from '@/components/Logo/Logo';
import AuthBar from '@/components/AuthBar/AuthBar';
import UserBar from '@/components/UserBar/UserBar';
import BurgerMenu from '@/components/BurgerMenu/BurgerMenu';

import type { AuthUser } from '@/lib/api/auth';

import css from './Header.module.css';

interface LinkItem {
  href: string;
  label: string;
}

interface HeaderProps {
  isAuthenticated: boolean;
  user?: AuthUser;
  onOpenLogin: () => void;
  onOpenRegister: () => void;
  onLogout: () => Promise<void> | void;
}

const publicLinks: LinkItem[] = [
  { href: '/', label: 'Головна' },
  { href: '/articles', label: 'Статті' },
  { href: '/travelers', label: 'Еко-Мандрівники' },
];

const privateLinks: LinkItem[] = [
  { href: '/profile', label: 'Мій профіль' },
  { href: '/articles/create', label: 'Опублікувати статтю' },
];

const Header: FC<HeaderProps> = ({
  isAuthenticated,
  user,
  onOpenLogin,
  onOpenRegister,
  onLogout,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

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

  const burgerLinks = isAuthenticated
    ? [...publicLinks, ...privateLinks]
    : publicLinks;

  return (
    <header ref={headerRef} className={css.header}>
      <div className={css.container}>
        <Logo />

        <nav className={css.navigation}>
          {publicLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={css.link}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated &&
            privateLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={css.link}
              >
                {link.label}
              </Link>
            ))}
        </nav>

        <div className={css.actions}>
          {isAuthenticated && user ? (
            <UserBar
              user={user}
              onLogout={onLogout}
            />
          ) : (
            <AuthBar
              onOpenLogin={onOpenLogin}
              onOpenRegister={onOpenRegister}
            />
          )}
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

      <BurgerMenu
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        user={user}
        links={burgerLinks}
        onOpenLogin={onOpenLogin}
        onOpenRegister={onOpenRegister}
        onLogout={onLogout}
      />
    </header>
  );
};

export default Header;