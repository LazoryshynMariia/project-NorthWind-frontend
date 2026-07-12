import css from './TravellerInfo.module.css';

interface TravellerInfoProps {
  name: string;
  articlesAmount: number;
}

export default function TravellerInfo({
  name,
  articlesAmount,
}: TravellerInfoProps) {
  return (
    <div className={css.info}>
      <h2 className={css.name}>{name}</h2>
      <p className={css.articles}>Статей: {articlesAmount}</p>
    </div>
  );
}
