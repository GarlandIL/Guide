import { Link } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import styles from './Home.module.css';

export default function Home() {
  return (
    <div className="container">
      <div className={styles.hero}>
        <h1>Welcome to GovGuide</h1>
        <p>
          Your local council services, simplified. Find information on waste collection, libraries,
          council tax, and more.
        </p>
        <Link to="/services">
          <Button variant="primary">Browse all services</Button>
        </Link>
      </div>
    </div>
  );
}
