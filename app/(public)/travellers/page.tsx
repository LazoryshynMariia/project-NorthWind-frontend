import type { Metadata } from 'next';
import PageTitle from '@/components/PageTitle/PageTitle';
import TravellersList from '@/components/TravellersList/TravellersList';
import css from './TravellersPage.module.css';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description: 'Список зареєстрованих мандрівників',
};

export default function TravellersPage() {
  return (
    <main className={css.page}>
      <section className={css.section}>
        <div className={css.container}>
          <PageTitle>Мандрівники</PageTitle>
          <TravellersList />
        </div>
      </section>
    </main>
  );
}
