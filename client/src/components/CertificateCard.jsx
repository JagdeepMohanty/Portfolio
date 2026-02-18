import { motion } from 'framer-motion';
import './CertificateCard.css';

const CertificateCard = ({ certificate }) => {
  return (
    <motion.div
      className="certificate-card card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="certificate-image">
        <img src={certificate.image_url} alt={certificate.title} />
      </div>
      <div className="certificate-content">
        <h3 className="certificate-title">{certificate.title}</h3>
        <p className="certificate-issuer">{certificate.issuer}</p>
        <p className="certificate-date">{certificate.date}</p>
      </div>
    </motion.div>
  );
};

export default CertificateCard;
