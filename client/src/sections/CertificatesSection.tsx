import { memo } from 'react';
import { motion } from 'framer-motion';
import CertificateCard from '../components/CertificateCard';
import { technicalCertificates, otherCertificates } from '../data/certificates';

interface CertificatesSectionProps {
  theme: 'dark' | 'light';
}

const CertificatesSection = memo<CertificatesSectionProps>(({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="achievements"
      style={{
        padding: 'clamp(60px, 10vw, 80px) 20px',
        background: isDark ? '#0C0C0C' : '#F5F5F5'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 60px)'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)',
            fontWeight: 700,
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Achievements & Certifications
          </h2>
          <p style={{
            color: isDark ? '#A3A3A3' : '#666666',
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            maxWidth: '800px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Recognized certifications and hackathon achievements demonstrating technical expertise and continuous learning.
          </p>
        </motion.div>

        {/* Technical Certificates */}
        {technicalCertificates.length > 0 && (
          <div style={{ marginBottom: 'clamp(50px, 8vw, 70px)' }}>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                color: '#EAB308',
                marginBottom: 'clamp(25px, 5vw, 35px)',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              Technical Achievements
            </motion.h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 3vw, 24px)',
              justifyItems: 'center',
              width: '100%'
            }}>
              {technicalCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  theme={theme}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}

        {/* Other Certificates */}
        {otherCertificates.length > 0 && (
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              style={{
                fontSize: 'clamp(1.3rem, 3vw, 1.6rem)',
                color: '#EAB308',
                marginBottom: 'clamp(25px, 5vw, 35px)',
                fontWeight: 600,
                textAlign: 'center'
              }}
            >
              Other Achievements
            </motion.h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(16px, 3vw, 24px)',
              justifyItems: 'center',
              width: '100%'
            }}>
              {otherCertificates.map((certificate, index) => (
                <CertificateCard
                  key={certificate.id}
                  certificate={certificate}
                  theme={theme}
                  index={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
});

CertificatesSection.displayName = 'CertificatesSection';

export default CertificatesSection;
