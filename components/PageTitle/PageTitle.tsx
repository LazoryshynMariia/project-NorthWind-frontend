import css from './PageTitle.module.css';

type PageTitleProps = {
  children: React.ReactNode;
};

export default function PageTitle({ children }: PageTitleProps) {
  return <h1 className={css.title}>{children}</h1>;
}
