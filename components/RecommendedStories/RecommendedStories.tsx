import StoryCard from '@/components/StoryCard/StoryCard';
import { recommendedStories } from '@/data/recommendedStories';

import css from './RecommendedStories.module.css';

export default function RecommendedStories() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <h2 className={css.title}>Вам також сподобається</h2>

        <ul className={css.list}>
          {recommendedStories.map(story => (
            <li className={css.item} key={story.id}>
              <StoryCard {...story} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
