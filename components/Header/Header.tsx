'use client';

import { useCallback, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import AuthBar from '@/components/AuthBar/AuthBar';
import BurgerMenu, {
  type BurgerLink,
} from '@/components/BurgerMenu/BurgerMenu';
import Logo from '@/components/Logo/Logo';
import UserBar from '@/components/UserBar/UserBar';
import { useAuthStore } from '@/lib/store/authStore';
import { logout } from '@/lib/api/auth';

import css from './Header.module.css';

const newStoryPath = '/new-story';

const publicLinks: BurgerLink[] = [
  { label: 'Головна', href: '/' },
  { label: 'Статті', href: '/stories' },
  {
    label: 'Еко-Мандрівники',
    href: '/travellers',
  },
];

const privateLinks: BurgerLink[] = [
  {
    label: 'Мій Профіль',
    href: '/profile',
  },
];

const authPages = ['/login', '/register'];

function isActiveLink(pathname: string, href: string) {
  if (href === '/') {
    return pathname === '/';
  }

  if (href === '/stories') {
    return pathname.startsWith('/stories');
  }

  return pathname === href;
}

function BurgerIcon() {
  return (
    <svg
      width="19"
      height="13"
      viewBox="0 0 19 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0.85175 12.4425C0.61125 12.4425 0.409167 12.3602 0.2455 12.1957C0.0818333 12.0312 0 11.8262 0 11.5805C0 11.3388 0.0818333 11.1372 0.2455 10.9755C0.409167 10.814 0.61125 10.7332 0.85175 10.7332H17.4472C17.6877 10.7332 17.8908 10.8155 18.0565 10.98C18.2222 11.1445 18.305 11.3476 18.305 11.5892C18.305 11.8349 18.2222 12.0385 18.0565 12.2C17.8908 12.3617 17.6877 12.4425 17.4472 12.4425H0.85175ZM0.85175 7.073C0.61125 7.073 0.409167 6.99067 0.2455 6.826C0.0818333 6.6615 0 6.45842 0 6.21675C0 5.97525 0.0818333 5.77367 0.2455 5.612C0.409167 5.45033 0.61125 5.3695 0.85175 5.3695H17.4472C17.6877 5.3695 17.8908 5.45183 18.0565 5.6165C18.2222 5.781 18.305 5.98408 18.305 6.22575C18.305 6.46725 18.2222 6.66883 18.0565 6.8305C17.8908 6.99217 17.6877 7.073 17.4472 7.073H0.85175ZM0.85175 1.70925C0.61125 1.70925 0.409167 1.627 0.2455 1.4625C0.0818333 1.298 0 1.09292 0 0.847249C0 0.605582 0.0818333 0.403999 0.2455 0.242499C0.409167 0.0808321 0.61125 0 0.85175 0H17.4472C17.6877 0 17.8908 0.0822499 18.0565 0.24675C18.2222 0.41125 18.305 0.614333 18.305 0.856C18.305 1.10167 18.2222 1.30533 18.0565 1.467C17.8908 1.6285 17.6877 1.70925 17.4472 1.70925H0.85175Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const user = useAuthStore(state => state.user);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);

  const clearAuth = useAuthStore(state => state.clearAuth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthPage = authPages.includes(pathname);

  const currentUser = isAuthenticated && user ? user : null;

  const links = currentUser ? [...publicLinks, ...privateLinks] : publicLinks;

  const closeMenu = useCallback(() => {
    setIsMenuOpen(false);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      clearAuth();
      closeMenu();
      router.replace('/');
    }
  };

  return (
    <>
      <header className={`${css.header} ${isAuthPage ? css.authHeader : ''}`}>
        <div className={css.content}>
          <div className={css.logoWrapper}>
            <Logo />
          </div>

          {!isAuthPage && !isCheckingAuth && (
            <>
              <div className={css.desktopContent}>
                <nav className={css.navigation} aria-label="Основна навігація">
                  {links.map(link => {
                    const active = isActiveLink(pathname, link.href);

                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`${css.navLink} ${
                          active ? css.activeNavLink : ''
                        }`}
                        aria-current={active ? 'page' : undefined}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                <div className={css.desktopActions}>
                  {currentUser ? (
                    <>
                      <Link href={newStoryPath} className={css.publishButton}>
                        Опублікувати статтю
                      </Link>

                      <UserBar user={currentUser} onLogout={handleLogout} />
                    </>
                  ) : (
                    <AuthBar />
                  )}
                </div>
              </div>

              <div className={css.tabletActions}>
                {currentUser ? (
                  <Link href={newStoryPath} className={css.publishButton}>
                    Опублікувати статтю
                  </Link>
                ) : (
                  <AuthBar />
                )}
              </div>

              <button
                type="button"
                className={css.burgerButton}
                aria-label="Відкрити меню"
                aria-expanded={isMenuOpen}
                aria-controls="burger-menu"
                onClick={() => setIsMenuOpen(true)}
              >
                <BurgerIcon />
              </button>
            </>
          )}
        </div>
      </header>

      <BurgerMenu
        isOpen={isMenuOpen}
        links={links}
        user={currentUser}
        newStoryPath={newStoryPath}
        onClose={closeMenu}
        onLogout={handleLogout}
      />
    </>
  );
}
