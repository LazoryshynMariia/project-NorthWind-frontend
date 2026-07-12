'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MainAuthNav.module.css';

export default function MainAuthNav() {
  const pathname = usePathname();

  return (
    <div className={styles.nav}>
      <Link
        href="/register"
        className={`${styles.navLink} ${pathname === '/register' ? styles.activeLink : ''}`}
      >
        Реєстрація
      </Link>
      <Link
        href="/login"
        className={`${styles.navLink} ${pathname === '/login' ? styles.activeLink : ''}`}
      >
        Вхід
      </Link>
    </div>
  );
}
