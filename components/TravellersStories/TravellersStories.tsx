import StoryCard from '@/components/StoryCard/StoryCard';

import css from './TravellersStories.module.css';

const stories = [
  {
    id: '1',
    title: 'Карпати для новачків: маршрути, краєвиди та корисні поради',
    image: '/story-placeholder.jpg',
    author: 'Анастасія Олійник',
    readingTime: '5',
  },
  {
    id: '2',
    title: 'Подорож до Шацьких озер: що потрібно знати',
    image: '/story-placeholder1.jpg',
    author: 'Назар Ткаченко',
    readingTime: '5',
  },
  {
    id: '3',
    title: 'Полісся: мандрівка у світ дикої природи',
    image: '/story-placeholder2.jpg',
    author: 'Єва Бондаренко',
    readingTime: '5',
  },
  {
    id: '4',
    title: 'Найкращі маршрути для сімейного відпочинку',
    image: '/story-placeholder3.jpg',
    author: 'Марія Коваль',
    readingTime: '5',
  },
  {
    id: '5',
    title: 'Як подорожувати Україною екологічно',
    image: '/story-placeholder4.jpg',
    author: 'Олег Савчук',
    readingTime: '5',
  },
  {
    id: '6',
    title: 'Місця, де можна відчути справжню українську культуру',
    image: '/story-placeholder5.jpg',
    author: 'Ірина Мельник',
    readingTime: '5',
  },
  {
    id: '7',
    title: 'Локальні продукти, які варто спробувати',
    image: '/story-placeholder6.jpg',
    author: 'Тарас Бондар',
    readingTime: '5',
  },
  {
    id: '8',
    title: 'Вихідні у Львові: готовий маршрут',
    image: '/story-placeholder7.jpg',
    author: 'Софія Левченко',
    readingTime: '5',
  },
  {
    id: '9',
    title: 'Маловідомі природні локації України',
    image: '/story-placeholder8.jpg',
    author: 'Андрій Ткач',
    readingTime: '5',
  },
];

export default function TravellersStories() {
  return (
    <section className={css.section}>
      <ul className={css.list}>
        {stories.map(story => (
          <li key={story.id}>
            <StoryCard {...story} />
          </li>
        ))}
      </ul>

      <button className={css.loadMore} type="button">
        Показати ще
      </button>
    </section>
  );
}
