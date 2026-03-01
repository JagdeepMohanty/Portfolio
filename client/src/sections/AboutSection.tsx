import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaJs, FaNodeJs, FaDatabase, FaPython, FaAws, FaDocker, FaGitAlt } from 'react-icons/fa';
import { SiMongodb, SiFlask, SiNextdotjs, SiTypescript, SiC, SiCplusplus } from 'react-icons/si';
import { IconType } from 'react-icons';

interface AboutSectionProps {
  theme: 'dark' | 'light';
}

interface Skill {
  name: string;
  icon: IconType;
}

const SKILLS: Skill[] = [
  { name: 'HTML', icon: FaHtml5 },
  { name: 'CSS', icon: FaCss3Alt },
  { name: 'React', icon: FaReact },
  { name: 'JavaScript', icon: FaJs },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'SQL', icon: FaDatabase },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'Python', icon: FaPython },
  { name: 'Flask', icon: SiFlask },
  { name: 'AWS', icon: FaAws },
  { name: 'Docker', icon: FaDocker },
  { name: 'Git / GitHub', icon: FaGitAlt },
  { name: 'C', icon: SiC },
  { name: 'C++', icon: SiCplusplus },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript }
];

const AboutSection = memo<AboutSectionProps>(({ theme }) => {
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
        padding: '0 15px'
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
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#EAB308',
              marginBottom: '20px',
              fontWeight: 600
            }}>
              Software Engineer
            </h2>
            <p style={{
              color: isDark ? '#A3A3A3' : '#666666',
              marginBottom: '15px',
              lineHeight: 1.6,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              I'm a Full-Stack Developer who enjoys building modern, scalable, and user-focused web applications that solve real-world problems. I specialize in technologies like React, Node.js, Python, Flask, and MongoDB, and I focus on creating clean interfaces backed by efficient and reliable systems. I enjoy turning ideas into practical products and continuously improving the quality and performance of my work.
            </p>
            <p style={{
              color: isDark ? '#A3A3A3' : '#666666',
              marginBottom: '15px',
              marginTop: '12px',
              lineHeight: 1.6,
              fontSize: 'clamp(0.9rem, 2vw, 1rem)'
            }}>
              Alongside development, I have a strong interest in Data Analytics, Data Science, and Artificial Intelligence. I'm curious about how data can drive decisions and power intelligent solutions. I'm a hardworking and consistent learner who enjoys exploring new technologies, taking on challenges, and growing every day. My goal is to contribute to impactful projects, gain real-world experience, and evolve into a versatile software engineer capable of building meaningful and intelligent solutions.
            </p>
          </div>

          <div style={{
            marginBottom: 'clamp(25px, 5vw, 40px)'
          }}>
            <h2 style={{
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              color: '#EAB308',
              marginBottom: 'clamp(20px, 4vw, 30px)',
              textAlign: 'center',
              fontWeight: 600
            }}>
              Technical Skills
            </h2>
            <div 
              className="skills-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '15px',
                maxWidth: '700px',
                margin: '20px auto 0 auto'
              }}
            >
              {SKILLS.map((skill, index) => {
                const IconComponent = skill.icon;
                return (
                  <div
                    key={index}
                    style={{
                      background: isDark ? '#1A1A1A' : '#FFFFFF',
                      color: '#EAB308',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      textAlign: 'center',
                      fontSize: '14px',
                      fontWeight: 500,
                      border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.3)' : 'rgba(234, 179, 8, 0.4)'}`,
                      cursor: 'default',
                      transition: 'all 0.3s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '8px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.backgroundColor = '#EAB308';
                      e.currentTarget.style.color = '#000';
                      const icon = e.currentTarget.querySelector('.skill-icon') as HTMLElement;
                      if (icon) icon.style.color = '#000';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.backgroundColor = isDark ? '#1A1A1A' : '#FFFFFF';
                      e.currentTarget.style.color = '#EAB308';
                      const icon = e.currentTarget.querySelector('.skill-icon') as HTMLElement;
                      if (icon) icon.style.color = '#EAB308';
                    }}
                  >
                    <IconComponent 
                      className="skill-icon"
                      style={{
                        fontSize: '28px',
                        color: '#EAB308'
                      }}
                    />
                    <span>{skill.name}</span>
                  </div>
                );
              })}
            </div>
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
            <motion.div
              style={{
                background: isDark ? '#1A1A1A' : '#FFFFFF',
                borderRadius: '12px',
                padding: '20px',
                border: `1px solid ${isDark ? 'rgba(234, 179, 8, 0.2)' : 'rgba(234, 179, 8, 0.3)'}`,
                maxWidth: '900px',
                margin: '0 auto'
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.02,
                boxShadow: '0 0 15px rgba(234, 179, 8, 0.3)'
              }}
            >
              <div 
                className="education-grid"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '30px',
                  alignItems: 'start'
                }}
              >
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h3 style={{
                    color: '#EAB308',
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    fontWeight: 600,
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}>
                    Senior Secondary
                  </h3>
                  <p style={{
                    color: isDark ? '#FAFAFA' : '#1A1A1A',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    marginBottom: '8px',
                    lineHeight: 1.4
                  }}>
                    Kendriya Vidyalaya No.1 Balasore
                  </p>
                  <p style={{
                    color: '#A3A3A3',
                    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)'
                  }}>
                    2021 – 2023
                  </p>
                </div>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center'
                }}>
                  <h3 style={{
                    color: '#EAB308',
                    fontSize: 'clamp(1rem, 2.5vw, 1.1rem)',
                    fontWeight: 600,
                    marginBottom: '8px',
                    lineHeight: 1.3
                  }}>
                    Bachelor of Technology in Computer Science
                  </h3>
                  <p style={{
                    color: isDark ? '#FAFAFA' : '#1A1A1A',
                    fontSize: 'clamp(0.9rem, 2vw, 1rem)',
                    marginBottom: '8px',
                    lineHeight: 1.4
                  }}>
                    Rai University Ahmedabad
                  </p>
                  <p style={{
                    color: '#A3A3A3',
                    fontSize: 'clamp(0.85rem, 1.8vw, 0.95rem)'
                  }}>
                    2023 – 2027
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
});

AboutSection.displayName = 'AboutSection';

export default AboutSection;
