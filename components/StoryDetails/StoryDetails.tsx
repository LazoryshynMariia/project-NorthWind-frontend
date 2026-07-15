import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { getCategories } from '@/lib/api/categoriesApi';
import { getTravellerById } from '@/lib/api/travellersApi';
import type { Story } from '@/types';

import css from './StoryDetails.module.css';

type StoryDetailsProps = {
  story: Story | null;
  children?: ReactNode;
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

async function getCategoryName(category: Story['category']): Promise<string> {
  if (typeof category === 'object') {
    return category.category;
  }

  const categories = await getCategories().catch(() => []);
  return categories.find(item => item._id === category)?.category ?? '';
}

async function getAuthorName(ownerId: Story['ownerId']): Promise<string> {
  if (typeof ownerId === 'object') {
    return ownerId.name;
  }

  const author = await getTravellerById(ownerId);
  return author?.name ?? 'Мандрівник';
}

export default async function StoryDetails({ story, children }: StoryDetailsProps) {
  if (!story) {
    return (
      <section className={css.section}>
        <div className={css.container}>
          <Link className={css.backLink} href="/stories">
            <span className={css.backIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" focusable="false">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </span>
            Всі статті
          </Link>

          <p>Така історія відсутня</p>
        </div>
      </section>
    );
  }

  const [authorName, categoryName] = await Promise.all([
    getAuthorName(story.ownerId),
    getCategoryName(story.category),
  ]);

  const paragraphs = story.article
    .split(/\n+/)
    .map(paragraph => paragraph.trim())
    .filter(Boolean);

  return (
    <>
      <section className={css.section}>
        <div className={css.container}>
          <div className={css.top}>
            <div className={css.info}>
              <Link className={css.backLink} href="/stories">
                <span className={css.backIcon} aria-hidden="true">
                  <svg viewBox="0 0 24 24" focusable="false">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </span>
                Всі статті
              </Link>

              <h1 className={css.title}>{story.title}</h1>

              <div className={css.meta}>
                <p>
                  <strong>Автор статті</strong> {authorName}
                </p>

                <p>
                  <strong>Опубліковано</strong> {formatDate(story.date)}
                </p>

                {categoryName && (
                  <p className={css.categoryTag}>
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
        </div>
      </section>

      <section className={css.contentSection}>
        <div className={css.contentContainer}>
          <div className={css.article}>
            {paragraphs.map((paragraph, index) => (
              <p key={`${story._id}-${index}`}>{paragraph}</p>
            ))}
          </div>

          {children}
        </div>
      </section>
    </>
  );
}
