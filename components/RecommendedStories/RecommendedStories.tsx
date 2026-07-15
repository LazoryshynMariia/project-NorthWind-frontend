import StoryCard from '@/components/StoryCard/StoryCard';
import { getRecommendedStories, getStories } from '@/lib/api/storiesApi';

import css from './RecommendedStories.module.css';

type RecommendedStoriesProps = {
  categoryId?: string;
  currentStoryId?: string;
};

export default async function RecommendedStories({
  categoryId,
  currentStoryId,
}: RecommendedStoriesProps) {
  const stories = categoryId
    ? (
        await getStories({
          page: 1,
          perPage: 4,
          category: categoryId,
        }).catch(() => ({ data: [] }))
      ).data
        .filter(story => story._id !== currentStoryId)
        .slice(0, 3)
    : await getRecommendedStories();

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
