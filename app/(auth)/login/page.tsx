<<<<<<< HEAD
import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
=======
import AuthFooter from '@/components/AuthFooter/AuthFooter';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
>>>>>>> origin/main
import LoginForm from '@/components/LoginForm/LoginForm';

import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
<<<<<<< HEAD
        <Header />
=======
        <AuthHeader />
>>>>>>> origin/main

        <section className={styles.content} aria-label="Форма входу">
          <LoginForm />
        </section>

<<<<<<< HEAD
        <Footer />
=======
        <AuthFooter />
>>>>>>> origin/main
      </div>
    </main>
  );
}
