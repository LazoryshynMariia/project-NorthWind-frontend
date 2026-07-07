import Link from 'next/link';

import styles from './Logo.module.css';

const Logo = () => {
  return (
    <Link href="/" className={styles.logo} aria-label="Природні Мандри — на головну">
      <span className={styles.icon} aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="11" stroke="currentColor" strokeWidth="1.5" />
          <path
            d="M7 15c0-4 3-7 9-7 0 6-3 9-7 9-1 0-2 0-2-2Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M8 16c2-3 4-4.5 6-5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </span>
      <span className={styles.text}>
        Природні
        <br />
        Мандри
      </span>
    </Link>
  );
};

export default Logo;
