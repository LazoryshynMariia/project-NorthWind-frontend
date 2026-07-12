'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Story } from '@/types/story';
import { saveStory, deleteSavedStory, checkIsSaved } from '@/lib/api';
import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import styles from './StoryCard.module.css';

interface StoryCardProps {
  story: Story;
  isAuthenticated: boolean;
  authToken?: string;
  initialIsSaved?: boolean;
}

export default function StoryCard({
  story,
  isAuthenticated,
  authToken,
  initialIsSaved = false,
}: StoryCardProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [savedCount, setSavedCount] = useState(story.rate ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = useMemo(() => {
    if (authToken) return authToken;
    if (typeof window === 'undefined') return undefined;
    return localStorage.getItem('accessToken') || undefined;
  }, [authToken]);

  useEffect(() => {
    setSavedCount(story.rate ?? 0);
  }, [story.rate]);

  useEffect(() => {
    if (!isAuthenticated || !token) {
      setIsSaved(false);
      return;
    }

    let isMounted = true;

    const syncSavedStatus = async () => {
      try {
        const savedStatus = await checkIsSaved(story._id, token);
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
  }, [isAuthenticated, story._id, token]);

  const handleSaveClick = async () => {
    if (!isAuthenticated || !token) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await deleteSavedStory(story._id, token);
        setIsSaved(false);
        setSavedCount(prev => Math.max(prev - 1, 0));
      } else {
        await saveStory(story._id, token);
        setIsSaved(true);
        setSavedCount(prev => prev + 1);
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
      <div className={styles.card}>
        <div className={styles.imageWrapper}>
          <img src={story.img} alt={story.title} className={styles.image} />
        </div>

        <div className={styles.body}>
          <div className={styles.meta}>
            <span className={styles.author}>
              {story.ownerName || 'Невідомий автор'}
            </span>
            <span>•</span>
            <span className={styles.stats}>
              {savedCount}
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.00022 12.1121L4.82122 13.4721C4.44278 13.6353 4.08361 13.6046 3.74372 13.3803C3.40383 13.156 3.23389 12.8385 3.23389 12.428V2.95298C3.23389 2.6452 3.3465 2.37836 3.57172 2.15248C3.79683 1.92648 4.06272 1.81348 4.36939 1.81348H11.6311C11.9388 1.81348 12.2057 1.92648 12.4316 2.15248C12.6576 2.37836 12.7706 2.6452 12.7706 2.95298V12.428C12.7706 12.8385 12.5999 13.156 12.2587 13.3803C11.9175 13.6046 11.5577 13.6353 11.1792 13.4721L8.00022 12.1121ZM8.00022 10.8973L11.6311 12.428V2.95298H4.36939V12.428L8.00022 10.8973ZM8.00022 2.95298H4.36939H11.6311H8.00022Z"
                  fill="black"
                />
              </svg>{' '}
            </span>
          </div>

          <h3 className={styles.title}>{story.title}</h3>

          <div className={styles.actions}>
            <Link href={`/stories/${story._id}`} className={styles.viewButton}>
              Переглянути статтю
            </Link>

            <button
              className={`${styles.saveButton} ${isSaved ? styles.saved : ''}`}
              onClick={handleSaveClick}
              disabled={isLoading}
              aria-label={isSaved ? 'Видалити зі збережених' : 'Зберегти'}
              type="button"
            >
              {isLoading ? (
                <span className={styles.loader} />
              ) : (
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill={isSaved ? 'currentColor' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <ErrorWhileSavingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
