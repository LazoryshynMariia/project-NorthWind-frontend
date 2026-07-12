import Image from 'next/image';
import Link from 'next/link';

import { stories } from '@/data/story';

import css from './StoryDetails.module.css';

type StoryDetailsProps = {
  storyId: string;
};

export default function StoryDetails({ storyId }: StoryDetailsProps) {
  const story = stories.find(item => item.id === storyId);

  if (!story) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <p>Така історія відсутня</p>
        </div>
      </section>
    );
  }

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
                <strong>Автор статті</strong> {story.author}
              </p>

              <p>
                <strong>Опубліковано</strong> {story.publishedAt}
              </p>

              <p>
                <strong>{story.category}</strong>
              </p>
            </div>
          </div>

          <div className={css.imageWrapper}>
            <Image
              className={css.image}
              src={story.image}
              alt={story.title}
              fill
              priority
              sizes="(min-width: 1440px) 755px, 100vw"
            />
          </div>
        </div>

        <div className={css.article}>
          {story.content.map((paragraph, index) => (
            <p key={`${story.id}-${index}`}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
