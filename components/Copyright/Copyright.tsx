import styles from './Copyright.module.css';

const Copyright = () => {
  const year = new Date().getFullYear();

  return (
    <p className={styles.copyright}>
      © {year} Природні Мандри. Усі права захищені.
    </p>
  );
};

export default Copyright;
