import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaDatabase, FaGitAlt, FaDocker, FaDownload, FaChartBar, FaFileWord } from 'react-icons/fa';
import { SiMongodb, SiNextdotjs, SiTypescript, SiJavascript, SiPython, SiCplusplus, SiExpress, SiVite, SiC } from 'react-icons/si';

const SKILL_CATEGORIES = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'Vite', icon: SiVite }
    ]
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'Express', icon: SiExpress },
      { name: 'Python', icon: SiPython }
    ]
  },
  {
    title: 'Database',
    skills: [
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'MongoDB Atlas', icon: SiMongodb },
      { name: 'SQL', icon: FaDatabase }
    ]
  },
  {
    title: 'Programming',
    skills: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus }
    ]
  },
  {
    title: 'Tools',
    skills: [
      { name: 'Git', icon: FaGitAlt },
      { name: 'Docker', icon: FaDocker },
      { name: 'Power BI', icon: FaChartBar },
      { name: 'MS Office', icon: FaFileWord }
    ]
  }
];

const AboutSection = memo(({ theme }) => {
  const isDark = theme === 'dark';

  return (
    <section 
      id="about"
      style={{
        padding: 'clamp(40px, 8vw, 60px) 20px'
      }}
    >
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
          .education-grid {
            grid-template-columns: 1fr !important;
            gap: 20px !important;
          }
        }
      `}</style>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 clamp(16px, 4vw, 32px)'
      }}>
        <h1 style={{
          fontSize: 'clamp(1.5rem, 4vw, 2rem)',
          fontWeight: 700,
          textAlign: 'center',
          marginBottom: 'clamp(25px, 5vw, 40px)',
          color: '#EAB308'
        }}>
          About Me
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div style={{
            background: isDark ? '#1A1A1A' : '#FFFFFF',
            borderRadius: '10px',
            padding: '20px',
            border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.15)' : 'rgba(234, 179, 8, 0.2)'}`,
            marginBottom: 'clamp(25px, 5vw, 40px)',
            maxWidth: '900px',
            margin: '0 auto clamp(25px, 5vw, 40px) auto'
          }}>
            <p style={{
              color: isDark ? '#A3A3A3' : '#666666',
              lineHeight: 1.7,
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              textAlign: 'center'
            }}>
              I'm a Full-Stack Developer passionate about building scalable, high-performance web applications. With expertise in React, Node.js, TypeScript, and modern development tools, I create efficient solutions that solve real-world problems. I focus on clean code architecture, performance optimization, and delivering exceptional user experiences.
            </p>
          </div>

          {/* Download Resume Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 'clamp(35px, 6vw, 50px)'
          }}>
            <motion.a
              href="https://drive.google.com/file/d/1mFGEvqzAGL5TyVS6kR6CuobXCljSI89L/view?usp=sharing"
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{
                background: 'linear-gradient(135deg, #EAB308, #F59E0B)',
                color: '#0C0C0C',
                padding: '14px 32px',
                borderRadius: '10px',
                fontWeight: 600,
                fontSize: '16px',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                textDecoration: 'none',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(234, 179, 8, 0.3)',
                fontFamily: 'Inter, system-ui, sans-serif'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 6px 30px rgba(234, 179, 8, 0.5)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(234, 179, 8, 0.3)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
              aria-label="Download Resume"
            >
              <FaDownload /> Download Resume
            </motion.a>
          </div>

          <div style={{
            marginBottom: 'clamp(25px, 5vw, 40px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#EAB308',
              marginBottom: 'clamp(25px, 4vw, 35px)',
              textAlign: 'center',
              fontWeight: 600
            }}>
              Technical Skills
            </h2>
            
            {SKILL_CATEGORIES.map((category, catIndex) => (
              <div key={catIndex} style={{ marginBottom: 'clamp(25px, 4vw, 35px)' }}>
                <h3 style={{
                  fontSize: 'clamp(1rem, 2.2vw, 1.1rem)',
                  color: isDark ? '#FAFAFA' : '#1A1A1A',
                  marginBottom: '16px',
                  fontWeight: 600,
                  textAlign: 'center'
                }}>
                  {category.title}
                </h3>
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '12px',
                  justifyContent: 'center',
                  maxWidth: '600px',
                  margin: '0 auto'
                }}>
                  {category.skills.map((skill, index) => {
                    const IconComponent = skill.icon;
                    return (
                      <div
                        key={index}
                        style={{
                          background: isDark ? '#1A1A1A' : '#FFFFFF',
                          color: '#EAB308',
                          padding: '10px 18px',
                          borderRadius: '8px',
                          fontSize: '14px',
                          fontWeight: 500,
                          border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.4)'}`,
                          cursor: 'default',
                          transition: 'all 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'scale(1.05)';
                          e.currentTarget.style.backgroundColor = '#EAB308';
                          e.currentTarget.style.color = '#000';
                          const icon = e.currentTarget.querySelector('.skill-icon');
                          if (icon) icon.style.color = '#000';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'scale(1)';
                          e.currentTarget.style.backgroundColor = isDark ? '#1A1A1A' : '#FFFFFF';
                          e.currentTarget.style.color = '#EAB308';
                          const icon = e.currentTarget.querySelector('.skill-icon');
                          if (icon) icon.style.color = '#EAB308';
                        }}
                      >
                        <IconComponent 
                          className="skill-icon"
                          style={{
                            fontSize: '20px',
                            color: '#EAB308'
                          }}
                        />
                        <span>{skill.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#EAB308',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              textAlign: 'center',
              fontWeight: 600
            }}>
              Education
            </h2>
            <div 
              className="education-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'clamp(20px, 4vw, 30px)',
                maxWidth: '900px',
                margin: '0 auto'
              }}
            >
              {/* Education Card 1 - B.Tech */}
              <motion.div
                style={{
                  background: isDark ? '#1A1A1A' : '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
                  transition: 'all 0.3s ease'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(234, 179, 8, 0.3)'
                }}
              >
                <h3 style={{
                  color: '#EAB308',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.2rem)',
                  fontWeight: 600,
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  B.Tech in Computer Science
                </h3>
                <p style={{
                  color: isDark ? '#FAFAFA' : '#1A1A1A',
                  fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                  marginBottom: '8px',
                  lineHeight: 1.4,
                  fontWeight: 500
                }}>
                  Rai University, Ahmedabad
                </p>
                <p style={{
                  color: '#A3A3A3',
                  fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)'
                }}>
                  2023 – 2027
                </p>
              </motion.div>

              {/* Education Card 2 - Senior Secondary */}
              <motion.div
                style={{
                  background: isDark ? '#1A1A1A' : '#FFFFFF',
                  borderRadius: '12px',
                  padding: '24px',
                  border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
                  transition: 'all 0.3s ease'
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{
                  scale: 1.03,
                  boxShadow: '0 8px 25px rgba(234, 179, 8, 0.3)'
                }}
              >
                <h3 style={{
                  color: '#EAB308',
                  fontSize: 'clamp(1.1rem, 2.5vw, 1.2rem)',
                  fontWeight: 600,
                  marginBottom: '12px',
                  lineHeight: 1.3
                }}>
                  Senior Secondary Education
                </h3>
                <p style={{
                  color: isDark ? '#FAFAFA' : '#1A1A1A',
                  fontSize: 'clamp(0.95rem, 2vw, 1rem)',
                  marginBottom: '8px',
                  lineHeight: 1.4,
                  fontWeight: 500
                }}>
                  Kendriya Vidyalaya No.1, Balasore
                </p>
                <p style={{
                  color: '#A3A3A3',
                  fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)'
                }}>
                  2021 – 2023
                </p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
