'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/lib/store/authStore';
import Image from 'next/image';
import Link from 'next/link';
import toast from 'react-hot-toast';
import type { Story } from '@/types';
import { getTravellerById } from '@/lib/api/travellersApi';
import {
  checkIsSaved,
  deleteSavedStory,
  saveStory,
} from '@/lib/api/savedStoriesApi';
import ErrorWhileSavingModal from '@/components/ErrorWhileSavingModal/ErrorWhileSavingModal';
import css from './StoryCard.module.css';

interface StoryCardProps {
  story: Story;
  ownerName?: string;
  initialIsSaved?: boolean;
}

export default function StoryCard({
  story,
  ownerName,
  initialIsSaved = false,
}: StoryCardProps) {
  const [isSaved, setIsSaved] = useState(initialIsSaved);
  const [savedCount, setSavedCount] = useState(story.rate ?? 0);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [authorName, setAuthorName] = useState(
    ownerName || story.ownerName || 'Мандрівник'
  );

  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const imageSrc = story.img || '/placeholder-avatar.svg';
  const saves = story.savesCount ?? story.rate ?? 0;

  useEffect(() => {
    setSavedCount(saves);
  }, [saves]);

  useEffect(() => {
    if (ownerName || story.ownerName || !story.ownerId) return;

    let isMounted = true;

    const loadAuthor = async () => {
      const traveller = await getTravellerById(story.ownerId);

      if (isMounted && traveller) {
        setAuthorName(traveller.name);
      }
    };

    loadAuthor();

    return () => {
      isMounted = false;
    };
  }, [ownerName, story.ownerId, story.ownerName]);

  useEffect(() => {
    if (!isAuthenticated) {
      setIsSaved(false);
      return;
    }

    let isMounted = true;

    const syncSavedStatus = async () => {
      try {
        const savedStatus = await checkIsSaved(story._id);
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
  }, [isAuthenticated, story._id]);

  const handleSaveClick = async () => {
    if (!isAuthenticated) {
      setIsModalOpen(true);
      return;
    }

    setIsLoading(true);
    try {
      if (isSaved) {
        await deleteSavedStory(story._id);
        setIsSaved(false);
        setSavedCount(prev => Math.max(prev - 1, 0));
      } else {
        await saveStory(story._id);
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
      <article className={css.card}>
        <Image
          className={css.photo}
          src={imageSrc}
          alt={story.title}
          width={422}
          height={422}
          unoptimized
        />

        <div className={css.content}>
          <div className={css.author}>
            <p className={css.authorName}>{authorName}</p>
            <span aria-hidden="true">•</span>
            <p className={css.meta}>
              {savedCount}
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M6 4h12v16l-6-4-6 4V4Z" />
              </svg>
            </p>
          </div>

          <div className={css.body}>
            <h3 className={css.title}>{story.title}</h3>
          </div>

          <div className={css.actions}>
            <Link href={`/stories/${story._id}`} className={css.viewBtn}>
              Переглянути статтю
            </Link>

            <button
              type="button"
              className={`${css.saveBtn} ${isSaved ? css.saved : ''}`.trim()}
              onClick={handleSaveClick}
              disabled={isLoading}
              aria-label={isSaved ? 'Видалити зі збережених' : 'Зберегти'}
              aria-pressed={isSaved}
            >
              {isLoading ? (
                <span className={css.loader} />
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path d="M6 4h12v16l-6-4-6 4V4Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </article>

      <ErrorWhileSavingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
