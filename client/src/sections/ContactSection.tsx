import React, { memo, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import { SectionWrapper } from '../components/ui';
import { Input, Textarea } from '../components/ui';
import { Button } from '../components/ui';
import { ContactOption } from '../types';
import styles from './ContactSection.module.css';

interface ContactSectionProps {
  theme: 'dark' | 'light';
}

const CONTACT_OPTIONS: ContactOption[] = [
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    info: 'Connect with me',
    link: 'https://www.linkedin.com/in/jagdeepmohanty',
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
    label: 'Email',
    info: 'jagdeepmohanty1807@gmail.com',
    link: 'mailto:jagdeepmohanty1807@gmail.com',
    color: '#EA4335'
  }
];

const ContactSection = memo<ContactSectionProps>(({ theme }) => {
  const isDark = theme === 'dark';

  const handleIconHover = useCallback((e: React.MouseEvent<HTMLAnchorElement>, color: string) => {
    const icon = e.currentTarget.querySelector('svg');
    if (icon) icon.style.color = color;
  }, []);

  const handleIconLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const icon = e.currentTarget.querySelector('svg');
    if (icon) icon.style.color = '#EAB308';
  }, []);

  const contactItems = useMemo(() => (
    CONTACT_OPTIONS.map((option, index) => (
      <motion.a
        key={option.label}
        href={option.link}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.contactItem}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        viewport={{ once: true }}
        whileHover={{
          scale: 1.02,
          boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)',
          borderColor: '#EAB308'
        }}
        onMouseEnter={(e) => handleIconHover(e, option.color)}
        onMouseLeave={handleIconLeave}
      >
        <option.icon style={{ fontSize: 'clamp(20px, 4vw, 24px)', color: '#EAB308', transition: 'all 0.3s ease', minWidth: '24px' }} />
        <div className={styles.contactText}>
          <span className={styles.contactLabel}>{option.label}</span>
          <span className={styles.contactInfo}>{option.info}</span>
        </div>
      </motion.a>
    ))
  ), [handleIconHover, handleIconLeave]);

  return (
    <SectionWrapper
      id="contact"
      title="Get In Touch"
      subtitle="Have a project, opportunity, or idea? Let's connect and build something impactful."
      isDark={isDark}
    >
      <motion.div
        className={styles.contactContainer}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className={styles.leftColumn}>
          {contactItems}
        </div>

        <motion.div
          className={styles.rightColumn}
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className={styles.formCard}>
            <h2 className={styles.formTitle}>Send a Message</h2>
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              className={styles.form}
            >
              <input type="hidden" name="form-name" value="contact" />
              
              <Input
                label="Name"
                type="text"
                id="name"
                name="name"
                required
                placeholder="Your Name"
                isDark={isDark}
              />

              <Input
                label="Email"
                type="email"
                id="email"
                name="email"
                required
                placeholder="your.email@example.com"
                isDark={isDark}
              />

              <Textarea
                label="Message"
                id="message"
                name="message"
                required
                placeholder="Your message..."
                isDark={isDark}
              />

              <Button type="submit">Send Message</Button>
            </form>
          </div>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
});

ContactSection.displayName = 'ContactSection';

export default ContactSection;
