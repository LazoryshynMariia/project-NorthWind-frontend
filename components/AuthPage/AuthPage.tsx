import Image from 'next/image';
import Link from 'next/link';

import LoginForm from '../LoginForm/LoginForm';

import styles from './AuthPage.module.css';

export default function AuthPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Природні Мандри"
            width={86}
            height={36}
            priority
          />
        </Link>
      </header>

      <section className={styles.content}>
        <div className={styles.card}>

          <nav className={styles.tabs}>
            <Link href="/register" className={styles.tab}>
              Реєстрація
            </Link>

            <Link href="/login" className={styles.active}>
              Вхід
            </Link>
          </nav>

          <h1 className={styles.title}>Вхід</h1>

          <p className={styles.subtitle}>
            Вітаємо знову у спільноті мандрівників!
          </p>

          <LoginForm />

        </div>
      </section>

      <footer className={styles.footer}>
        © 2025 Природні Мандри
      </footer>
    </main>
  );
}