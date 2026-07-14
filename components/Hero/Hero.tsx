import Image from 'next/image';
import Link from 'next/link';
import css from './Hero.module.css';

export default function Hero() {
  return (
    <section className={css.heroSection}>
      <div className={css.container}>
        <div className={css.imageWrapper}>
          <Image
            src="/images/hero/hero-img.png"
            alt="Гірський пейзаж Карпат"
            priority
            fill
            className={css.image}
          />
        </div>
        <div className={css.content}>
          <h1 className={css.title}>
            Відкрий Україну заново — еко-мандри для натхнення
          </h1>
          <p className={css.description}>
            Подорожуй екологічно, відкривай заповідні місця, гори та річки
            України. Ми зібрали маршрути, які допоможуть побачити красу природи
            без шкоди для неї.
          </p>
          <Link href="#join" className={css.joinBtn}>
            Доєднатись до мандрів
          </Link>
        </div>
      </div>
    </section>
  );
}
