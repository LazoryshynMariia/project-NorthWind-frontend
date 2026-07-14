import About from '@/components/About/About';
import Hero from '@/components/Hero/Hero';
import Join from '@/components/Join/Join';
import OurTravellers from '@/components/OurTravellers/OurTravellers';
import PopularStories from '@/components/PopularStories/PopularStories';
import { getHomePageTravellers } from '@/lib/api/travellersApi';

export default async function HomePage() {
  const travellers = await getHomePageTravellers();

  return (
    <>
      <Hero />
      <PopularStories />
      <About />
      <OurTravellers travellers={travellers} />
      <Join />
    </>
  );
}
