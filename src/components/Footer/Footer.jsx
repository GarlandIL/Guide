import styles from './Footer.module.css';

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <p>&copy; 2025 GovGuide – Local Council Services</p>
        <p>
          <a href="/accessibility">Accessibility statement</a>
        </p>
      </div>
    </footer>
  );
};
