'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import css from './ProfileTabs.module.css';

const tabs = [
  { href: '/profile/saved', label: 'Збережені історії' },
  { href: '/profile/my-stories', label: 'Мої історії' },
];

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <nav className={css.track} aria-label="Історії користувача">
      {tabs.map(({ href, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`${css.tab} ${isActive ? css.active : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
