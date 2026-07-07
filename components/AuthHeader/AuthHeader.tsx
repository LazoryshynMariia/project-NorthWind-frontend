import Image from 'next/image';
import Link from 'next/link';

import styles from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo.svg"
            alt="Природні Мандри"
            width={124}
            height={36}
            priority
          />
        </Link>
      </div>
    </header>
  );
}