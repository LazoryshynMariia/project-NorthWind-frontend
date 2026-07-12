'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import css from './Join.module.css';

export default function Join() {
  const [isAuth, setIsAuth] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const initializeComponent = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        setIsAuth(true);
      }
      setIsMounted(true);
    };

    initializeComponent();
  }, []);

  const buttonText = isAuth ? 'Збережені статті' : 'Зареєструватися';

  const buttonLink = isAuth ? '/profile' : '/auth/register';

  return (
    <section className={css.section}>
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

            {isMounted ? (
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
