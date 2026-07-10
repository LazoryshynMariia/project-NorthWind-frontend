import type { Story } from '@/types';
import StoryCard from '../StoryCard/StoryCard';
import css from './TravellersStories.module.css';

// temporary stub, real component is another task
interface TravellersStoriesProps {
  stories: Story[];
  ownerName?: string;
}

export default function TravellersStories({
  stories,
  ownerName,
}: TravellersStoriesProps) {
  return (
    <ul className={css.grid}>
      {stories.map(story => (
        <li key={story._id}>
          <StoryCard story={story} ownerName={ownerName} />
        </li>
      ))}
    </ul>
  );
}
