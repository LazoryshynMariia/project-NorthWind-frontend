'use client';

import ImgPicker from '@/components/ImgPicker/ImgPicker';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';

export default function NewStoryForm() {
  const [imageFile, setImageFile] = useState<File | null>(null);

  console.log(imageFile);
  

  return (
    <Formik
      initialValues={{}}
      onSubmit={data => {
        console.log(data);
      }}
    >
      <Form>
        <ImgPicker onChangePhoto={setImageFile} />
        <Field type="text" name="title" />
        <Field as="select" name="article" id="article">
          <option value="" disabled>
            Выберите опцию...
          </option>
          <option value="red">Красный</option>
          <option value="green">Зеленый</option>
          <option value="blue">Синий</option>
        </Field>
        <Field type="text" name="description" />
        <button type="submit">Зберегти</button>
        <button>Відмінити</button>
      </Form>
    </Formik>
  );
}
