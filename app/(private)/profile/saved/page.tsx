'use client';

import { useEffect, useState } from 'react';
import Loader from '@/components/Loader/Loader';
import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { getSavedStories } from '@/lib/api/savedStoriesApi';
import type { Story } from '@/types';

export default function SavedStoriesPage() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getSavedStories()
      .then(response => setStories(response.data))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <Loader />;
  if (isError) return <p>Не вдалося завантажити збережені історії</p>;

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="У вас ще немає збережених історій, мерщій додавати!"
        buttonText="До історій"
        linkTo="/stories"
      />
    );
  }

  return <TravellersStories initialStories={stories} />;
}
