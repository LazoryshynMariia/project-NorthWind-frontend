'use client';

import Link from 'next/link';

import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import TravellerCard from '@/components/TravellerCard/TravellerCard';
import type { Traveller } from '@/types/traveller';

import 'swiper/css';

import css from './OurTravellers.module.css';

interface OurTravellersProps {
  travellers: Traveller[];
}

function chunkArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

export default function OurTravellers({ travellers }: OurTravellersProps) {
  const sortedTravellers = [...travellers].sort(
    (a, b) => b.articlesAmount - a.articlesAmount
  );

  const mobileGroups = chunkArray(sortedTravellers, 3);
  const tabletGroups = chunkArray(sortedTravellers, 4);
  const desktopGroups = chunkArray(sortedTravellers, 4);

  return (
    <section className={css.section}>
      <div className={css.header}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <Link href="/travellers" className={css.topLink}>
          Всі мандрівники
        </Link>
      </div>

      <div className={css.mobileSlider}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.travellersPrev',
            nextEl: '.travellersNext',
          }}
          slidesPerView={1}
        >
          {mobileGroups.map((group, index) => (
            <SwiperSlide key={index}>
              <div className={css.mobileGrid}>
                {group.map(traveller => (
                  <TravellerCard key={traveller._id} traveller={traveller} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={css.tabletSlider}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.travellersPrev',
            nextEl: '.travellersNext',
          }}
          slidesPerView={1}
        >
          {tabletGroups.map((group, index) => (
            <SwiperSlide key={index}>
              <div className={css.tabletGrid}>
                {group.map(traveller => (
                  <TravellerCard key={traveller._id} traveller={traveller} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={css.desktopSlider}>
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: '.travellersPrev',
            nextEl: '.travellersNext',
          }}
          slidesPerView={1}
        >
          {desktopGroups.map((group, index) => (
            <SwiperSlide key={index}>
              <div className={css.desktopGrid}>
                {group.map(traveller => (
                  <TravellerCard key={traveller._id} traveller={traveller} />
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={css.controls}>
        <button
          type="button"
          className={`travellersPrev ${css.arrow}`}
          aria-label="Попередні мандрівники"
        >
          ←
        </button>

        <button
          type="button"
          className={`travellersNext ${css.arrow}`}
          aria-label="Наступні мандрівники"
        >
          →
        </button>
      </div>

      <Link href="/travellers" className={css.bottomLink}>
        Всі мандрівники
      </Link>
    </section>
  );
}
