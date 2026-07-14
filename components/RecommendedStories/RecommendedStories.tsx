import StoryCard from '@/components/StoryCard/StoryCard';
import { getRecommendedStories } from '@/lib/api/storiesApi';

import css from './RecommendedStories.module.css';

export default async function RecommendedStories() {
  const stories = await getRecommendedStories();

  if (stories.length === 0) {
    return null;
  }

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h2 className={css.title}>Вам також сподобається</h2>

        <ul className={css.list}>
          {stories.map(story => (
            <li className={css.item} key={story._id}>
              <StoryCard story={story} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
