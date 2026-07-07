"use client";

import { ChangeEvent, useEffect, useState } from 'react';
import Image from 'next/image';

type Props = {
  onChangePhoto: (file: File | null) => void;
  profilePhotoUrl?: string;
};

const ImgPicker = ({ profilePhotoUrl, onChangePhoto }: Props) => {
  const [previewUrl, setPreviewUrl] = useState<string>(profilePhotoUrl || '');
    const [error, setError] = useState<string>('');
    
const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError('')

    if (file) {
      // Перевіримо тип файлу
      if (!file.type.startsWith('image/')) {
        setError('Only images')
        return
      }

      // Перевіримо розмір файлу (максимум 5MB)
      if (file.size > 1 * 1024 * 1024) {
        setError('Max file size 1MB')
        return
      }

      onChangePhoto(file) // передаємо файл у батьківський компонент
      
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }
  

  return (
    <div>
	    {/* Відображаємо прев'ю якщо зображення існує */}
          {previewUrl && (
              <Image src={previewUrl} alt='Preview' width={300} height={300} />
          )}
        <label>
          📷 Choose photo
          <input type='file' accept='image/*' onChange={handleFileChange} />
        </label>
      
      {error && <p>{error}</p>}
    </div>
  );
};

export default ImgPicker;