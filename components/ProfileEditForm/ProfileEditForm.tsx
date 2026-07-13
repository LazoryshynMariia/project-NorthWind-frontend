'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import {
  getCurrentUser,
  updateCurrentUser,
} from '@/lib/api/usersApi';
import type { UpdateUserProfileData } from '@/types/user';

import styles from './ProfileEditForm.module.css';

const profileSchema = Yup.object({
  name: Yup.string()
    .trim()
    .min(2, 'Мінімум 2 символи')
    .max(32, 'Максимум 32 символи')
    .required("Обов'язкове поле"),
});

const emptyValues: UpdateUserProfileData = {
  name: '',
};

export default function ProfileEditForm() {
  const router = useRouter();
  const [initialValues, setInitialValues] = useState(emptyValues);
  const [isLoading, setIsLoading] = useState(true);
  const [avatarPreview, setAvatarPreview] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  useEffect(() => {
    async function loadProfile() {
      try {
        const profile = await getCurrentUser();

        setInitialValues({
          name: profile.name ?? '',
        });
        setAvatarPreview(profile.avatarUrl ?? '');
      } catch {
        toast.error('Не вдалося завантажити профіль');
      } finally {
        setIsLoading(false);
      }
    }

    loadProfile();
  }, []);

  useEffect(() => {
    return () => {
      if (avatarPreview.startsWith('blob:')) {
        URL.revokeObjectURL(avatarPreview);
      }
    };
  }, [avatarPreview]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Оберіть файл зображення');
      event.currentTarget.value = '';
      return;
    }

    if (file.size > 1024 * 1024) {
      toast.error('Максимальний розмір фото - 1 MB');
      event.currentTarget.value = '';
      return;
    }

    const nextPreview = URL.createObjectURL(file);

    if (avatarPreview.startsWith('blob:')) {
      URL.revokeObjectURL(avatarPreview);
    }

    setAvatarFile(file);
    setAvatarPreview(nextPreview);
  };

  const handleSubmit = async (values: UpdateUserProfileData) => {
    try {
      if (avatarFile) {
        toast.error('Завантаження аватара очікує endpoint на backend');
        return;
      }

      await updateCurrentUser({
        name: values.name.trim(),
      });

      toast.success('Профіль оновлено');
      router.push('/profile');
    } catch {
      toast.error('Не вдалося оновити профіль');
    }
  };

  if (isLoading) {
    return <p className={styles.status}>Завантаження профілю...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <p className={styles.eyebrow}>Профіль мандрівника</p>
      <h1 className={styles.title}>Редагування профілю</h1>

      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={profileSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.profileRow}>
              <div
                className={styles.avatarPreview}
                style={
                  avatarPreview
                    ? { backgroundImage: `url(${avatarPreview})` }
                    : undefined
                }
                aria-hidden="true"
              >
                {!avatarPreview && <span>Фото</span>}
              </div>

              <div className={styles.profileInfo}>
                <label className={styles.fileLabel} htmlFor="avatar">
                  Змінити фото
                </label>

                <input
                  id="avatar"
                  className={styles.fileInput}
                  name="avatar"
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />

                <p className={styles.hint}>JPG, PNG або WEBP до 1 MB.</p>
              </div>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="name">
                Ім&apos;я*
              </label>

              <Field
                id="name"
                className={styles.input}
                name="name"
                type="text"
                placeholder="Ваше ім'я"
                autoComplete="name"
              />

              <ErrorMessage
                name="name"
                component="p"
                className={styles.error}
              />
            </div>

            <div className={styles.actions}>
              <button
                className={styles.secondaryButton}
                type="button"
                onClick={() => router.push('/profile')}
              >
                Скасувати
              </button>

              <button
                className={styles.button}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Зберігаємо...' : 'Зберегти'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
