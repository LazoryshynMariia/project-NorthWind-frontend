import Link from 'next/link';

import styles from './FooterNav.module.css';

const links = [
  { label: 'Головна', href: '/' },
  { label: 'Статті', href: '/stories' },
  { label: 'Еко-Мандрівники', href: '/travellers' },
];

const FooterNav = () => {
  return (
    <nav aria-label="Навігація у футері">
      <ul className={styles.list}>
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link href={href} className={styles.link}>
              <span className={styles.linkText}>{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default FooterNav;
