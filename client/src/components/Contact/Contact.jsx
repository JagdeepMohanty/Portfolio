import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const styles = {
    section: {
      padding: '80px 20px',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    container: {
      maxWidth: '1100px',
      margin: '0 auto',
      width: '100%'
    },
    header: {
      textAlign: 'center',
      marginBottom: '50px'
    },
    heading: {
      fontSize: 'clamp(2rem, 5vw, 2.5rem)',
      fontWeight: 700,
      color: '#e5e7eb',
      marginBottom: '15px',
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    },
    subheading: {
      fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
      color: '#9ca3af',
      lineHeight: 1.6,
      maxWidth: '700px',
      margin: '0 auto'
    },
    mainLayout: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '30px',
      marginBottom: '50px'
    },
    card: {
      background: 'rgba(17, 24, 39, 0.6)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '12px',
      padding: '30px',
      transition: 'all 0.3s ease'
    },
    infoCard: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    infoItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      padding: '15px',
      background: 'rgba(59, 130, 246, 0.05)',
      borderRadius: '8px',
      border: '1px solid rgba(59, 130, 246, 0.1)',
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      color: 'inherit'
    },
    icon: {
      fontSize: '24px',
      color: '#3b82f6',
      minWidth: '24px'
    },
    infoText: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    infoLabel: {
      fontSize: '14px',
      color: '#9ca3af',
      fontWeight: 500
    },
    infoValue: {
      fontSize: '16px',
      color: '#e5e7eb',
      fontWeight: 600
    },
    formCard: {
      position: 'relative'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    inputGroup: {
      position: 'relative'
    },
    inputIcon: {
      position: 'absolute',
      left: '15px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#3b82f6',
      fontSize: '18px',
      pointerEvents: 'none',
      zIndex: 1
    },
    textareaIcon: {
      position: 'absolute',
      left: '15px',
      top: '15px',
      color: '#3b82f6',
      fontSize: '18px',
      pointerEvents: 'none',
      zIndex: 1
    },
    input: {
      width: '100%',
      padding: '15px 15px 15px 45px',
      background: 'rgba(31, 41, 55, 0.5)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '8px',
      color: '#e5e7eb',
      fontSize: '15px',
      outline: 'none',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box'
    },
    textarea: {
      width: '100%',
      padding: '15px 15px 15px 45px',
      background: 'rgba(31, 41, 55, 0.5)',
      border: '1px solid rgba(59, 130, 246, 0.2)',
      borderRadius: '8px',
      color: '#e5e7eb',
      fontSize: '15px',
      outline: 'none',
      transition: 'all 0.3s ease',
      resize: 'vertical',
      minHeight: '120px',
      fontFamily: 'inherit',
      boxSizing: 'border-box'
    },
    button: {
      padding: '15px 30px',
      background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
      border: 'none',
      borderRadius: '8px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 600,
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px'
    },
    successMessage: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(16, 185, 129, 0.9)',
      backdropFilter: 'blur(10px)',
      padding: '20px 40px',
      borderRadius: '12px',
      color: '#fff',
      fontSize: '16px',
      fontWeight: 600,
      textAlign: 'center',
      zIndex: 10,
      boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)'
    },
    socialRow: {
      display: 'flex',
      justifyContent: 'center',
      gap: '20px',
      marginTop: '20px'
    },
    socialIcon: {
      width: '50px',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(17, 24, 39, 0.6)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '50%',
      color: '#3b82f6',
      fontSize: '22px',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      textDecoration: 'none'
    }
  };

  return (
    <section id="contact" style={styles.section}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes successFade {
          0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
          10% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          90% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        }

        .contact-section {
          animation: fadeIn 0.8s ease-out;
        }

        .info-item:hover {
          background: rgba(59, 130, 246, 0.1) !important;
          border-color: rgba(59, 130, 246, 0.3) !important;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
          transform: translateX(5px);
        }

        .contact-input:focus {
          border-color: #3b82f6 !important;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.3) !important;
        }

        .contact-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.4);
        }

        .contact-button:active {
          transform: translateY(0);
        }

        .social-icon:hover {
          transform: scale(1.15);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          border-color: #3b82f6;
        }

        .success-message {
          animation: successFade 3s ease-out forwards;
        }

        @media (max-width: 1024px) {
          .main-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .contact-section {
            padding: 60px 20px !important;
          }
        }

        @media (max-width: 768px) {
          .main-layout {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
          .contact-section {
            padding: 40px 15px !important;
          }
          .social-row {
            gap: 15px !important;
          }
        }
      `}</style>

      <div style={styles.container} className="contact-section">
        <motion.div
          style={styles.header}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 style={styles.heading}>Get In Touch</h1>
          <p style={styles.subheading}>
            Have a project, opportunity, or idea? Let's connect and build something impactful.
          </p>
        </motion.div>

        <motion.div
          style={styles.mainLayout}
          className="main-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Side - Contact Info Card */}
          <div style={styles.card}>
            <div style={styles.infoCard}>
              <a
                href="mailto:jagdeep@email.com"
                style={styles.infoItem}
                className="info-item"
              >
                <FaEnvelope style={styles.icon} />
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>Email</span>
                  <span style={styles.infoValue}>jagdeep@email.com</span>
                </div>
              </a>

              <a
                href="https://github.com/JagdeepMohanty"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.infoItem}
                className="info-item"
              >
                <FaGithub style={styles.icon} />
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>GitHub</span>
                  <span style={styles.infoValue}>@JagdeepMohanty</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/jagdeep"
                target="_blank"
                rel="noopener noreferrer"
                style={styles.infoItem}
                className="info-item"
              >
                <FaLinkedin style={styles.icon} />
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>LinkedIn</span>
                  <span style={styles.infoValue}>linkedin.com/in/jagdeep</span>
                </div>
              </a>

              <div style={styles.infoItem} className="info-item">
                <FaMapMarkerAlt style={styles.icon} />
                <div style={styles.infoText}>
                  <span style={styles.infoLabel}>Location</span>
                  <span style={styles.infoValue}>India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form Card */}
          <div style={{ ...styles.card, ...styles.formCard }}>
            {isSubmitted && (
              <div style={styles.successMessage} className="success-message">
                ✓ Message sent successfully!
              </div>
            )}

            <form style={styles.form} onSubmit={handleSubmit}>
              <div style={styles.inputGroup}>
                <FaUser style={styles.inputIcon} />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="contact-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <FaEnvelope style={styles.inputIcon} />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  className="contact-input"
                />
              </div>

              <div style={styles.inputGroup}>
                <FaPaperPlane style={styles.textareaIcon} />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  style={styles.textarea}
                  className="contact-input"
                />
              </div>

              <button type="submit" style={styles.button} className="contact-button">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Social Icons Row */}
        <motion.div
          style={styles.socialRow}
          className="social-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/JagdeepMohanty"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialIcon}
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/jagdeep"
            target="_blank"
            rel="noopener noreferrer"
            style={styles.socialIcon}
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a
            href="mailto:jagdeep@email.com"
            style={styles.socialIcon}
            className="social-icon"
          >
            <FaEnvelope />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
