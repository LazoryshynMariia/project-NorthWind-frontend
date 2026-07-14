import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import PopularStories from '@/components/PopularStories/PopularStories';
import About from '@/components/About/About';
import Join from '@/components/Join/Join';
import Footer from '@/components/Footer/Footer';
import OurTravellers from '@/components/OurTravellers/OurTravellers';
import { getHomePageTravellers } from '@/lib/api/travellersApi';

export default async function HomePage() {
  const travellersData = await getHomePageTravellers();
  return (
    <main>
      <Header />
      <Hero />
      <PopularStories />
      <About />
      <OurTravellers travellers={travellersData} />
      <Join />
      <Footer />
    </main>
  );
}
