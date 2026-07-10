import css from './PageTitle.module.css';

// temporary stub, real component is another task
interface PageTitleProps {
  title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return <h1 className={css.title}>{title}</h1>;
}
