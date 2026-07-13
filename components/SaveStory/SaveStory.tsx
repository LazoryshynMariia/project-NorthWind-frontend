'use client';

import { useEffect, useMemo, useState } from 'react';
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
  isAuthenticated: boolean;
  authToken?: string;
  initialIsSaved?: boolean;
}

export default function SaveStory({
  storyId,
  isAuthenticated,
  authToken,
  initialIsSaved = false,
}: SaveStoryProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useMemo(() => {
    if (authToken) return authToken;
    if (typeof window === 'undefined') return undefined;
    return localStorage.getItem('accessToken') || undefined;
  }, [authToken]);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsSaved(false);
      return;
    }

    let isMounted = true;

    const syncSavedStatus = async () => {
      try {
        const savedStatus = await checkIsSaved(storyId, token);
        if (isMounted) {
          setIsSaved(savedStatus);
        }
      } catch (error) {
        if (isMounted) {
          setIsSaved(false);
        }
        console.error(error);
      }
    };

    syncSavedStatus();

    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, storyId, token]);

  const handleClick = async () => {
    if (!isAuthenticated || !token) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await deleteSavedStory(storyId, token);
        setIsSaved(false);
      } else {
        await saveStory(storyId, token);
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
            'Видалити'
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
