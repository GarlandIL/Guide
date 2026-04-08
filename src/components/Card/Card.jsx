import styles from './Card.module.css';

export const Card = ({ title, description, linkTo, linkText = 'Learn more' }) => {
  return (
    <article className={styles.card}>
      <h3 className={styles.card__title}>{title}</h3>
      <p className={styles.card__description}>{description}</p>
      <a href={linkTo} className={styles.card__link}>
        {linkText} →
      </a>
    </article>
  );
};