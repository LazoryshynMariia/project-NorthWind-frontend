'use client';

import ImgPicker from '@/components/ImgPicker/ImgPicker';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

import styles from './NewStoryForm.module.css';
import { addStory } from '@/lib/api/clientApi';

export default function NewStoryForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  console.log(imageFile);

  const handleSaveUser = async (data: any) => {
    if (!imageFile) {
      return;
    }
    try {
      const newPhotoUrl = await addStory(data, imageFile);
      console.log(newPhotoUrl);
    } catch (error) {
      console.error('Oops, some error:', error);
    }
  };

  return (
    <Formik
      initialValues={{}}
      onSubmit={data => {
        handleSaveUser(data);
      }}
    >
      <Form className={styles.form}>
        <div className={styles.field}>
          <span className={styles.label}>Обкладинка статті</span>
          <ImgPicker onChangePhoto={setImageFile} />
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
                Выберите опцию...
              </option>
              <option value="red">Красный</option>
              <option value="green">Зеленый</option>
              <option value="blue">Синий</option>
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
        </div>

        <div className={styles.field}>
          <label htmlFor="article" className={styles.label}>
            Опис історії
          </label>
          <Field
            id="article"
            type="text"
            name="article"
            placeholder="Опис історії"
            className={styles.input}
          />
        </div>

        <div className={styles.actions}>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary}`}
          >
            Зберегти
          </button>
          <button className={`${styles.btn} ${styles.btnGhost}`}>
            Відмінити
          </button>
        </div>
      </Form>
    </Formik>
  );
}
