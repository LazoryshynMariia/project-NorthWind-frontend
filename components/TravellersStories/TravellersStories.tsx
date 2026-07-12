'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { nextServer } from '@/lib/api/api';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';
import StoryCard from '../StoryCard/StoryCard';
import css from './TravellersStories.module.css';

interface TravellersStoriesProps {
  initialStories: Story[];
  ownerName?: string;
  // if author is passed, the list can load more pages by this filter
  author?: string;
  perPage?: number;
  totalPages?: number;
}

export default function TravellersStories({
  initialStories,
  ownerName,
  author,
  perPage = 6,
  totalPages = 1,
}: TravellersStoriesProps) {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const hasNextPage = author ? page < totalPages : false;

  const handleLoadMore = async () => {
    setIsLoading(true);
    try {
      const nextPage = page + 1;
      const response = await nextServer.get<PaginatedResponse<Story>>(
        '/stories',
        { params: { author, page: nextPage, perPage } }
      );
      const firstNewIndex = stories.length;
      setStories(prev => [...prev, ...response.data.data]);
      setPage(nextPage);
      // scroll the freshly loaded portion to the top of the screen
      requestAnimationFrame(() => {
        const firstNewCard = listRef.current?.children[firstNewIndex];
        firstNewCard?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    } catch {
      toast.error('Не вдалося завантажити історії');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={css.wrapper}>
      <ul className={css.grid} ref={listRef}>
        {stories.map(story => (
          <li key={story._id}>
            <StoryCard story={story} ownerName={ownerName} />
          </li>
        ))}
      </ul>
      {hasNextPage && (
        // TODO: replace with the shared Pagination button from #44
        <button
          type="button"
          className={css.loadMore}
          onClick={handleLoadMore}
          disabled={isLoading}
        >
          {isLoading ? 'Завантаження...' : 'Показати ще'}
        </button>
      )}
    </div>
  );
}
