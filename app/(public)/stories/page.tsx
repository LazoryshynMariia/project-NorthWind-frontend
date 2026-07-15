import type { Metadata } from 'next';

import PageTitle from '@/components/PageTitle/PageTitle';
import StoriesPageContent from '@/components/StoriesPageContent/StoriesPageContent';
import { getCategories } from '@/lib/api/categoriesApi';
import { getStories } from '@/lib/api/storiesApi';
import type { PaginatedResponse } from '@/types/api';
import type { Story } from '@/types';

import css from './StoriesPage.module.css';

export const metadata: Metadata = {
  title: 'Статті',
  description: 'Статті та історії мандрівників',
};

const STORIES_PER_PAGE = 9;

const EMPTY_STORIES_PAGE: PaginatedResponse<Story> = {
  data: [],
  page: 1,
  perPage: STORIES_PER_PAGE,
  totalItems: 0,
  totalPages: 1,
};

export default async function StoriesPage() {
  const [storiesPage, categories] = await Promise.all([
    getStories({ page: 1, perPage: STORIES_PER_PAGE }).catch(
      () => EMPTY_STORIES_PAGE
    ),
    getCategories().catch(() => []),
  ]);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.titleWrap}>
          <PageTitle title="Статті" />
        </div>

        <StoriesPageContent
          categories={categories}
          initialStoriesPage={storiesPage}
          perPage={STORIES_PER_PAGE}
        />
      </div>
    </section>
  );
}
