import Image from 'next/image';
import Link from 'next/link';

import css from './StoryCard.module.css';

type StoryCardProps = {
  id: string;
  title: string;
  image: string;
  author: string;
  readingTime: string;
};

type BookmarkIconProps = {
  size?: number;
};

function BookmarkIcon({ size = 20 }: BookmarkIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M6 4.75C6 3.7835 6.7835 3 7.75 3H16.25C17.2165 3 18 3.7835 18 4.75V20L12 16.5L6 20V4.75Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function StoryCard({
  id,
  title,
  image,
  author,
  readingTime,
}: StoryCardProps) {
  return (
    <article className={css.card}>
      <div className={css.imageWrapper}>
        <Image
          className={css.image}
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1440px) 421px, (min-width: 768px) 344px, 100vw"
        />
      </div>

      <div className={css.content}>
        <div className={css.meta}>
          <span className={css.author}>{author}</span>

          <span className={css.dot} aria-hidden="true">
            •
          </span>

          <span className={css.readingTime}>{readingTime}</span>

          <span className={css.metaBookmark}>
            <BookmarkIcon size={14} />
          </span>
        </div>

        <h2 className={css.title}>{title}</h2>

        <div className={css.actions}>
          <Link className={css.link} href={`/stories/${id}`}>
            Переглянути статтю
          </Link>

          <button
            className={css.saveButton}
            type="button"
            aria-label={`Зберегти статтю «${title}»`}
          >
            <BookmarkIcon size={20} />
          </button>
        </div>
      </div>
    </article>
  );
}
