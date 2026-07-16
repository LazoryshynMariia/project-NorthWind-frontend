'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import toast from 'react-hot-toast';
import * as Yup from 'yup';
import ImgPicker from '@/components/ImgPicker/ImgPicker';
import { addStory } from '@/lib/api/storiesApi';
import { getCategories } from '@/lib/api/categoriesApi';
import type { CreateStoryData } from '@/types';
import type { Category } from '@/types/categories';
import styles from './NewStoryForm.module.css';

const schema = Yup.object({
  title: Yup.string()
    .min(2, 'Мінімум 2 символи')
    .max(40, 'Максимум 40 символів')
    .required("Обов'язкове поле"),
  article: Yup.string()
    .min(12, 'Мінімум 12 символів')
    .max(3000, 'Максимум 3000 символів')
    .required("Обов'язкове поле"),
  category: Yup.string().required("Обов'язкове поле"),
});

export default function NewStoryForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [imgError, setImgError] = useState('');
  const [pickerKey, setPickerKey] = useState(0);

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsLoading(true);
        const result = await getCategories();
        setCategories(result);
      } catch {
        toast.error('Не вдалося завантажити категорії');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCategories();
  }, []);

  const handleSaveStory = async (data: CreateStoryData) => {
    if (!imageFile) {
      setImgError("Обов'язково додайте зображення");
      return;
    }

    try {
      setIsLoading(true);
      const createdStory = await addStory(data, imageFile);
      toast.success('Історія збережена');
      router.push(`/stories/${createdStory._id}`);
    } catch {
      toast.error('Не вдалося зберегти історію');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Formik<CreateStoryData>
      initialValues={{ title: '', article: '', category: '' }}
      onSubmit={handleSaveStory}
      validationSchema={schema}
    >
      {form => {
        const isSubmitBtnDisabled =
          isLoading || !form.isValid || !form.dirty || !imageFile;

        return (
          <Form className={styles.form}>
            <div className={styles.field}>
              <span className={styles.label}>Обкладинка статті</span>
              <ImgPicker
                key={pickerKey}
                onChangePhoto={setImageFile}
                setError={setImgError}
                error={imgError}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="title" className={styles.label}>
                Заголовок історії
              </label>
              <Field
                id="title"
                type="text"
                name="title"
                placeholder="Введіть заголовок історії"
                className={styles.input}
              />
              <ErrorMessage
                name="title"
                component="p"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="category" className={styles.label}>
                Категорія
              </label>
              <div className={styles.selectWrap}>
                <Field
                  as="select"
                  name="category"
                  id="category"
                  className={styles.select}
                >
                  <option value="" disabled>
                    Категорія
                  </option>
                  {categories.map(item => (
                    <option key={item._id} value={item._id}>
                      {item.category}
                    </option>
                  ))}
                </Field>
                <svg
                  className={styles.selectChevron}
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </div>
              <ErrorMessage
                name="category"
                component="p"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label htmlFor="article" className={styles.label}>
                Текст історії
              </label>
              <Field
                id="article"
                as="textarea"
                rows="6"
                name="article"
                placeholder="Ваша історія тут"
                className={styles.input}
              />
              <ErrorMessage
                name="article"
                component="p"
                className={styles.error}
              />
            </div>

            <div className={styles.actions}>
              <button
                type="submit"
                className={`${styles.button} ${styles.btnPrimary}`}
                disabled={isSubmitBtnDisabled}
              >
                {isLoading ? 'Збереження...' : 'Зберегти'}
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.btnGhost}`}
                onClick={() => {
                  form.resetForm();
                  setImageFile(null);
                  setImgError('');
                  setPickerKey(key => key + 1);
                }}
              >
                Відмінити
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
