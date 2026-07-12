import MessageNoStories from '@/components/MessageNoStories/MessageNoStories';
import TravellersStories from '@/components/TravellersStories/TravellersStories';
import { getCurrentUser, getMyStories } from '@/lib/mock-api';

export default async function MyStoriesPage() {
  const user = await getCurrentUser();
  const stories = await getMyStories();

  if (stories.length === 0) {
    return (
      <MessageNoStories
        text="Ви ще нічого не публікували, поділіться своєю історією"
        buttonText="Опублікувати статтю"
        linkTo="/new-story"
      />
    );
  }

  return <TravellersStories initialStories={stories} ownerName={user.name} />;
}
