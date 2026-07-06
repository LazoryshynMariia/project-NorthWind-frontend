'use client';
import { Formik, Form, Field, FormikHelpers, ErrorMessage } from 'formik';
import { useId } from 'react';
import * as Yup from 'yup';
import css from './RegistrationForm.module.css';

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

function RegistrationForm() {
  const fieldId = useId();

  const handleSubmit = (
    values: RegistrationFormValues,
    actions: FormikHelpers<RegistrationFormValues>
  ) => {
    actions.resetForm();
  };

  return (
    <div>
      <h1 className={css.formTitle}>Реєстрація</h1>
      <h2 className={css.formText}>
        Раді вас бачити у спільноті мандрівників!
      </h2>
      <Formik
        initialValues={initialValues}
        validationSchema={RegistrationFormSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.inputDiv}>
            <label htmlFor={`${fieldId}-name`} className={css.formDesc}>
              Імʼя та Прізвище*
            </label>
            <Field
              type="text"
              name="name"
              placeholder="Ваше імʼя та прізвище"
              id={`${fieldId}-name`}
              className={css.field}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <div className={css.inputDiv}>
            <label htmlFor={`${fieldId}-email`} className={css.formDesc}>
              Пошта*
            </label>
            <Field
              type="email"
              name="email"
              placeholder="hello@podorozhnyky.ua"
              id={`${fieldId}-email`}
              className={css.field}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <div className={css.inputDiv}>
            <label htmlFor={`${fieldId}-password`} className={css.formDesc}>
              Пароль*
            </label>
            <Field
              type="password"
              name="password"
              placeholder="********"
              id={`${fieldId}-password`}
              className={css.field}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>
          <button className={css.btn} type="submit">
            Зареєструватись
          </button>
        </Form>
      </Formik>
    </div>
  );
}

export default RegistrationForm;
