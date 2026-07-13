import Image from 'next/image';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import PageTitle from '@/components/PageTitle/PageTitle';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { getTravellerById, getTravellerStories } from '@/lib/api/travellersApi';
import css from './TravellerPage.module.css';

const STORIES_PER_PAGE = 6;

interface Props {
  params: Promise<{ travellerId: string }>;
}

export default async function TravellerPage({ params }: Props) {
  const { travellerId } = await params;
  const traveller = await getTravellerById(travellerId);

  if (!traveller) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <p className={css.notFound}>Такий користувач відсутній</p>
        </div>
      </section>
    );
  }

  const storiesPage = await getTravellerStories(
    travellerId,
    1,
    STORIES_PER_PAGE
  );
  const stories = storiesPage?.data ?? [];

  return (
    <>
      <section className={css.headerSection}>
        <div className={`${css.container} ${css.profile}`}>
          <Image
            className={css.avatar}
            src={traveller.avatarUrl || '/placeholder-avatar.svg'}
            alt={traveller.name}
            width={145}
            height={145}
            unoptimized
          />
          <TravellerInfo
            name={traveller.name}
            articlesAmount={traveller.articlesAmount}
          />
        </div>
      </section>
      <section className={css.section}>
        <div className={`${css.container} ${css.blog}`}>
          <PageTitle title="Статті Мандрівника" />
          {stories.length > 0 ? (
            <TravellersStories
              initialStories={stories}
              ownerName={traveller.name}
              author={travellerId}
              perPage={STORIES_PER_PAGE}
              totalPages={storiesPage?.totalPages ?? 1}
            />
          ) : (
            <MessageNoStories
              text="Цей користувач ще не публікував історій"
              buttonText="Назад до історій"
              linkTo="/stories"
            />
          )}
        </div>
      </section>
    </>
  );
}
