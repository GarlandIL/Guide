import styles from './Card.module.css';

export const Card = ({ title, description, linkTo, linkText = 'Learn more', headingLevel = 'h2' }) => {
  const HeadingTag = headingLevel;
  return (
    <article className={styles.card}>
      <HeadingTag className={styles.card__title}>{title}</HeadingTag>
      <p className={styles.card__description}>{description}</p>
      <a href={linkTo} className={styles.card__link}>
        {linkText} →
      </a>
    </article>
  );
};