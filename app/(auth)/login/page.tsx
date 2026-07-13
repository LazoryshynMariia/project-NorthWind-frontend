import AuthFooter from '@/components/AuthFooter/AuthFooter';
import AuthHeader from '@/components/AuthHeader/AuthHeader';
import LoginForm from '@/components/LoginForm/LoginForm';

import styles from './page.module.css';

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <AuthHeader />

        <section className={styles.content} aria-label="Форма входу">
          <LoginForm />
        </section>

        <AuthFooter />
      </div>
    </main>
  );
}
