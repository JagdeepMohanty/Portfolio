import { useState, useCallback, memo } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';

interface ContactSectionProps {
  theme: 'dark' | 'light';
}

interface ContactInfo {
  icon: typeof FaEnvelope;
  label: string;
  value: string;
  link: string;
  color: string;
}

const CONTACT_INFO: ContactInfo[] = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'jagdeepmohanty1807@gmail.com',
    link: 'mailto:jagdeepmohanty1807@gmail.com',
    color: '#EA4335'
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'Connect with me',
    link: 'https://www.linkedin.com/in/jagdeepmohanty',
    color: '#0A66C2'
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: '@JagdeepMohanty',
    link: 'https://github.com/JagdeepMohanty',
    color: '#FAFAFA'
  },
  {
    icon: FaMapMarkerAlt,
    label: 'Location',
    value: 'India',
    link: '#',
    color: '#EAB308'
  }
];

const ContactSection = memo<ContactSectionProps>(({ theme }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isDark = theme === 'dark';

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  }, []);

  return (
    <section
      id="contact"
      style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 5vw, 40px)',
        background: isDark ? '#0C0C0C' : '#F5F5F5',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%'
      }}>
        {/* Header */}
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
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: 700,
            color: '#EAB308',
            marginBottom: '16px',
            fontFamily: 'Inter, system-ui, sans-serif',
            letterSpacing: '-1px'
          }}>
            Get In Touch
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 2.5vw, 18px)',
            color: isDark ? '#A3A3A3' : '#666666',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 1.6,
            fontFamily: 'Inter, system-ui, sans-serif'
          }}>
            Have a project, opportunity, or idea? Let's connect and build something impactful together.
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth >= 768 ? '1fr 1.2fr' : '1fr',
            gap: 'clamp(24px, 4vw, 32px)',
            background: isDark 
              ? 'rgba(26, 26, 26, 0.6)' 
              : 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '20px',
            padding: 'clamp(24px, 5vw, 40px)',
            border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`,
            boxShadow: isDark 
              ? '0 8px 32px rgba(0, 0, 0, 0.4)' 
              : '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}
        >
          {/* Left: Contact Info */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <h3 style={{
                fontSize: 'clamp(20px, 3vw, 24px)',
                fontWeight: 600,
                color: isDark ? '#FAFAFA' : '#1A1A1A',
                marginBottom: '8px',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Contact Information
              </h3>
              <p style={{
                fontSize: '14px',
                color: isDark ? '#A3A3A3' : '#666666',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}>
                Feel free to reach out through any of these channels
              </p>
            </div>

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
                whileHover={{ 
                  scale: 1.02,
                  x: 4
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  background: isDark 
                    ? 'rgba(26, 26, 26, 0.4)' 
                    : 'rgba(255, 255, 255, 0.4)',
                  borderRadius: '12px',
                  border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.15)'}`,
                  textDecoration: 'none',
                  cursor: info.link === '#' ? 'default' : 'pointer',
                  transition: 'all 0.3s ease',
                  pointerEvents: info.link === '#' ? 'none' : 'auto'
                }}
                onMouseEnter={(e) => {
                  if (info.link !== '#') {
                    e.currentTarget.style.borderColor = 'rgba(234, 179, 8, 0.4)';
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.15)';
                    const icon = e.currentTarget.querySelector('svg');
                    if (icon) icon.style.color = info.color;
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.15)';
                  e.currentTarget.style.boxShadow = 'none';
                  const icon = e.currentTarget.querySelector('svg');
                  if (icon) icon.style.color = '#EAB308';
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
                    color: '#EAB308',
                    transition: 'color 0.3s ease'
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: '12px',
                    color: isDark ? '#A3A3A3' : '#666666',
                    marginBottom: '2px',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    fontWeight: 500
                  }}>
                    {info.label}
                  </div>
                  <div style={{
                    fontSize: '14px',
                    color: isDark ? '#FAFAFA' : '#1A1A1A',
                    fontFamily: 'Inter, system-ui, sans-serif',
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

          {/* Right: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            style={{
              background: isDark 
                ? 'rgba(26, 26, 26, 0.4)' 
                : 'rgba(255, 255, 255, 0.4)',
              borderRadius: '16px',
              padding: 'clamp(24px, 4vw, 32px)',
              border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.15)'}`
            }}
          >
            <h3 style={{
              fontSize: 'clamp(20px, 3vw, 24px)',
              fontWeight: 600,
              color: isDark ? '#FAFAFA' : '#1A1A1A',
              marginBottom: '24px',
              fontFamily: 'Inter, system-ui, sans-serif'
            }}>
              Send a Message
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

              {/* Name Input */}
              <div style={{ position: 'relative' }}>
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
                    background: isDark ? 'rgba(12, 12, 12, 0.6)' : 'rgba(245, 245, 245, 0.8)',
                    border: `2px solid ${
                      focusedField === 'name' 
                        ? '#EAB308' 
                        : isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.25)'
                    }`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: isDark ? '#FAFAFA' : '#1A1A1A',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: focusedField === 'name' 
                      ? '0 0 0 4px rgba(234, 179, 8, 0.1)' 
                      : 'none'
                  }}
                  placeholder="Your Name"
                />
              </div>

              {/* Email Input */}
              <div style={{ position: 'relative' }}>
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
                    background: isDark ? 'rgba(12, 12, 12, 0.6)' : 'rgba(245, 245, 245, 0.8)',
                    border: `2px solid ${
                      focusedField === 'email' 
                        ? '#EAB308' 
                        : isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.25)'
                    }`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: isDark ? '#FAFAFA' : '#1A1A1A',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: focusedField === 'email' 
                      ? '0 0 0 4px rgba(234, 179, 8, 0.1)' 
                      : 'none'
                  }}
                  placeholder="your.email@example.com"
                />
              </div>

              {/* Message Textarea */}
              <div style={{ position: 'relative' }}>
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
                    background: isDark ? 'rgba(12, 12, 12, 0.6)' : 'rgba(245, 245, 245, 0.8)',
                    border: `2px solid ${
                      focusedField === 'message' 
                        ? '#EAB308' 
                        : isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.25)'
                    }`,
                    borderRadius: '10px',
                    fontSize: '15px',
                    color: isDark ? '#FAFAFA' : '#1A1A1A',
                    fontFamily: 'Inter, system-ui, sans-serif',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical',
                    minHeight: '120px',
                    boxShadow: focusedField === 'message' 
                      ? '0 0 0 4px rgba(234, 179, 8, 0.1)' 
                      : 'none'
                  }}
                  placeholder="Your message..."
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: isSubmitting 
                    ? 'rgba(234, 179, 8, 0.5)' 
                    : 'linear-gradient(135deg, #EAB308, #F59E0B)',
                  border: 'none',
                  borderRadius: '10px',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: '#0C0C0C',
                  fontFamily: 'Inter, system-ui, sans-serif',
                  cursor: isSubmitting ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: isSubmitting 
                    ? 'none' 
                    : '0 4px 20px rgba(234, 179, 8, 0.3)'
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.boxShadow = '0 6px 30px rgba(234, 179, 8, 0.5)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.3)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }
                }}
              >
                {isSubmitting ? (
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
        </motion.div>
      </div>
    </section>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
