import Image from 'next/image';
import type { Story } from '@/types';
import css from './StoryCard.module.css';

// temporary stub, real component is another task
interface StoryCardProps {
  story: Story;
  ownerName?: string;
}

export default function StoryCard({ story, ownerName }: StoryCardProps) {
  const categoryName =
    typeof story.category === 'object' ? story.category.category : '';

  return (
    <article className={css.card}>
      <Image
        className={css.photo}
        src={story.img}
        alt={story.title}
        width={422}
        height={422}
        unoptimized
      />
      <div className={css.content}>
        <div className={css.author}>
          <Image
            className={css.authorAvatar}
            src="/placeholder-avatar.svg"
            alt={ownerName || 'author'}
            width={48}
            height={48}
          />
          <div>
            <p className={css.authorName}>{ownerName}</p>
            <p className={css.meta}>
              {story.date.slice(0, 10)} • {story.rate} 🔖
            </p>
          </div>
        </div>
        <div className={css.body}>
          {categoryName && <span className={css.tag}>{categoryName}</span>}
          <h3 className={css.title}>{story.title}</h3>
          <p className={css.excerpt}>{story.article}</p>
        </div>
        <div className={css.actions}>
          <button type="button" className={css.viewBtn}>
            Переглянути статтю
          </button>
          <button type="button" className={css.saveBtn} aria-label="Зберегти">
            🔖
          </button>
        </div>
      </div>
    </article>
  );
}
