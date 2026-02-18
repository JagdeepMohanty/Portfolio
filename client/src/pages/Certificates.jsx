import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getCertificates } from '../api/api';
import CertificateCard from '../components/CertificateCard';
import Loader from '../components/Loader';
import './Certificates.css';

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const data = await getCertificates();
      setCertificates(data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load certificates');
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="certificates section">
      <div className="container">
        <h1 className="section-title">Certificates</h1>
        
        {error && <p className="error-message">{error}</p>}
        
        {certificates.length === 0 ? (
          <p className="no-data">No certificates available yet.</p>
        ) : (
          <motion.div
            className="certificates-grid grid grid-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {certificates.map((certificate) => (
              <CertificateCard key={certificate._id} certificate={certificate} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Certificates;
