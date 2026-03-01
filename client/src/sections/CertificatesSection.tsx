import { memo } from 'react';
import { motion } from 'framer-motion';
import CertificateCard from '../components/CertificateCard';
import { technicalCertificates, otherCertificates } from '../data/certificates';

interface CertificatesSectionProps {
  theme: 'dark' | 'light';
}

const CertificatesSection = memo<CertificatesSectionProps>(({ theme }) => {
  return (
    <section 
      id="certificates"
      style={{
        padding: 'clamp(40px, 8vw, 60px) 20px'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 15px'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 'clamp(25px, 5vw, 40px)',
          color: '#EAB308'
        }}>
          Certificates & Achievements
        </h1>
        
        {/* Technical Achievements */}
        <div style={{
          marginBottom: 'clamp(35px, 6vw, 50px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#EAB308',
            marginBottom: 'clamp(20px, 4vw, 30px)',
            textAlign: 'center',
            fontWeight: 600
          }}>
            Technical Achievements
          </h2>
          {technicalCertificates.length === 0 ? (
            <p style={{
              textAlign: 'center',
              color: '#A3A3A3',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              padding: '20px'
            }}>
              No technical certificates available yet.
            </p>
          ) : (
            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: 'clamp(20px, 4vw, 25px)'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {technicalCertificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} theme={theme} />
              ))}
            </motion.div>
          )}
        </div>

        {/* Other Achievements */}
        <div style={{
          marginBottom: 'clamp(35px, 6vw, 50px)'
        }}>
          <h2 style={{
            fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
            color: '#EAB308',
            marginBottom: 'clamp(20px, 4vw, 30px)',
            textAlign: 'center',
            fontWeight: 600
          }}>
            Other Achievements
          </h2>
          {otherCertificates.length === 0 ? (
            <p style={{
              textAlign: 'center',
              color: '#A3A3A3',
              fontSize: 'clamp(0.9rem, 2vw, 1rem)',
              padding: '20px'
            }}>
              No other certificates available yet.
            </p>
          ) : (
            <motion.div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 250px), 1fr))',
                gap: 'clamp(20px, 4vw, 25px)'
              }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {otherCertificates.map((certificate) => (
                <CertificateCard key={certificate.id} certificate={certificate} theme={theme} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
});

CertificatesSection.displayName = 'CertificatesSection';

export default CertificatesSection;
