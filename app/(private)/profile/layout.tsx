import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';
import ProfileHeader from './ProfileHeader';
import css from './ProfilePage.module.css';

// header and tabs are shared between both tabs, lists live in nested routes.
// route protection comes from the (private) group layout
export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <section className={css.headerSection}>
        <div className={css.container}>
          <ProfileHeader />
        </div>
      </section>
      <section className={css.section}>
        <div className={`${css.container} ${css.content}`}>
          <ProfileTabs />
          {children}
        </div>
      </section>
    </>
  );
}
