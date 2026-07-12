import Header from '@/components/Header/Header';
import Hero from '@/components/Hero/Hero';
import PopularStories from '@/components/PopularStories/PopularStories';
import About from '@/components/About/About';
import OurTravellers from '@/components/OurTravellers/OurTravellers';
import Footer from '@/components/Footer/Footer';
import Join from '@/components/Join/Join';
export default function HomePage() {
  return (
    <main>
      <Header />
      <Hero />
      <PopularStories />
      <About />
      <OurTravellers />
      <Join />
      <Footer />
    </main>
  );
}
