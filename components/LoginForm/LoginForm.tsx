'use client';

import { useId } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
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
  const fieldId = useId();
  const router = useRouter();

  const setAuth = useAuthStore(state => state.setAuth);

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await login({
        ...values,
        email: values.email.trim(),
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      setAuth(response.data.user);

      toast.success(response.message);
      router.push('/');
    } catch {
      toast.error('Неправильна пошта або пароль');
    }
  };

  return (
    <div>
      <h1 className={styles.formTitle}>Вхід</h1>

      <p className={styles.formText}>
        Вітаємо знову у спільноті мандрівників!
      </p>

      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
            <div className={styles.inputDiv}>
              <label className={styles.formDesc} htmlFor={`${fieldId}-email`}>
                Пошта*
              </label>

              <Field
                id={`${fieldId}-email`}
                className={`${styles.field} ${touched.email && errors.email ? styles.inputError : ''}`}
                name="email"
                type="email"
                placeholder="hello@podorozhnyky.ua"
                autoComplete="email"
              />

              <ErrorMessage
                name="email"
                component="span"
                className={styles.textError}
              />
            </div>

            <div className={styles.inputDiv}>
              <label
                className={styles.formDesc}
                htmlFor={`${fieldId}-password`}
              >
                Пароль*
              </label>

              <Field
                id={`${fieldId}-password`}
                className={`${styles.field} ${touched.password && errors.password ? styles.inputError : ''}`}
                name="password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
              />

              <ErrorMessage
                name="password"
                component="span"
                className={styles.textError}
              />
            </div>

            <button
              className={styles.btn}
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
