import { motion } from 'framer-motion';
import { FaReact, FaNode, FaPython, FaDatabase, FaAws, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiPostgresql, SiFlask, SiExpress } from 'react-icons/si';

const AboutSection = ({ theme }) => {
  const isDark = theme === 'dark';

  const skills = [
    { name: 'React', icon: <FaReact /> },
    { name: 'Node.js', icon: <FaNode /> },
    { name: 'Python', icon: <FaPython /> },
    { name: 'Flask', icon: <SiFlask /> },
    { name: 'Express', icon: <SiExpress /> },
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'PostgreSQL', icon: <SiPostgresql /> },
    { name: 'AWS', icon: <FaAws /> },
    { name: 'Docker', icon: <FaDocker /> },
  ];

  const styles = {
    section: {
      padding: 'clamp(40px, 8vw, 60px) 20px'
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 15px'
    },
    sectionTitle: {
      fontSize: 'clamp(1.5rem, 4vw, 2rem)',
      fontWeight: 700,
      textAlign: 'center',
      marginBottom: 'clamp(25px, 5vw, 40px)',
      color: '#EAB308'
    },
    aboutCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      marginBottom: 'clamp(25px, 5vw, 40px)'
    },
    aboutHeading: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: '20px',
      fontWeight: 600
    },
    aboutText: {
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '15px',
      lineHeight: 1.6,
      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
    },
    skillsSection: {
      marginBottom: 'clamp(25px, 5vw, 40px)'
    },
    skillsHeading: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: 'clamp(20px, 4vw, 30px)',
      textAlign: 'center',
      fontWeight: 600
    },
    skillsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 'clamp(15px, 3vw, 20px)'
    },
    skillCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(15px, 3vw, 20px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`,
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      textAlign: 'center'
    },
    skillIcon: {
      fontSize: 'clamp(2rem, 4vw, 2.5rem)',
      color: '#EAB308'
    },
    skillName: {
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      fontSize: 'clamp(0.8rem, 2vw, 0.9rem)',
      fontWeight: 500
    },
    educationCard: {
      background: isDark ? '#1A1A1A' : '#FFFFFF',
      borderRadius: '10px',
      padding: 'clamp(20px, 4vw, 30px)',
      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.1)' : 'rgba(234, 179, 8, 0.2)'}`
    },
    educationHeading: {
      fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
      color: '#EAB308',
      marginBottom: '20px',
      textAlign: 'center',
      fontWeight: 600
    },
    educationDegree: {
      fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
      color: isDark ? '#FAFAFA' : '#1A1A1A',
      marginBottom: '10px',
      fontWeight: 600
    },
    educationSchool: {
      color: isDark ? '#A3A3A3' : '#666666',
      marginBottom: '5px',
      fontSize: 'clamp(0.9rem, 2vw, 1rem)'
    },
    educationYear: {
      color: '#EAB308',
      fontSize: 'clamp(0.85rem, 1.8vw, 0.9rem)'
    }
  };

  return (
    <section id="about" style={styles.section}>
      <style>{`
        @media (max-width: 1024px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          .skills-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
      <div style={styles.container}>
        <h1 style={styles.sectionTitle}>About Me</h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={styles.aboutCard}>
            <h2 style={styles.aboutHeading}>Full Stack Developer</h2>
            <p style={styles.aboutText}>
              I'm a passionate full-stack developer with expertise in building modern web applications.
              I love turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p style={styles.aboutText}>
              With experience in both frontend and backend technologies, I create seamless user experiences
              backed by robust and scalable server-side architectures.
            </p>
          </div>

          <div style={styles.skillsSection}>
            <h2 style={styles.skillsHeading}>Technical Skills</h2>
            <div style={styles.skillsGrid} className="skills-grid">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  style={styles.skillCard}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: '0 0 15px rgba(234, 179, 8, 0.4)',
                    borderColor: '#EAB308'
                  }}
                >
                  <div style={styles.skillIcon}>{skill.icon}</div>
                  <p style={styles.skillName}>{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h2 style={styles.educationHeading}>Education</h2>
            <div style={styles.educationCard}>
              <h3 style={styles.educationDegree}>Bachelor of Technology in Computer Science</h3>
              <p style={styles.educationSchool}>Rai University Ahmedabad</p>
              <p style={styles.educationYear}>2023 - 2027</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
