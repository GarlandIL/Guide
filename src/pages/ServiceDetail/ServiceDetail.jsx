import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchServiceById } from '../../services/api';
import { Button } from '../../components/Button/Button';
import styles from './ServiceDetail.module.css';

export default function ServiceDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const headingRef = useRef(null);

  useEffect(() => {
    fetchServiceById(id)
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  // Focus heading when service loads
  useEffect(() => {
    if (!loading && service && headingRef.current) {
      headingRef.current.focus();
    }
  }, [loading, service]);

  if (loading) return <div className="container">Loading service details...</div>;
  if (error) return <div className="container">Error: {error}</div>;
  if (!service) return <div className="container">No service found</div>;

  return (
    <div className="container">
      <Button variant="secondary" onClick={() => navigate('/services')}>
        ← Back to all services
      </Button>
      <div className={styles.detail}>
        <h1 tabIndex={-1} ref={headingRef}>{service.name}</h1>
        <p>{service.description}</p>
        <h2>Contact</h2>
        <p><a href={`mailto:${service.contact}`}>{service.contact}</a></p>
        <h2>Opening hours</h2>
        <p>{service.hours}</p>
      </div>
    </div>
  );
}