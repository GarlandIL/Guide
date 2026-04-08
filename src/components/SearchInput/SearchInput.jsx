import { useState, useEffect } from 'react';
import styles from './SearchInput.module.css';

export const SearchInput = ({ onSearch, placeholder = 'Search services...' }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300); // debounce

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className={styles.search}>
      <label htmlFor="search-input" className={styles.search__label}>
        Search services
      </label>
      <input
        id="search-input"
        type="search"
        className={styles.search__input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        aria-describedby="search-status"
      />
      <div id="search-status" className="visually-hidden" aria-live="polite">
        {value && `Showing results for ${value}`}
      </div>
    </div>
  );
};