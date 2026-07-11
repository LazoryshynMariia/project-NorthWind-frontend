'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { login } from '@/lib/api/auth';

import styles from './LoginForm.module.css';

const loginSchema = Yup.object({
  email: Yup.string()
    .trim()
    .email('Некоректна пошта')
    .required("Обов'язкове поле"),

  password: Yup.string()
    .min(8, 'Мінімум 8 символів')
    .required("Обов'язкове поле"),
});

const initialValues = {
  email: '',
  password: '',
};

export default function LoginForm() {
  const router = useRouter();

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await login({
        ...values,
        email: values.email.trim(),
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      toast.success(response.message);
      router.push('/');
    } catch {
      toast.error('Неправильна пошта або пароль');
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabs}>
        <Link href="/register" className={styles.tab}>
          Реєстрація
        </Link>

        <div className={styles.activeTab}>
          <span>Вхід</span>
          <div className={styles.divider}></div>
        </div>
      </div>

      <h1 className={styles.title}>Вхід</h1>

      <p className={styles.subtitle}>
        Вітаємо знову у спільноті мандрівників!
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Пошта*
              </label>

              <Field
                id="email"
                className={styles.input}
                name="email"
                type="email"
                placeholder="hello@podorozhnyk.ua"
                autoComplete="email"
              />

              <ErrorMessage
                name="email"
                component="p"
                className={styles.error}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor="password">
                Пароль*
              </label>

              <Field
                id="password"
                className={styles.input}
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
              />

              <ErrorMessage
                name="password"
                component="p"
                className={styles.error}
              />
            </div>

            <button
              className={styles.button}
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Входимо...' : 'Увійти'}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
