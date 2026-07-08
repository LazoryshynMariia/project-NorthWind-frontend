// import AuthHeader from '@/components/AuthHeader/AuthHeader';
import MainAuthNav from '@/components/MainAuthNav/MainAuthNav';
import AuthFooter from '@/components/AuthFooter/AuthFooter';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import styles from './RegisterPage.module.css';

export default function RegisterPage() {
  return (
    <main className={styles.registerPageContainer}>
      <div className={styles.container}>
        {/* <AuthHeader /> */}
        <MainAuthNav />
        <RegistrationForm />
        <AuthFooter />
      </div>
    </main>
  );
}
