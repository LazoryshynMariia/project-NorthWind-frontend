import css from './SaveStory.module.css';

export default function SaveStory() {
  return (
    <section className={css.section}>
      <h2 className={css.title}>Збережіть собі історію</h2>

      <p className={css.text}>
        Вона буде доступна у вашому профілі у розділі збережене
      </p>

      <button className={css.button} type="button">
        Зберегти
      </button>
    </section>
  );
}
