'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';

import TravellerCard from '@/components/TravellerCard/TravellerCard';
import type { Traveller } from '@/types/traveller';

import 'swiper/css';

import css from './OurTravellers.module.css';

interface OurTravellersProps {
  travellers: Traveller[];
}

function cutArray<T>(array: T[], size: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }

  return result;
}

function getItemsPerGroup(width: number) {
  if (width >= 1440) {
    return 4;
  }

  if (width >= 768) {
    return 4;
  }

  return 3;
}

function ArrowIcon() {
  return (
    <svg className={css.arrowIcon} viewBox="0 0 16 16" fill="none">
      <path
        fill="currentColor"
        stroke="currentColor"
        d="M7.821.5c.086 0 .16.026.242.108a.34.34 0 0 1 .108.25c0 .086-.027.16-.108.243L1.7 7.46h13.41c.122 0 .197.036.261.1a.32.32 0 0 1 .097.252c0 .12-.035.192-.097.253a.34.34 0 0 1-.26.099H1.701l6.355 6.356v-.002c.082.083.11.16.111.252a.3.3 0 0 1-.056.185l-.051.062a.31.31 0 0 1-.243.106.34.34 0 0 1-.255-.113L.614 8.063a.4.4 0 0 1-.09-.126.3.3 0 0 1-.024-.125q.001-.07.023-.122a.4.4 0 0 1 .091-.126l6.95-6.95A.35.35 0 0 1 7.821.5Z"
      />
    </svg>
  );
}

export default function OurTravellers({ travellers }: OurTravellersProps) {
  const swiperRef = useRef<SwiperType | null>(null);

  const [itemsPerGroup, setItemsPerGroup] = useState(3);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(true);

  useEffect(() => {
    const updateItemsPerGroup = () => {
      setItemsPerGroup(getItemsPerGroup(window.innerWidth));
    };

    updateItemsPerGroup();

    window.addEventListener('resize', updateItemsPerGroup);

    return () => {
      window.removeEventListener('resize', updateItemsPerGroup);
    };
  }, []);

  const sortedTravellers = useMemo(
    () => [...travellers].sort((a, b) => b.articlesAmount - a.articlesAmount),
    [travellers]
  );

  const travellerGroups = useMemo(
    () => cutArray(sortedTravellers, itemsPerGroup),
    [sortedTravellers, itemsPerGroup]
  );

  const updateNavigationState = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };

  const handleSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper;

    requestAnimationFrame(() => {
      swiper.update();
      updateNavigationState(swiper);
    });
  };

  const handlePrevious = () => {
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
  };

  return (
    <section className={css.section}>
      <div className={css.header}>
        <h2 className={css.title}>Наші Мандрівники</h2>

        <Link href="/travellers" className={css.topLink}>
          Всі мандрівники
        </Link>
      </div>

      <Swiper
        key={`${itemsPerGroup}-${travellerGroups.length}`}
        className={css.swiper}
        slidesPerView={1}
        spaceBetween={24}
        onSwiper={handleSwiper}
        onSlideChange={updateNavigationState}
      >
        {travellerGroups.map((group, groupIndex) => (
          <SwiperSlide key={groupIndex}>
            <ul className={css.travellersGrid}>
              {group.map(traveller => (
                <TravellerCard key={traveller._id} traveller={traveller} />
              ))}
            </ul>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className={css.controls}>
        <button
          type="button"
          className={`travellersPrev ${css.arrow}`}
          aria-label="Попередні мандрівники"
          onClick={handlePrevious}
          disabled={isBeginning}
        >
          <ArrowIcon />
        </button>

        <button
          type="button"
          className={`travellersNext ${css.arrow} ${css.nextArrow}`}
          aria-label="Наступні мандрівники"
          onClick={handleNext}
          disabled={isEnd}
        >
          <ArrowIcon />
        </button>
      </div>

      <Link href="/travellers" className={css.bottomLink}>
        Всі мандрівники
      </Link>
    </section>
  );
}
