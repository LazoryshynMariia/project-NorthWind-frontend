'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import Loader from '@/components/Loader/Loader';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { nextServer } from '@/lib/api/api';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';
import type { Category } from '@/types/categories';

import css from './StoriesPageContent.module.css';

type StoriesPageContentProps = {
  categories: Category[];
  initialStoriesPage: PaginatedResponse<Story>;
  perPage: number;
};

export default function StoriesPageContent({
  categories,
  initialStoriesPage,
  perPage,
}: StoriesPageContentProps) {
  const [activeCategory, setActiveCategory] = useState('');
  const [storiesPage, setStoriesPage] = useState(initialStoriesPage);
  const [isLoading, setIsLoading] = useState(false);

  const handleCategoryChange = async (categoryId: string) => {
    if (categoryId === activeCategory) return;

    setActiveCategory(categoryId);
    setIsLoading(true);

    try {
      const response = await nextServer.get<PaginatedResponse<Story>>(
        '/stories',
        {
          params: {
            page: 1,
            perPage,
            category: categoryId || undefined,
          },
        }
      );

      setStoriesPage(response.data);
    } catch {
      toast.error('Не вдалося завантажити статті');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <CategoriesFilter
        categories={categories}
        activeCategory={activeCategory}
        isLoading={isLoading}
        onChange={handleCategoryChange}
      />

      <div className={css.content} aria-busy={isLoading}>
        {isLoading ? (
          <Loader />
        ) : storiesPage.data.length > 0 ? (
          <TravellersStories
            key={activeCategory || 'all'}
            initialStories={storiesPage.data}
            category={activeCategory || undefined}
            perPage={perPage}
            totalPages={storiesPage.totalPages}
          />
        ) : (
          <p className={css.empty}>Статті поки відсутні</p>
        )}
      </div>
    </>
  );
}
