'use client';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import styles from './RegistrationForm.module.css';

interface RegistrationFormValues {
  name: string;
  email: string;
  password: string;
}

const initialValues: RegistrationFormValues = {
  name: '',
  email: '',
  password: '',
};

const RegistrationFormSchema = Yup.object().shape({
  name: Yup.string().max(32, 'Name is too long').required('Name is required'),
  email: Yup.string()
    .email('Invalid email format')
    .max(64, 'Name is too long')
    .required('Email is required'),
  password: Yup.string()
    .min(8, 'Name must be at least 8 characters')
    .max(128, 'Name is too long')
    .required('Password is required'),
});

export default function RegistrationForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ) => {
    actions.resetForm();
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
              className={styles.field}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
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
              className={styles.field}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </div>
          <div className={styles.inputDiv}>
            <label htmlFor={`${fieldId}-password`} className={styles.formDesc}>
              Пароль*
            </label>
            <Field
              type="password"
              name="password"
              placeholder="********"
              id={`${fieldId}-password`}
              className={styles.field}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </div>
          <button className={styles.btn} type="submit">
            Зареєструватись
          </button>
        </Form>
      </Formik>
    </div>
  );
}
