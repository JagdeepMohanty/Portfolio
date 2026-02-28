import { motion } from 'framer-motion';
import CertificateCard from '../CertificateCard';
import { technicalCertificates, otherCertificates } from '../../data/certificates';

const CertificatesSection = () => {
  const styles = {
    section: {
      padding: 'clamp(40px, 8vw, 60px) 20px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px'
    },
    sectionTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 'clamp(25px, 5vw, 40px)',
      color: '#EAB308'
    },
    certificateCategory: {
      marginBottom: 'clamp(35px, 6vw, 50px)'
    },
    categoryTitle: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: 'clamp(20px, 4vw, 30px)',
      textAlign: 'center',
      fontWeight: 600
    },
    certificatesGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
      gap: 'clamp(20px, 4vw, 25px)'
    },
    noData: {
      textAlign: 'center',
      color: '#A3A3A3',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      padding: '20px'
    }
  };

  return (
    <section id="certificates" style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.sectionTitle}>Certificates & Achievements</h1>
        
        {/* Technical Achievements */}
        <div style={styles.certificateCategory}>
          <h2 style={styles.categoryTitle}>Technical Achievements</h2>
          {technicalCertificates.length === 0 ? (
            <p style={styles.noData}>No technical certificates available yet.</p>
          ) : (
            <motion.div
              style={styles.certificatesGrid}
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
        <div style={styles.certificateCategory}>
          <h2 style={styles.categoryTitle}>Other Achievements</h2>
          {otherCertificates.length === 0 ? (
            <p style={styles.noData}>No other certificates available yet.</p>
          ) : (
            <motion.div
              style={styles.certificatesGrid}
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
