import ProfileEditForm from '@/components/ProfileEditForm/ProfileEditForm';

import styles from './page.module.css';

export default function ProfileEditPage() {
  return (
    <main className={styles.page}>
      <section className={styles.content} aria-label="Форма редагування профілю">
        <ProfileEditForm />
      </section>
    </main>
  );
}
