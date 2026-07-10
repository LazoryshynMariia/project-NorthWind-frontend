import Image from 'next/image';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import PageTitle from '@/components/PageTitle/PageTitle';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import type { Story, Traveller } from '@/types';
import css from './TravellerPage.module.css';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

// TODO: move fetch functions to services/travellers.ts after PR #94 is merged
async function getTravellerById(id: string): Promise<Traveller | null> {
  const response = await fetch(`${API_URL}/users/travellers/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    return null;
  }

  const result = await response.json();
  return result.data;
}

async function getTravellerStories(id: string): Promise<Story[]> {
  const response = await fetch(
    `${API_URL}/stories?author=${id}&page=1&perPage=6`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    return [];
  }

  const result = await response.json();
  return result.data ?? [];
}

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

  const stories = await getTravellerStories(travellerId);

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
            <TravellersStories stories={stories} ownerName={traveller.name} />
          ) : (
            <MessageNoStories
              message="Цей користувач ще не публікував історій"
              buttonText="Назад до історій"
              buttonHref="/stories"
            />
          )}
        </div>
      </section>
    </>
  );
}
