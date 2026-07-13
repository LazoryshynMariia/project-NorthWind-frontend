'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import StoryCard from '@/components/StoryCard/StoryCard';
import { Story } from '@/types/index';

import 'swiper/css';
import 'swiper/css/navigation';
import css from './PopularStories.module.css';

export default function PopularStories() {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setIsLoading(true);

        const baseUrl =
          process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

        const response = await fetch(`${baseUrl}/stories/popular`);

        if (!response.ok) {
          throw new Error('Не вдалося отримати дані з сервера');
        }

        const json = await response.json();

        setStories(json.data);
      } catch (error) {
        console.error('Помилка при завантаженні популярних історій:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeData();
  }, []);

  return (
    <section className={css.section}>
      <div className={css.container}>
        <h2 className={css.title}>Популярні статті</h2>

        <div className={css.sliderWrapper}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: '.popular-prev',
              nextEl: '.popular-next',
            }}
            spaceBetween={20}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2, spaceBetween: 24 },
              1440: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <SwiperSlide key={`skeleton-${index}`}>
                    <div className={css.layaoutCard}>Завантаження...</div>
                  </SwiperSlide>
                ))
              : stories.map(story => (
                  <SwiperSlide key={story._id} className={css.slide}>
                    <StoryCard story={story} />
                  </SwiperSlide>
                ))}
          </Swiper>

          <div className={css.navigationControls}>
            <button
              className={`popular-prev ${css.navBtn}`}
              aria-label="Попередня"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className={`popular-next ${css.navBtn}`}
              aria-label="Наступна"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <Link href="/stories" className={css.linkBtn}>
          Всі статті
        </Link>
      </div>
    </section>
  );
}
