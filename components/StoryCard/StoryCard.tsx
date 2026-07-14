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
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.99998 12.1117L4.82098 13.4717C4.44253 13.6348 4.08336 13.6042 3.74348 13.3798C3.40359 13.1555 3.23364 12.838 3.23364 12.4275V2.95249C3.23364 2.64471 3.34625 2.37788 3.57148 2.15199C3.79659 1.92599 4.06248 1.81299 4.36914 1.81299H11.6308C11.9386 1.81299 12.2054 1.92599 12.4313 2.15199C12.6573 2.37788 12.7703 2.64471 12.7703 2.95249V12.4275C12.7703 12.838 12.5997 13.1555 12.2585 13.3798C11.9173 13.6042 11.5574 13.6348 11.179 13.4717L7.99998 12.1117ZM7.99998 10.8968L11.6308 12.4275V2.95249H4.36914V12.4275L7.99998 10.8968ZM7.99998 2.95249H4.36914H11.6308H7.99998Z"
                  fill="black"
                />
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
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0001 18.1675L7.23159 20.2075C6.66392 20.4521 6.12517 20.4062 5.61534 20.0697C5.1055 19.7332 4.85059 19.2571 4.85059 18.6412V4.42873C4.85059 3.96707 5.0195 3.56681 5.35734 3.22798C5.695 2.88898 6.09384 2.71948 6.55384 2.71948H17.4463C17.908 2.71948 18.3083 2.88898 18.6471 3.22798C18.9861 3.56681 19.1556 3.96707 19.1556 4.42873V18.6412C19.1556 19.2571 18.8997 19.7332 18.3878 20.0697C17.876 20.4062 17.3363 20.4521 16.7686 20.2075L12.0001 18.1675ZM12.0001 16.3452L17.4463 18.6412V4.42873H6.55384V18.6412L12.0001 16.3452ZM12.0001 4.42873H6.55384H17.4463H12.0001Z"
                    fill="black"
                  />
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
