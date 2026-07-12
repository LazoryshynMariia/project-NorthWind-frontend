export type RecommendedStory = {
  id: string;
  title: string;
  image: string;
  author: string;
  readingTime: string;
};

export const recommendedStories: RecommendedStory[] = [
  {
    id: '4',
    title: 'Найкращі маршрути для сімейного відпочинку',
    image: '/story-placeholder3.jpg',
    author: 'Олександра Бондаренко',
    readingTime: '5',
  },
  {
    id: '5',
    title: 'Як подорожувати Україною екологічно',
    image: '/story-placeholder4.jpg',
    author: 'Владислав Поліщук',
    readingTime: '5',
  },
  {
    id: '6',
    title: 'Національний парк Синевир: озеро серед гір',
    image: '/story-placeholder5.jpg',
    author: 'Єва Бондаренко',
    readingTime: '5',
  },
];
