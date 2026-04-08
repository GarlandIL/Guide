import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__inner}>
          <Link to="/" className={styles.logo}>
            GovGuide
          </Link>
          <nav aria-label="Main navigation">
            <ul className={styles.nav}>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/services">Services</Link></li>
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};