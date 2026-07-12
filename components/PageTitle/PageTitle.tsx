import styles from './PageTitle.module.css';

interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return <h1 className={styles.title}>{title}</h1>;
}
