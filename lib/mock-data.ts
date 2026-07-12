import type { Story } from '@/types';
import type { Traveller } from '@/types/traveller';

// fake logged in user until auth is ready
export const currentUser: Traveller = {
  _id: 'mock-current-user',
  name: 'Іван Дзямко',
  avatarUrl: null,
  articlesAmount: 2,
};

const text =
  'Тиса - одна з найбільших річок Закарпаття, яка є справжнім символом цього регіону. Її береги вкриті густими лісами та зеленими луками.';

// test data based on the figma design
export const stories: Story[] = [
  {
    _id: 'mock-story-1',
    title: 'Карпати для новачків: легкі маршрути вихідного дня',
    article: text,
    category: { _id: 'mock-cat-1', category: 'Гори' },
    img: '/placeholder-story.svg',
    date: '2025-03-27',
    ownerId: 'mock-other-user',
    rate: 5,
  },
  {
    _id: 'mock-story-2',
    title: 'Шацькі озера: мандрівка до кришталевих вод',
    article: text,
    category: { _id: 'mock-cat-2', category: 'Озера' },
    img: '/placeholder-story.svg',
    date: '2025-03-30',
    ownerId: 'mock-other-user',
    rate: 5,
  },
  {
    _id: 'mock-story-3',
    title: 'Полісся: мандрівка у світ пралісів',
    article: text,
    category: { _id: 'mock-cat-3', category: 'Ліси' },
    img: '/placeholder-story.svg',
    date: '2025-04-02',
    ownerId: 'mock-other-user',
    rate: 5,
  },
  {
    _id: 'mock-story-own-1',
    title: 'Мій перший похід на Говерлу',
    article: text,
    category: { _id: 'mock-cat-1', category: 'Гори' },
    img: '/placeholder-story.svg',
    date: '2025-04-20',
    ownerId: 'mock-current-user',
    rate: 2,
  },
  {
    _id: 'mock-story-own-2',
    title: 'Тустань: фортеця в скелях',
    article: text,
    category: { _id: 'mock-cat-1', category: 'Гори' },
    img: '/placeholder-story.svg',
    date: '2025-04-25',
    ownerId: 'mock-current-user',
    rate: 3,
  },
];

export const savedStoryIds: string[] = [
  'mock-story-1',
  'mock-story-2',
  'mock-story-3',
];
