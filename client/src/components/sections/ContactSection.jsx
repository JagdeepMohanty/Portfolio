import { motion } from 'framer-motion';
import { FaWhatsapp, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactSection = ({ theme }) => {
  const isDark = theme === 'dark';

  const styles = {
    section: {
      padding: 'clamp(40px, 8vw, 60px) 20px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px'
    },
    title: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '16px',
      color: '#EAB308'
    },
    subtitle: {
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '40px',
      fontSize: 'clamp(0.9rem, 2vw, 15px)',
      textAlign: 'center',
      maxWidth: '700px',
      margin: '0 auto 40px',
      lineHeight: 1.6,
      padding: '0 10px'
    },
    contactContainer: {
      display: 'flex',
      justifyContent: 'space-between',
      gap: 'clamp(20px, 5vw, 40px)',
      flexWrap: 'wrap'
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(15px, 3vw, 20px)',
      flex: '1',
      minWidth: '280px'
    },
    rightColumn: {
      flex: '1',
      minWidth: '280px'
    },
    contactItem: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(15px, 3vw, 20px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      cursor: 'pointer'
    },
    contactIcon: {
      fontSize: 'clamp(20px, 4vw, 24px)',
      color: '#EAB308',
      transition: 'all 0.3s ease',
      minWidth: '24px'
    },
    contactText: {
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },
    contactLabel: {
      fontSize: 'clamp(0.9rem, 2vw, 1rem)',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontWeight: 600
    },
    contactInfo: {
      fontSize: 'clamp(0.8rem, 1.8vw, 0.85rem)',
      color: isDark ? '#A3A3A3' : '#666666'
    },
    formCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      height: '100%'
    },
    formTitle: {
      fontSize: 'clamp(1.1rem, 2.5vw, 1.3rem)',
      color: '#EAB308',
      marginBottom: '20px',
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'clamp(15px, 3vw, 18px)'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      color: '#EAB308',
      fontWeight: 600,
      fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)'
    },
    input: {
      width: '100%',
      padding: 'clamp(10px, 2vw, 12px)',
      background: isDark ? '#0C0C0C' : '#F5F5F5',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
      borderRadius: '6px',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontSize: 'clamp(13px, 2vw, 14px)',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: 'clamp(10px, 2vw, 12px)',
      background: isDark ? '#0C0C0C' : '#F5F5F5',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
      borderRadius: '6px',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontSize: 'clamp(13px, 2vw, 14px)',
      transition: 'all 0.3s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '100px'
    },
    button: {
      background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
      color: '#0C0C0C',
      padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 24px)',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: 'clamp(13px, 2vw, 14px)',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    }
  };

  const contactOptions = [
    {
      icon: FaWhatsapp,
      label: 'WhatsApp',
      info: '+91 YOUR_NUMBER',
      link: 'https://wa.me/YOUR_NUMBER',
      color: '#25D366'
    },
    {
      icon: FaLinkedin,
      label: 'LinkedIn',
      info: 'Connect with me',
      link: 'https://linkedin.com/in/jagdeep-mohanty',
      color: '#0A66C2'
    },
    {
      icon: FaGithub,
      label: 'GitHub',
      info: '@JagdeepMohanty',
      link: 'https://github.com/JagdeepMohanty',
      color: '#FAFAFA'
    },
    {
      icon: FaEnvelope,
      label: 'Gmail',
      info: 'your.email@gmail.com',
      link: 'mailto:your.email@gmail.com',
      color: '#EA4335'
    }
  ];

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.title}>Get In Touch</h1>
        <p style={styles.subtitle}>
          Let's connect and discuss opportunities. I'm always ready to collaborate and open to new projects.
        </p>

        <motion.div
          style={styles.contactContainer}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Left Column - Contact Methods */}
          <div style={styles.leftColumn}>
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contactItem}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)',
                  borderColor: '#EAB308'
                }}
                onMouseEnter={(e) => {
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = option.color;
                }}
                onMouseLeave={(e) => {
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = '#EAB308';
                }}
              >
                <option.icon style={styles.contactIcon} />
                <div style={styles.contactText}>
                  <span style={styles.contactLabel}>{option.label}</span>
                  <span style={styles.contactInfo}>{option.info}</span>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Right Column - Contact Form */}
          <motion.div
            style={styles.rightColumn}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div style={styles.formCard}>
              <h2 style={styles.formTitle}>Send a Message</h2>
              <form 
                name="contact" 
                method="POST" 
                data-netlify="true"
                style={styles.form}
              >
                <input type="hidden" name="form-name" value="contact" />
                
                <div style={styles.formGroup}>
                  <label htmlFor="name" style={styles.label}>Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your Name"
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EAB308';
                      e.target.style.boxShadow = '0 0 10px rgba(234, 179, 8, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(234, 179, 8, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="email" style={styles.label}>Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="your.email@example.com"
                    style={styles.input}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EAB308';
                      e.target.style.boxShadow = '0 0 10px rgba(234, 179, 8, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(234, 179, 8, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label htmlFor="message" style={styles.label}>Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Your message..."
                    style={styles.textarea}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EAB308';
                      e.target.style.boxShadow = '0 0 10px rgba(234, 179, 8, 0.2)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(234, 179, 8, 0.2)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>

                <button 
                  type="submit" 
                  style={styles.button}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 0 15px rgba(234, 179, 8, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
