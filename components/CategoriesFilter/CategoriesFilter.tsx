'use client';

import { useState } from 'react';
import css from './CategoriesFilter.module.css';

const categories = ['Всі статті', 'Природа', 'Гори', 'Озера', 'Міста'];

export default function CategoriesFilter() {
  const [activeCategory, setActiveCategory] = useState('Всі статті');

  return (
    <div className={css.wrapper}>
      <div className={css.filter}>
        {categories.map(category => (
          <button
            key={category}
            type="button"
            className={`${css.button} ${
              activeCategory === category ? css.active : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
