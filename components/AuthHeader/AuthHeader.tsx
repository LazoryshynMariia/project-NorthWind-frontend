import Logo from '../Logo/Logo';
import style from './AuthHeader.module.css';

export default function AuthHeader() {
  return (
    <div className={style.divAuthHeader}>
      <Logo />
    </div>
  );
}
