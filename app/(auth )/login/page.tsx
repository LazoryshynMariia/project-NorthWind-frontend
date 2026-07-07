import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import LoginForm from '@/components/LoginForm/LoginForm';

import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Header />

        <section className={styles.content} aria-label="Форма входу">
          <LoginForm />
        </section>

        <Footer />
      </div>
    </main>
  );
}
