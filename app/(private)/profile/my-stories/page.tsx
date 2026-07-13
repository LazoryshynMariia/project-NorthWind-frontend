'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { getMe } from '@/lib/api/usersApi';
import { getStoriesByAuthor } from '@/lib/api/storiesApi';
import type { Story } from '@/types';

export default function MyStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [ownerName, setOwnerName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getMe()
      .then(me => {
        setOwnerName(me.name);
        return getStoriesByAuthor(me._id);
      })
      .then(response => setStories(response.data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <p>Не вдалося завантажити ваші історії</p>;

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю історією"
        buttonText="Опублікувати статтю"
        linkTo="/new-story"
      />
    );
  }

  return <TravellersStories initialStories={stories} ownerName={ownerName} />;
}
