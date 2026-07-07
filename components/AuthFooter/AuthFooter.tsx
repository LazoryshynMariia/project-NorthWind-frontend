import styles from './AuthFooter.module.css';

export default function AuthFooter() {
  return (
    <footer className={styles.footer}>
      <span className={styles.mobileText}>© 2025 Подорожники</span>
      <span className={styles.desktopText}>© 2025 Природні Мандри</span>
    </footer>
  );
}
