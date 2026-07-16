import Logo from '@/components/Logo/Logo';
import SocialList from '@/components/SocialList/SocialList';
import FooterNav from '@/components/FooterNav/FooterNav';
import Copyright from '@/components/Copyright/Copyright';
import ThemeToggle from '@/components/ThemeToggle/ThemeToggle';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.logoBox}>
            <Logo />
          </div>
          <div className={styles.socialBox}>
            <SocialList />
            <ThemeToggle />
          </div>
          <div className={styles.navBox}>
            <FooterNav />
          </div>
        </div>
        <div className={styles.bottom}>
          <hr className={styles.divider} />
          <div className={styles.copyrightRow}>
            <Copyright />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
