import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaCheckCircle } from 'react-icons/fa';

interface ContactSectionProps {
  theme: 'dark' | 'light';
}

interface ContactInfo {
  icon: typeof FaEnvelope;
  label: string;
  value: string;
  link: string;
}

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'jagdeepmohanty1807@gmail.com',
    link: 'mailto:jagdeepmohanty1807@gmail.com'
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Connect with me',
    link: 'https://www.linkedin.com/in/jagdeepmohanty'
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: '@JagdeepMohanty',
    link: 'https://github.com/JagdeepMohanty'
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'India',
    link: '#'
  }
];

const ContactSection = memo<ContactSectionProps>(() => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSuccess(false), 3000);
  }, []);

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(60px, 10vw, 100px) 0',
        background: '#0C0C0C',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          style={{
            textAlign: 'center',
            marginBottom: 'clamp(40px, 8vw, 60px)'
          }}
        >
          <h2 style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            fontWeight: 700,
            color: '#EAB308',
            marginBottom: '16px',
            letterSpacing: '-1px'
          }}>
            Get In Touch
          </h2>
          <p style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
            color: '#A3A3A3',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6
          }}>
            Have a project or opportunity? Let's connect and build something amazing together.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1.5fr' : '1fr',
          gap: 'clamp(24px, 4vw, 32px)'
        }}>
          {/* Left: Contact Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(26, 26, 26, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 32px)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              boxShadow: '0 0 20px rgba(234, 179, 8, 0.15)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(234, 179, 8, 0.25)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 179, 8, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 600,
              color: '#FAFAFA',
              marginBottom: '8px'
            }}>
              Contact Info
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#A3A3A3',
              marginBottom: '24px'
            }}>
              Reach out through any channel
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {CONTACT_INFO.map((info, index) => (
                <motion.a
                  key={info.label}
                  href={info.link}
                  target={info.link.startsWith('http') ? '_blank' : undefined}
                  rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02, x: 4 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    padding: '16px',
                    background: 'rgba(26, 26, 26, 0.4)',
                    borderRadius: '12px',
                    border: '1px solid rgba(234, 179, 8, 0.1)',
                    textDecoration: 'none',
                    cursor: info.link === '#' ? 'default' : 'pointer',
                    transition: 'all 0.3s ease',
                    pointerEvents: info.link === '#' ? 'none' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    if (info.link !== '#') {
                      e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.4)';
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.15)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '10px',
                    background: 'rgba(234, 179, 8, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    <info.icon style={{
                      fontSize: '20px',
                      color: '#EAB308'
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: '0.75rem',
                      color: '#A3A3A3',
                      marginBottom: '2px',
                      fontWeight: 500
                    }}>
                      {info.label}
                    </div>
                    <div style={{
                      fontSize: '0.875rem',
                      color: '#FAFAFA',
                      fontWeight: 500,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {info.value}
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Send Message Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            style={{
              background: 'rgba(26, 26, 26, 0.6)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 32px)',
              border: '1px solid rgba(234, 179, 8, 0.3)',
              boxShadow: '0 0 20px rgba(234, 179, 8, 0.15)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 0 30px rgba(234, 179, 8, 0.25)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 0 20px rgba(234, 179, 8, 0.15)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <h3 style={{
              fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
              fontWeight: 600,
              color: '#FAFAFA',
              marginBottom: '24px'
            }}>
              Send Message
            </h3>

            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              onSubmit={handleSubmit}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '20px'
              }}
            >
              <input type="hidden" name="form-name" value="contact" />

              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(12, 12, 12, 0.6)',
                    border: `2px solid ${focusedField === 'name' ? '#EAB308' : 'rgba(234, 179, 8, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#FAFAFA',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: focusedField === 'name' ? '0 0 0 4px rgba(234, 179, 8, 0.1)' : 'none'
                  }}
                  placeholder="Your Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(12, 12, 12, 0.6)',
                    border: `2px solid ${focusedField === 'email' ? '#EAB308' : 'rgba(234, 179, 8, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#FAFAFA',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: focusedField === 'email' ? '0 0 0 4px rgba(234, 179, 8, 0.1)' : 'none'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  required
                  rows={5}
                  style={{
                    width: '100%',
                    padding: '14px 16px',
                    background: 'rgba(12, 12, 12, 0.6)',
                    border: `2px solid ${focusedField === 'message' ? '#EAB308' : 'rgba(234, 179, 8, 0.2)'}`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: '#FAFAFA',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    minHeight: '120px',
                    boxShadow: focusedField === 'message' ? '0 0 0 4px rgba(234, 179, 8, 0.1)' : 'none'
                  }}
                  placeholder="Your message..."
                />
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting || isSuccess}
                whileHover={{ scale: (isSubmitting || isSuccess) ? 1 : 1.02 }}
                whileTap={{ scale: (isSubmitting || isSuccess) ? 1 : 0.98 }}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: isSuccess 
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : isSubmitting 
                    ? 'rgba(234, 179, 8, 0.5)' 
                    : 'linear-gradient(135deg, #EAB308, #F59E0B)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0C0C0C',
                  cursor: (isSubmitting || isSuccess) ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: (isSubmitting || isSuccess) ? 'none' : '0 4px 20px rgba(234, 179, 8, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting && !isSuccess) {
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(234, 179, 8, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting && !isSuccess) {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSuccess ? (
                  <>
                    <FaCheckCircle />
                    Message Sent!
                  </>
                ) : isSubmitting ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      style={{
                        width: '18px',
                        height: '18px',
                        border: '2px solid #0C0C0C',
                        borderTopColor: 'transparent',
                        borderRadius: '50%'
                      }}
                    />
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
