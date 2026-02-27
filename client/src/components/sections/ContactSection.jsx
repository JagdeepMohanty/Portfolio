import { motion } from 'framer-motion';
import { FaWhatsapp, FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const ContactSection = () => {
  const styles = {
    section: {
      padding: '60px 20px',
      minHeight: 'auto'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: '40px',
      color: '#EAB308'
    },
    content: {
      maxWidth: '900px',
      margin: '0 auto'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '40px'
    },
    contactCard: {
      background: '#1A1A1A',
      borderRadius: '10px',
      padding: '30px 20px',
      border: '1px solid rgba(234, 179, 8, 0.1)',
      transition: 'all 0.3s ease',
      textAlign: 'center',
      textDecoration: 'none',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '15px',
      cursor: 'pointer'
    },
    icon: {
      fontSize: '2.5rem',
      color: '#EAB308',
      transition: 'all 0.3s ease'
    },
    contactLabel: {
      fontSize: '1.1rem',
      color: '#FAFAFA',
      fontWeight: 600
    },
    contactInfo: {
      fontSize: '0.9rem',
      color: '#A3A3A3'
    },
    formCard: {
      background: '#1A1A1A',
      borderRadius: '10px',
      padding: '30px',
      border: '1px solid rgba(234, 179, 8, 0.1)'
    },
    formTitle: {
      fontSize: '1.5rem',
      color: '#EAB308',
      marginBottom: '20px',
      textAlign: 'center'
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      color: '#EAB308',
      fontWeight: 600,
      fontSize: '0.9rem'
    },
    input: {
      width: '100%',
      padding: '12px',
      background: '#0C0C0C',
      border: '1px solid rgba(234, 179, 8, 0.2)',
      borderRadius: '6px',
      color: '#FAFAFA',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none'
    },
    textarea: {
      width: '100%',
      padding: '12px',
      background: '#0C0C0C',
      border: '1px solid rgba(234, 179, 8, 0.2)',
      borderRadius: '6px',
      color: '#FAFAFA',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      outline: 'none',
      resize: 'vertical',
      minHeight: '120px'
    },
    button: {
      background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
      color: '#0C0C0C',
      padding: '12px 24px',
      borderRadius: '6px',
      fontWeight: 600,
      fontSize: '14px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease'
    },
    note: {
      textAlign: 'center',
      color: '#A3A3A3',
      fontSize: '0.85rem',
      marginTop: '15px'
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
      icon: FaEnvelope,
      label: 'Gmail',
      info: 'your.email@gmail.com',
      link: 'mailto:your.email@gmail.com',
      color: '#EA4335'
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
    }
  ];

  return (
    <section id="contact" style={styles.section}>
      <div style={styles.container}>
        <h1 style={styles.title}>Get In Touch</h1>

        <motion.div
          style={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={styles.grid}>
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.link}
                target="_blank"
                rel="noopener noreferrer"
                style={styles.contactCard}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 20px rgba(234, 179, 8, 0.3)',
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
                <option.icon style={styles.icon} />
                <span style={styles.contactLabel}>{option.label}</span>
                <span style={styles.contactInfo}>{option.info}</span>
              </motion.a>
            ))}
          </div>

          <motion.div
            style={styles.formCard}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h2 style={styles.formTitle}>Or Send a Message</h2>
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
            
            <p style={styles.note}>
              Your message will be sent via Netlify Forms. I'll get back to you as soon as possible!
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
