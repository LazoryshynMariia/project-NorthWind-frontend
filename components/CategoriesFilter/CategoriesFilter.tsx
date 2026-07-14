'use client';

import type { Category } from '@/types/categories';

import css from './CategoriesFilter.module.css';

type CategoriesFilterProps = {
  categories: Category[];
  activeCategory: string;
  isLoading?: boolean;
  onChange: (categoryId: string) => void;
};

const ALL_CATEGORIES_VALUE = '';

export default function CategoriesFilter({
  categories,
  activeCategory,
  isLoading = false,
  onChange,
}: CategoriesFilterProps) {
  return (
    <div className={css.wrapper}>
      <label className={css.selectLabel}>
        <span className={css.labelText}>Категорія</span>
        <select
          className={css.select}
          value={activeCategory}
          disabled={isLoading}
          onChange={event => onChange(event.target.value)}
        >
          <option value={ALL_CATEGORIES_VALUE}>Всі статті</option>
          {categories.map(category => (
            <option key={category._id} value={category._id}>
              {category.category}
            </option>
          ))}
        </select>
      </label>

      <div className={css.buttons} aria-label="Категорії статей">
        <button
          type="button"
          className={`${css.button} ${
            activeCategory === ALL_CATEGORIES_VALUE ? css.active : ''
          }`.trim()}
          disabled={isLoading}
          onClick={() => onChange(ALL_CATEGORIES_VALUE)}
        >
          Всі статті
        </button>

        {categories.map(category => (
          <button
            key={category._id}
            type="button"
            className={`${css.button} ${
              activeCategory === category._id ? css.active : ''
            }`.trim()}
            disabled={isLoading}
            onClick={() => onChange(category._id)}
          >
            {category.category}
          </button>
        ))}
      </div>
    </div>
  );
}
