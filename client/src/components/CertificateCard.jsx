import { memo, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaAward } from 'react-icons/fa';

const CertificateCard = memo(({ certificate, theme, index }) => {
  const [showModal, setShowModal] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [showModal]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{
          y: -6,
          boxShadow: '0 12px 40px rgba(234, 179, 8, 0.4)',
          transition: { duration: 0.15 }
        }}
        style={{
          background: isDark ? '#1A1A1A' : '#FFFFFF',
          borderRadius: '12px',
          padding: '20px',
          border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          position: 'relative',
          overflow: 'hidden',
          width: '100%',
          maxWidth: '340px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        onClick={() => setShowModal(true)}
      >
        {/* Image */}
        <div style={{
          width: '100%',
          height: '200px',
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '16px',
          background: isDark ? '#0C0C0C' : '#F5F5F5',
          position: 'relative'
        }}>
          <img
            src={certificate.image_url}
            alt={certificate.title}
            loading="lazy"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.15s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
        </div>

        {/* Content */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '12px' }}>
          <FaAward style={{ fontSize: '20px', color: '#EAB308', marginTop: '2px', flexShrink: 0 }} />
          <h3 style={{
            fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
            color: '#EAB308',
            fontWeight: 600,
            lineHeight: 1.3,
            margin: 0
          }}>
            {certificate.title}
          </h3>
        </div>

        <p style={{
          color: isDark ? '#FAFAFA' : '#1A1A1A',
          fontSize: 'clamp(0.9rem, 1.8vw, 0.95rem)',
          marginBottom: '8px',
          fontWeight: 500
        }}>
          {certificate.issuer}
        </p>

        <p style={{
          color: isDark ? '#A3A3A3' : '#666666',
          fontSize: 'clamp(0.85rem, 1.6vw, 0.9rem)'
        }}>
          {certificate.date}
        </p>

        {/* View Button */}
        <motion.button
          whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
          whileTap={{ scale: 0.98 }}
          style={{
            marginTop: '16px',
            width: '100%',
            padding: '10px',
            background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.5)'}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}
        >
          View Certificate
        </motion.button>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
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
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              style={{
                position: 'relative',
                maxWidth: '95vw',
                maxHeight: '85vh',
                background: 'rgba(20, 20, 20, 0.7)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                border: '1px solid rgba(234, 179, 8, 0.3)',
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90, transition: { duration: 0.15 } }}
                whileTap={{ scale: 0.9 }}
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
                  fontSize: '20px',
                  transition: 'all 0.15s ease',
                  zIndex: 10000
                }}
                onClick={() => setShowModal(false)}
                aria-label="Close modal"
              >
                <FaTimes />
              </motion.button>
              <img
                src={certificate.image_url}
                alt={certificate.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  maxWidth: '100%',
                  maxHeight: '75vh',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  boxShadow: '0 8px 40px rgba(234, 179, 8, 0.3)'
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});

CertificateCard.displayName = 'CertificateCard';

export default CertificateCard;
