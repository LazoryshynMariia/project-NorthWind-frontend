import Link from 'next/link';
import css from './MessageNoStories.module.css';

// temporary stub, real component is another task
interface Props {
  message: string;
  buttonText: string;
  buttonHref: string;
}

export default function MessageNoStories({
  message,
  buttonText,
  buttonHref,
}: Props) {
  return (
    <div className={css.box}>
      <h2 className={css.message}>{message}</h2>
      <Link href={buttonHref} className={css.button}>
        {buttonText}
      </Link>
    </div>
  );
}
