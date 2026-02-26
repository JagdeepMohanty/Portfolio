import { motion } from 'framer-motion';
import CertificateCard from '../CertificateCard';
import { technicalCertificates, otherCertificates } from '../../data/certificates';
import './CertificatesSection.css';

const CertificatesSection = () => {
  return (
    <section id="certificates" className="certificates-section section">
      <div className="container">
        <h1 className="section-title">Certificates & Achievements</h1>
        
        {/* Technical Achievements */}
        <div className="certificate-category">
          <h2 className="category-title">Technical Achievements</h2>
          {technicalCertificates.length === 0 ? (
            <p className="no-data">No technical certificates available yet.</p>
          ) : (
            <motion.div
              className="certificates-grid grid grid-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {technicalCertificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Other Achievements */}
        <div className="certificate-category">
          <h2 className="category-title">Other Achievements</h2>
          {otherCertificates.length === 0 ? (
            <p className="no-data">No other certificates available yet.</p>
          ) : (
            <motion.div
              className="certificates-grid grid grid-3"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {otherCertificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
