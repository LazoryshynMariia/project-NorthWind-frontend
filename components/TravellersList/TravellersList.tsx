'use client';

import { useEffect, useState } from 'react';
import TravellerCard from '@/components/TravellerCard/TravellerCard';
import Pagination from '@/components/Pagination/Pagination';
import { getTravellers } from '@/lib/api/travellers';
import type { Traveller } from '@/types/traveller';
// import Loader from '@/components/LoaderProvider/Loader';
import toast from 'react-hot-toast';
import css from './TravellersList.module.css';

const PER_PAGE = 12;

export default function TravellersList() {
  const [travellers, setTravellers] = useState<Traveller[]>([]);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function fetchTravellers() {
      try {
        setIsLoading(true);
        setErrorMessage('');

        const response = await getTravellers(1, PER_PAGE);

        setTravellers(response.data);
        setPage(response.page);
        setHasNextPage(response.hasNextPage);
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : 'Сталася помилка під час завантаження мандрівників';

        setErrorMessage(message);
        toast.error(message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTravellers();
  }, []);

  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      setErrorMessage('');

      const nextPage = page + 1;
      const response = await getTravellers(nextPage, PER_PAGE);

      setTravellers(prevTravellers => [...prevTravellers, ...response.data]);

      setPage(response.page);
      setHasNextPage(response.hasNextPage);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Сталася помилка під час завантаження мандрівників';

      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsLoadingMore(false);
    }
  };

  if (isLoading) {
    // Замінити коли з'явиться компонент Loader

    return <p className={css.status}>Завантаження...</p>;

    // return <Loader />;
  }

  if (errorMessage && travellers.length === 0) {
    return <p className={css.error}>{errorMessage}</p>;
  }

  if (travellers.length === 0) {
    return <p className={css.status}>Мандрівників поки немає.</p>;
  }

  return (
    <div className={css.wrapper}>
      <ul className={css.list}>
        {travellers.map(traveller => (
          <TravellerCard key={traveller._id} traveller={traveller} />
        ))}
      </ul>

      {errorMessage && <p className={css.error}>{errorMessage}</p>}

      {hasNextPage && (
        <Pagination
          onClick={handleLoadMore}
          isLoading={isLoadingMore}
          className={css.travellersPagination}
        />
      )}
    </div>
  );
}
