import Link from 'next/link';
import TravellerCard from '@/components/TravellerCard/TravellerCard';
import type { Traveller } from '@/types/traveller';
import css from './OurTravellers.module.css';

interface OurTravellersProps {
  travellers: Traveller[];
}

export default function OurTravellers({ travellers }: OurTravellersProps) {
  const visibleTravellers = travellers.slice(0, 4);

  return (
    <section className={css.section}>
      <div className={css.header}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <Link href="/travellers" className={css.topLink}>
          Всі мандрівники
        </Link>
      </div>

      <ul className={css.list}>
        {visibleTravellers.map(traveller => (
          <TravellerCard key={traveller._id} traveller={traveller} />
        ))}
      </ul>

      <div className={css.controls}>
        <button type="button" className={css.arrow} disabled>
          ←
        </button>

        <button type="button" className={css.arrow} disabled>
          →
        </button>
      </div>

      <Link href="/travellers" className={css.bottomLink}>
        Всі мандрівники
      </Link>
    </section>
  );
}
