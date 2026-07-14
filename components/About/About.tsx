import Image from 'next/image';
import css from './About.module.css';

export default function About() {
  return (
    <section className={css.section}>
      <div className={css.container}>
        <div className={css.textContent}>
          <h2 className={css.title}>
            Мандруй екологічно та відкривай нові горизонти
          </h2>
          <p className={css.description}>
            Наш проєкт створений для тих, хто хоче досліджувати Україну
            відповідально. Ми допоможемо знайти унікальні маршрути, які
            поєднують красу природи, локальну культуру та принципи сталого
            туризму.
          </p>

          <div className={css.features}>
            <div className={css.featureItem}>
              <h3 className={css.featureTitle}>Еко-маршрути по Україні</h3>
              <p className={css.featureText}>
                Від Карпат до Чорного моря — добірка локацій, де можна
                подорожувати без шкоди для довкілля.
              </p>
            </div>

            <div className={css.featureItem}>
              <h3 className={css.featureTitle}>Практичні екологічні поради</h3>
              <p className={css.featureText}>
                Дізнайся, як зменшити свій екологічний слід під час мандрів, та
                зробити подорож комфортною й свідомою.
              </p>
            </div>
          </div>
        </div>

        <div className={css.imageWrapper}>
          <Image
            src="/images/about/about-img.png"
            alt="Ліс"
            fill
            className={css.image}
          />
        </div>
      </div>
    </section>
  );
}
