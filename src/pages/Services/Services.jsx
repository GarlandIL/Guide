import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchAllServices } from '../../services/api';
import { SearchInput } from '../../components/SearchInput/SearchInput';
import { Card } from '../../components/Card/Card';
import styles from './Services.module.css';

export default function Services() {
  const [allServices, setAllServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAllServices()
      .then(data => {
        setAllServices(data);
        setFilteredServices(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleSearch = (query) => {
    if (!query.trim()) {
      setFilteredServices(allServices);
    } else {
      const lowerQuery = query.toLowerCase();
      const filtered = allServices.filter(service =>
        service.name.toLowerCase().includes(lowerQuery) ||
        service.description.toLowerCase().includes(lowerQuery)
      );
      setFilteredServices(filtered);
    }
  };

  if (loading) return <div className="container">Loading services...</div>;
  if (error) return <div className="container">Error: {error}</div>;

  return (
    <div className="container">
      <h1>All services</h1>
      <SearchInput onSearch={handleSearch} />
      <div className={styles.cardGrid}>
        {filteredServices.map(service => (
          <Card
            key={service.id}
            title={service.name}
            description={service.description}
            linkTo={`/services/${service.id}`}
            linkText="View details"
          />
        ))}
      </div>
      {filteredServices.length === 0 && (
        <p>No services match your search.</p>
      )}
    </div>
  );
}