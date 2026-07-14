'use client';

import Link from 'next/link';
import { useAuthStore } from '@/lib/store/authStore';
import css from './Join.module.css';

export default function Join() {
  const isAuth = useAuthStore(state => state.isAuthenticated);
  const isCheckingAuth = useAuthStore(state => state.isCheckingAuth);

  const buttonText = isAuth ? 'Збережені статті' : 'Зареєструватися';

  const buttonLink = isAuth ? '/profile' : '/register';

  return (
    <section id="join" className={css.section}>
      <div className={css.container}>
        <div className={css.card}>
          <div className={css.content}>
            <h2 className={css.title}>
              Приєднуйся до спільноти свідомих мандрівників
            </h2>

            <p className={css.description}>
              Стань частиною ком’юніті, де подорожі стають не лише пригодою, а й
              внеском у збереження природи. Тут ти знайдеш однодумців, поради
              для сталих мандрів та натхнення для нових маршрутів Україною.
            </p>

            {!isCheckingAuth ? (
              <Link href={buttonLink} className={css.button}>
                {buttonText}
              </Link>
            ) : (
              <div className={css.button} style={{ opacity: 0 }}>
                Зареєструватися
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
