import Image from 'next/image';
import ProfileTabs from '@/components/ProfileTabs/ProfileTabs';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import { getCurrentUser } from '@/lib/mock-api';
import css from './ProfilePage.module.css';

// user info and tabs are shared between both tabs,
// so they live in the layout and only the list below changes.
// route protection comes from the (private) group layout
export default async function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const user = await getCurrentUser();

  return (
    <>
      <section className={css.headerSection}>
        <div className={`${css.container} ${css.profile}`}>
          <Image
            className={css.avatar}
            src={user.avatarUrl || '/placeholder-avatar.svg'}
            alt={user.name}
            width={145}
            height={145}
            unoptimized
          />
          <TravellerInfo
            name={user.name}
            articlesAmount={user.articlesAmount}
          />
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
