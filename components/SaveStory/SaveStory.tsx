'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import {
  checkSavedStory,
  removeSavedStory,
  saveStory,
} from '@/lib/api/storiesApi';

import css from './SaveStory.module.css';

type SaveStoryProps = {
  storyId: string;
};

export default function SaveStory({ storyId }: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const saved = await checkSavedStory(storyId);
        setIsSaved(saved);
      } catch {
        // Незалогінений користувач або недоступний endpoint.
        setIsSaved(false);
      } finally {
        setIsChecking(false);
      }
    };

    void loadSavedState();
  }, [storyId]);

  const handleSaveToggle = async () => {
    if (isSubmitting) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (isSaved) {
        await removeSavedStory(storyId);
        setIsSaved(false);
        toast.success('Історію видалено зі збережених');
      } else {
        await saveStory(storyId);
        setIsSaved(true);
        toast.success('Історію збережено');
      }
    } catch {
      toast.error(
        'Не вдалося змінити стан історії. Увійдіть у профіль і спробуйте ще раз.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const buttonText = isChecking
    ? 'Перевірка...'
    : isSubmitting
      ? 'Зачекайте...'
      : isSaved
        ? 'Видалити зі збережених'
        : 'Зберегти';

  return (
    <section className={css.section}>
      <h2 className={css.title}>Збережіть собі історію</h2>

      <p className={css.text}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button
        className={css.button}
        type="button"
        onClick={handleSaveToggle}
        disabled={isChecking || isSubmitting}
        aria-pressed={isSaved}
      >
        {buttonText}
      </button>
    </section>
  );
}
