'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import { getMe } from '@/lib/api/usersApi';
import type { Traveller } from '@/types/traveller';
import css from './ProfilePage.module.css';

export default function ProfileHeader() {
  const [user, setUser] = useState<Traveller | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getMe()
      .then(setUser)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;
  if (isError || !user) {
    return <p className={css.error}>Не вдалося завантажити профіль</p>;
  }

  return (
    <div className={css.profile}>
      <Image
        className={css.avatar}
        src={user.avatarUrl || '/placeholder-avatar.svg'}
        alt={user.name}
        width={145}
        height={145}
        unoptimized
      />
      <TravellerInfo name={user.name} articlesAmount={user.articlesAmount} />
    </div>
  );
}
