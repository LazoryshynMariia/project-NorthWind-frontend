'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import toast from 'react-hot-toast';
import {
  saveStory,
  deleteSavedStory,
  checkIsSaved,
} from '@/lib/api/savedStoriesApi';
import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import styles from './SaveStory.module.css';

interface SaveStoryProps {
  storyId: string;
  initialIsSaved?: boolean;
}

export default function SaveStory({
  storyId,
  initialIsSaved = false,
}: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsSaved(false);
      return;
    }

    let isMounted = true;

    const syncSavedStatus = async () => {
      try {
        const savedStatus = await checkIsSaved(storyId);
        if (isMounted) {
          setIsSaved(savedStatus);
        }
      } catch {
        if (isMounted) {
          setIsSaved(false);
        }
      }
    };

    syncSavedStatus();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, storyId]);

  const handleClick = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await deleteSavedStory(storyId);
        setIsSaved(false);
      } else {
        await saveStory(storyId);
        setIsSaved(true);
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : 'Не вдалося виконати дію. Спробуйте ще раз.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.wrapper}>
        <h2 className={styles.title}>Збережіть собі історію</h2>
        <p className={styles.description}>
          Вона буде доступна у вашому профілі у розділі збережене
        </p>
        <button
          className={styles.button}
          onClick={handleClick}
          disabled={isLoading}
          type="button"
        >
          {isLoading ? (
            <span className={styles.loader} />
          ) : isSaved ? (
            'Видалити зі збережених'
          ) : (
            'Зберегти'
          )}
        </button>
      </div>

      <ErrorWhileSavingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
