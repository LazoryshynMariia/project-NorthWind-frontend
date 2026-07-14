import type { Metadata } from 'next';

import RecommendedStories from '@/components/RecommendedStories/RecommendedStories';
import SaveStory from '@/components/SaveStory/SaveStory';
import StoryDetails from '@/components/StoryDetails/StoryDetails';
import { getStoryById } from '@/lib/api/storiesApi';

type StoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export async function generateMetadata({
  params,
}: StoryPageProps): Promise<Metadata> {
  const { storyId } = await params;
  const story = await getStoryById(storyId);

  if (!story) {
    return {
      title: 'Історію не знайдено',
      description: 'Запитану історію не знайдено.',
    };
  }

  const description = story.article.replace(/\s+/g, ' ').trim().slice(0, 160);

  return {
    title: story.title,
    description,
  };
}

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;
  const story = await getStoryById(storyId);

  if (!story) {
    return <StoryDetails story={null} />;
  }

  return (
    <>
      <StoryDetails story={story} />
      <SaveStory storyId={storyId} />
      <RecommendedStories />
    </>
  );
}
