import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaTimes } from 'react-icons/fa';
import { Certificate } from '../types';

interface CertificateCardProps {
  certificate: Certificate;
  theme: 'dark' | 'light';
}

const CertificateCard = memo<CertificateCardProps>(({ certificate, theme }) => {
  const [showModal, setShowModal] = useState(false);
  const isDark = theme === 'dark';

  return (
    <>
      <motion.div
        style={{
          background: isDark ? '#1A1A1A' : '#FFFFFF',
          borderRadius: '10px',
          padding: 'clamp(12px, 2.5vw, 15px)',
          border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
          transition: 'all 0.3s ease',
          textAlign: 'center',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)',
          borderColor: '#EAB308'
        }}
      >
        <div style={{
          width: '100%',
          height: 'clamp(120px, 25vw, 140px)',
          overflow: 'hidden',
          borderRadius: '8px',
          marginBottom: '12px',
          position: 'relative'
        }}>
          <img 
            src={certificate.image_url} 
            alt={certificate.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease'
            }}
          />
          <FaEye 
            style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              cursor: 'pointer',
              color: '#EAB308',
              fontSize: '32px',
              background: 'rgba(12, 12, 12, 0.95)',
              padding: '14px',
              borderRadius: '50%',
              transition: 'all 0.3s ease',
              zIndex: 10
            }}
            onClick={() => setShowModal(true)}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.2)';
              e.currentTarget.style.color = '#F59E0B';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.color = '#EAB308';
            }}
          />
        </div>
        <h3 style={{
          fontSize: 'clamp(0.9rem, 2vw, 1rem)',
          color: '#EAB308',
          marginBottom: '6px',
          fontWeight: 600,
          lineHeight: 1.3
        }}>
          {certificate.title}
        </h3>
        <p style={{
          color: isDark ? '#FAFAFA' : '#1A1A1A',
          marginBottom: '4px',
          fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)',
          lineHeight: 1.4
        }}>
          {certificate.issuer}
        </p>
        <p style={{
          color: isDark ? '#A3A3A3' : '#666666',
          fontSize: 'clamp(0.75rem, 1.6vw, 0.8rem)'
        }}>
          {certificate.date}
        </p>
      </motion.div>

      {showModal && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '20px'
          }}
          onClick={() => setShowModal(false)}
        >
          <div 
            style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '90vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              style={{
                position: 'absolute',
                top: '-50px',
                right: '0',
                background: '#EAB308',
                color: '#0C0C0C',
                border: 'none',
                borderRadius: '50%',
                width: '45px',
                height: '45px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: '1.3rem',
                transition: 'all 0.3s ease',
                zIndex: 10000
              }}
              onClick={() => setShowModal(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#F59E0B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#EAB308';
              }}
              aria-label="Close modal"
            >
              <FaTimes />
            </button>
            <img 
              src={certificate.image_url} 
              alt={certificate.title} 
              style={{
                maxWidth: '100%',
                maxHeight: '90vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '8px',
                border: '2px solid #EAB308'
              }}
            />
          </div>
        </div>
      )}
    </>
  );
});

CertificateCard.displayName = 'CertificateCard';

export default CertificateCard;
