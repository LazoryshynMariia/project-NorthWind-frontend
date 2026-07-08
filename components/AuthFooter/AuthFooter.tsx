import styles from './AuthFooter.module.css';

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className={styles.copyrightForm}>
      © {currentYear} Природні Мандри
    </footer>
  );
}
