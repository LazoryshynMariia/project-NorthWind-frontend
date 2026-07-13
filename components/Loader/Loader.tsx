import css from './Loader.module.css';

// TODO: replace with the global loader from LoaderProvider when it is ready
export default function Loader() {
  return <div className={css.loader} aria-label="Loading" />;
}
