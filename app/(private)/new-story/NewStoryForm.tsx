'use client';

import ImgPicker from '@/components/ImgPicker/ImgPicker';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';

import styles from './NewStoryForm.module.css';
import { addStory } from '@/lib/api/storiesApi';
import { AddStory } from '@/types/stories';
import { useRouter } from 'next/navigation';
import * as Yup from 'yup';
import { getGategories } from '@/lib/api/categoriesApi';
import { Category } from '@/types/categories';
import toast from 'react-hot-toast';

const Schema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Title must be at least 2 characters')
    .max(40, 'Title is too long')
    .required('Title is required'),
  article: Yup.string()
    .min(12, 'Text must be at least 12 characters')
    .max(3000, 'Text is too long')
    .required('Text is required'),
  category: Yup.string().required('Category is required'),
});

export default function NewStoryForm() {
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isloading, setIsloading] = useState(false);
  const [imgError, setImgError] = useState<string>('');

  const handleSaveStory = async (data: AddStory) => {
    if (!imageFile) {
      setImgError('Image is required');
      return;
    }
    try {
      setIsloading(true);
      const createdStory = await addStory(data, imageFile);
      router.push(`/stories/${createdStory._id}`);

      toast.success('Історія збережена');
    } catch (error) {
      toast.error('Щось пішло не так');
    } finally {
      setIsloading(false);
    }
  };

  useEffect(() => {
    async function fetchCategories() {
      try {
        setIsloading(true);
        const res = await getGategories();
        setCategories(res);
      } catch (e) {
        toast.error('Щось пішло не так');
      } finally {
        setIsloading(false);
      }
    }
    fetchCategories();
  }, []);

  return (
    <Formik<AddStory>
      initialValues={{ title: '', article: '', category: '' }}
      onSubmit={data => {
        handleSaveStory(data);
      }}
      validationSchema={Schema}
    >
      {form => {
        const isSubmitBtnDisabled =
          isloading ||
          !(
            form.touched.article &&
            form.touched.category &&
            form.touched.title
          );

        return (
          <Form className={styles.form}>
            <div className={styles.field}>
              <span className={styles.label}>Обкладинка статті</span>
              <ImgPicker
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
                  {categories.map(item => {
                    return (
                      <option key={item._id} value={item._id}>
                        {item.category}
                      </option>
                    );
                  })}
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
                {isloading ? 'Збереження...' : 'Зберегти'}
              </button>
              <button
                type="button"
                className={`${styles.button} ${styles.btnGhost}`}
                onClick={() => form.resetForm()}
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
