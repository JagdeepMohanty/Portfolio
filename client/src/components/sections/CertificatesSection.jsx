import { motion } from 'framer-motion';
import CertificateCard from '../CertificateCard';
import { certificates } from '../../data/certificates';
import './CertificatesSection.css';

const CertificatesSection = () => {
  return (
    <section id="certificates" className="certificates-section section">
      <div className="container">
        <h1 className="section-title">Certificates</h1>
        
        {certificates.length === 0 ? (
          <p className="no-data">No certificates available yet.</p>
        ) : (
          <motion.div
            className="certificates-grid grid grid-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {certificates.map((certificate) => (
              <CertificateCard key={certificate.id} certificate={certificate} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default CertificatesSection;
