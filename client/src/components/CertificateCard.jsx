import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaTimes } from 'react-icons/fa';

const CertificateCard = ({ certificate }) => {
  const [showModal, setShowModal] = useState(false);

  const styles = {
    card: {
      background: '#1A1A1A',
      borderRadius: '10px',
      padding: '15px',
      border: '1px solid rgba(234, 179, 8, 0.1)',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative'
    },
    imageContainer: {
      width: '100%',
      height: '140px',
      overflow: 'hidden',
      borderRadius: '8px',
      marginBottom: '12px',
      position: 'relative'
    },
    image: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      transition: 'transform 0.3s ease'
    },
    eyeIcon: {
      position: 'absolute',
      top: '12px',
      right: '12px',
      cursor: 'pointer',
      color: '#EAB308',
      fontSize: '22px',
      background: 'rgba(12, 12, 12, 0.8)',
      padding: '10px',
      borderRadius: '50%',
      transition: 'all 0.3s ease',
      zIndex: 10
    },
    title: {
      fontSize: '1rem',
      color: '#EAB308',
      marginBottom: '6px',
      fontWeight: 600,
      lineHeight: 1.3
    },
    issuer: {
      color: '#FAFAFA',
      marginBottom: '4px',
      fontSize: '0.9rem',
      lineHeight: 1.4
    },
    date: {
      color: '#A3A3A3',
      fontSize: '0.8rem'
    },
    modalOverlay: {
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
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90vw',
      maxHeight: '90vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '90vh',
      objectFit: 'contain',
      borderRadius: '8px',
      border: '2px solid #EAB308'
    },
    closeButton: {
      position: 'absolute',
      top: '-40px',
      right: '0',
      background: '#EAB308',
      color: '#0C0C0C',
      border: 'none',
      borderRadius: '50%',
      width: '40px',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      fontSize: '1.2rem',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <>
      <motion.div
        style={styles.card}
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
        <div style={styles.imageContainer}>
          <img src={certificate.image_url} alt={certificate.title} style={styles.image} />
          <FaEye 
            style={styles.eyeIcon}
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
        <h3 style={styles.title}>{certificate.title}</h3>
        <p style={styles.issuer}>{certificate.issuer}</p>
        <p style={styles.date}>{certificate.date}</p>
      </motion.div>

      {showModal && (
        <div 
          style={styles.modalOverlay}
          onClick={() => setShowModal(false)}
        >
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              style={styles.closeButton}
              onClick={() => setShowModal(false)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
                e.currentTarget.style.background = '#F59E0B';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.background = '#EAB308';
              }}
            >
              <FaTimes />
            </button>
            <img 
              src={certificate.image_url} 
              alt={certificate.title} 
              style={styles.modalImage}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CertificateCard;
