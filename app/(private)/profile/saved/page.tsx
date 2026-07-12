import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { getSavedStories } from '@/lib/mock-api';

export default async function SavedStoriesPage() {
  const stories = await getSavedStories();

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="У вас ще немає збережених історій, мерщій додавати!"
        buttonText="До історій"
        linkTo="/stories"
      />
    );
  }

  return <TravellersStories initialStories={stories} />;
}
