import AuthHeader from '@/components/AuthHeader/AuthHeader';
import MainAuthNav from '@/components/MainAuthNav/MainAuthNav';
import AuthFooter from '@/components/AuthFooter/AuthFooter';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';

export default function RegisterPage() {
  return (
    <div>
      <AuthHeader />
      <main>
        <MainAuthNav />
        <RegistrationForm />
      </main>
      <AuthFooter />
    </div>
  );
}
