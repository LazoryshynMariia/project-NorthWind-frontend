import type { Metadata } from 'next';
// import PageTitle from '@/components/PageTitle/PageTitle';
import TravellersList from '@/components/TravellersList/TravellersList';
import css from './TravellersPage.module.css';
// import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: 'Мандрівники',
  description: 'Список зареєстрованих мандрівників',
};

export default function TravellersPage() {
  return (
    <>
      {/* <Header /> */}
      <main className={css.page}>
        <section className={css.section}>
          <div className={css.container}>
            {/* Замінити після створення головного компоненту */}

            <h1 className={css.title}>Мандрівники</h1>

            {/* <PageTitle title="Мандрівники" /> */}
            <TravellersList />
          </div>
        </section>
      </main>
    </>
  );
}
