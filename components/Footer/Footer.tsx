import Logo from '@/components/Logo/Logo';
import SocialList from '@/components/SocialList/SocialList';
import FooterNav from '@/components/FooterNav/FooterNav';
import Copyright from '@/components/Copyright/Copyright';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <Logo />
          <div className={styles.topRight}>
            <SocialList />
          </div>
        </div>

        <div className={styles.nav}>
          <FooterNav />
        </div>

        <hr className={styles.divider} />

        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
