'use client';

import { ChangeEvent, useState } from 'react';

import styles from './ImgPicker.module.css';

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
  setError: (err:string)=>void
  error: string
};

const ImgPicker = ({ profilePhotoUrl, onChangePhoto, error, setError }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>(profilePhotoUrl || '');
 // const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setError('Only images');
      return;
    }

    if (file.size > 1 * 1024 * 1024) {
      setError('Max file size 1MB');
      return;
    }

    console.log('[ImgPicker] file:', file);
    onChangePhoto(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      console.log(
        '[ImgPicker] previewUrl (data URL length):',
        result.length,
        result.slice(0, 60)
      );
      setPreviewUrl(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.preview}>
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt="Preview" className={styles.image} />
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
};

export default ImgPicker;
