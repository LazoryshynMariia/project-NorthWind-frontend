'use client';

import { useState, type ChangeEvent } from 'react';
import styles from './ImgPicker.module.css';

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
  setError: (error: string) => void;
  error: string;
};

export default function ImgPicker({
  profilePhotoUrl,
  onChangePhoto,
  error,
  setError,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState(profilePhotoUrl || '');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onChangePhoto(null);
      setError('Оберіть файл зображення');
      event.currentTarget.value = '';
      return;
    }

    if (file.size > 1024 * 1024) {
      onChangePhoto(null);
      setError('Максимальний розмір файлу — 1 MB');
      event.currentTarget.value = '';
      return;
    }

    onChangePhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => setPreviewUrl(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={previewUrl}
            alt="Попередній перегляд"
            className={styles.image}
          />
        ) : (
          <div className={styles.placeholder} />
        )}
      </div>

      <label className={styles.button}>
        Завантажити фото
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={styles.input}
        />
      </label>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
