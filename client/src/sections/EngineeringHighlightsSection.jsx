import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaRocket, FaServer, FaTachometerAlt, FaMobile } from 'react-icons/fa';

const HIGHLIGHTS = [
  {
    icon: FaCode,
    title: 'Clean Code Structure',
    description: 'Writing maintainable, scalable code following industry best practices and design patterns'
  },
  {
    icon: FaRocket,
    title: 'Scalable Architecture',
    description: 'Building robust systems designed to handle growth and increased complexity'
  },
  {
    icon: FaServer,
    title: 'REST API Integration',
    description: 'Seamless integration with backend services and third-party APIs'
  },
  {
    icon: FaTachometerAlt,
    title: 'Performance Optimization',
    description: 'Optimizing load times, bundle sizes, and runtime performance'
  },
  {
    icon: FaMobile,
    title: 'Responsive UI Design',
    description: 'Creating pixel-perfect, mobile-first interfaces that work across all devices'
  }
];

const EngineeringHighlightsSection = memo(({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section
      id="highlights"
      style={{
        padding: 'clamp(40px, 8vw, 60px) 20px',
        background: isDark ? '#0A0A0A' : '#F8F8F8'
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        <h2 style={{
          fontSize: 'clamp(1.8rem, 4.5vw, 2.2rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: '16px',
          color: '#EAB308'
        }}>
          Engineering Highlights
        </h2>
        <p style={{
          textAlign: 'center',
          color: isDark ? '#A3A3A3' : '#666666',
          fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
          marginBottom: 'clamp(35px, 6vw, 50px)',
          maxWidth: '700px',
          margin: '0 auto clamp(35px, 6vw, 50px) auto',
          lineHeight: 1.6
        }}>
          Core engineering principles I follow in every project
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: 'clamp(20px, 4vw, 25px)'
        }}>
          {HIGHLIGHTS.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(234, 179, 8, 0.3)'
                }}
                style={{
                  background: isDark ? '#1A1A1A' : '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
                  transition: 'all 0.3s ease',
                  textAlign: 'center'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '12px',
                  background: 'rgba(234, 179, 8, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px auto'
                }}>
                  <Icon style={{
                    fontSize: '28px',
                    color: '#EAB308'
                  }} />
                </div>
                <h3 style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                  color: '#EAB308',
                  marginBottom: '12px',
                  fontWeight: 600
                }}>
                  {highlight.title}
                </h3>
                <p style={{
                  color: isDark ? '#A3A3A3' : '#666666',
                  fontSize: 'clamp(0.9rem, 1.9vw, 0.95rem)',
                  lineHeight: 1.6
                }}>
                  {highlight.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

EngineeringHighlightsSection.displayName = 'EngineeringHighlightsSection';

export default EngineeringHighlightsSection;
