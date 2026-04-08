import styles from './Button.module.css';

export const Button = ({ 
  children, 
  variant = 'primary', 
  disabled = false, 
  onClick, 
  type = 'button',
  ...props 
}) => {
  const buttonClass = `${styles.btn} ${styles[`btn--${variant}`]}`;
  
  return (
    <button
      type={type}
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};