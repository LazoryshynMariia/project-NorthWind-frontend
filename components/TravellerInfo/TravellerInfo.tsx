import css from './TravellerInfo.module.css';

// temporary stub, real component is another task
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
      <p className={css.amount}>Статей: {articlesAmount}</p>
    </div>
  );
}
