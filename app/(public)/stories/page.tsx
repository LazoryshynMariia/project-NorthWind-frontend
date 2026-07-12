import type { Metadata } from 'next';

import CategoriesFilter from '@/components/CategoriesFilter/CategoriesFilter';
import PageTitle from '@/components/PageTitle/PageTitle';
import TravellersStories from '@/components/TravellersStories/TravellersStories';

import css from './StoriesPage.module.css';

export const metadata: Metadata = {
  title: 'Статті | NorthWind',
  description: 'Історії, маршрути та поради для мандрівок Україною.',
};

export default function StoriesPage() {
  return (
    <main className={css.main}>
      <PageTitle>Статті</PageTitle>
      <CategoriesFilter />
      <TravellersStories />
    </main>
  );
}
