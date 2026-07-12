'use client';

import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';
import { toast } from 'react-hot-toast';
import { register, type RegisterRequest, login } from '@/lib/api/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const initialValues: RegisterRequest = {
  name: '',
  email: '',
  password: '',
};

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, 'Name is too long')
    .trim()
    .required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .max(64, 'Email is too long')
    .trim()
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password is too long')
    .required('Password is required'),
});

export default function RegistrationForm() {
  const fieldId = useId();
  const router = useRouter();

  const handleSubmit = async (
    values: RegisterRequest,
    actions: FormikHelpers<RegisterRequest>
  ) => {
    try {
      await register(values);

      const response = await login({
        email: values.email,
        password: values.password,
      });

      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('refreshToken', response.data.refreshToken);

      router.push('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const serverMessage = error.response?.data?.message;
        toast.error(serverMessage || 'Не вдалося зареєструватися');
      } else {
        toast.error('Не вдалося зареєструватися');
      }
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <div>
      <h1 className={styles.formTitle}>Реєстрація</h1>
      <p className={styles.formText}>
        Раді вас бачити у спільноті мандрівників!
      </p>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationFormSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className={styles.form}>
            <div className={styles.inputDiv}>
              <label htmlFor={`${fieldId}-name`} className={styles.formDesc}>
                Імʼя та Прізвище*
              </label>
              <Field
                type="text"
                name="name"
                placeholder="Ваше імʼя та прізвище"
                id={`${fieldId}-name`}
                className={`${styles.field} ${touched.name && errors.name ? styles.inputError : ''}`}
              />
              <ErrorMessage
                name="name"
                component="span"
                className={styles.textError}
              />
            </div>
            <div className={styles.inputDiv}>
              <label htmlFor={`${fieldId}-email`} className={styles.formDesc}>
                Пошта*
              </label>
              <Field
                type="email"
                name="email"
                placeholder="hello@podorozhnyky.ua"
                id={`${fieldId}-email`}
                className={`${styles.field} ${touched.email && errors.email ? styles.inputError : ''}`}
              />
              <ErrorMessage
                name="email"
                component="span"
                className={styles.textError}
              />
            </div>
            <div className={styles.inputDiv}>
              <label
                htmlFor={`${fieldId}-password`}
                className={styles.formDesc}
              >
                Пароль*
              </label>
              <Field
                type="password"
                name="password"
                placeholder="********"
                id={`${fieldId}-password`}
                className={`${styles.field} ${touched.password && errors.password ? styles.inputError : ''}`}
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
              Зареєструватись
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
