import RecommendedStories from '@/components/RecommendedStories/RecommendedStories';
import SaveStory from '@/components/SaveStory/SaveStory';
import StoryDetails from '@/components/StoryDetails/StoryDetails';

type StoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function StoryPage({ params }: StoryPageProps) {
  const { storyId } = await params;

  return (
    <main>
      <StoryDetails storyId={storyId} />
      <SaveStory />
      <RecommendedStories />
    </main>
  );
}
