import Image from 'next/image';
import Link from 'next/link';

import { getStoryById } from '@/lib/api/storiesApi';

import css from './StoryDetails.module.css';

type StoryDetailsProps = {
  storyId: string;
};

function formatDate(date: string): string {
  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return date;
  }

  return new Intl.DateTimeFormat('uk-UA', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(parsedDate);
}

export default async function StoryDetails({ storyId }: StoryDetailsProps) {
  const story = await getStoryById(storyId);

  if (!story) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <Link className={css.backLink} href="/stories">
            ← Всі статті
          </Link>

          <p>Така історія відсутня</p>
        </div>
      </section>
    );
  }

  const categoryName =
    typeof story.category === 'object'
      ? story.category.category
      : story.category;

  const paragraphs = story.article
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.top}>
          <div className={css.info}>
            <Link className={css.backLink} href="/stories">
              ← Всі статті
            </Link>

            <h1 className={css.title}>{story.title}</h1>

            <div className={css.meta}>
              <p>
                <strong>Автор статті</strong> Мандрівник
              </p>

              <p>
                <strong>Опубліковано</strong> {formatDate(story.date)}
              </p>

              {categoryName && (
                <p>
                  <strong>{categoryName}</strong>
                </p>
              )}
            </div>
          </div>

          <div className={css.imageWrapper}>
            <Image
              className={css.image}
              src={story.img}
              alt={story.title}
              fill
              priority
              unoptimized
              sizes="(min-width: 1440px) 755px, 100vw"
            />
          </div>
        </div>

        <div className={css.article}>
          {paragraphs.map((paragraph, index) => (
            <p key={`${story._id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
