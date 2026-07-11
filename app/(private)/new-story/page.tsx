import NewStoryForm from './NewStoryForm';
import styles from './page.module.css';

export default function StoriesPage() {
  return (
    <main>
      <h1 className={styles.title}>Створити нову історію</h1>
      <NewStoryForm />
    </main>
  );
}
