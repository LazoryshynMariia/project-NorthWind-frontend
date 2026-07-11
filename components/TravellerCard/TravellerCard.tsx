import Image from 'next/image';
import Link from 'next/link';
import TravellerInfo from '@/components/TravellerInfo/TravellerInfo';
import type { Traveller } from '@/types/traveller';
import css from './TravellerCard.module.css';

interface TravellerCardProps {
  traveller: Traveller;
}

export default function TravellerCard({ traveller }: TravellerCardProps) {
  if (!traveller.avatarUrl) {
    return null;
  }
  const avatarSrc = traveller.avatarUrl;

  return (
    <li className={css.card}>
      <Image
        className={css.avatar}
        src={avatarSrc}
        alt={traveller.name}
        width={130}
        height={130}
      />

      <TravellerInfo
        name={traveller.name}
        articlesAmount={traveller.articlesAmount}
      />

      <Link className={css.link} href={`/travellers/${traveller._id}`}>
        Переглянути профіль
      </Link>
    </li>
  );
}
