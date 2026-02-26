import { motion } from 'framer-motion';
import { FaReact, FaNode, FaPython, FaDatabase, FaAws, FaDocker } from 'react-icons/fa';
import { SiMongodb, SiPostgresql, SiFlask, SiExpress } from 'react-icons/si';
import './AboutSection.css';

const AboutSection = () => {
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

  return (
    <section id="about" className="about-section section">
      <div className="container">
        <h1 className="section-title">About Me</h1>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="about-card card">
            <h2 className="about-heading">Full Stack Developer</h2>
            <p className="about-text">
              I'm a passionate full-stack developer with expertise in building modern web applications.
              I love turning complex problems into simple, beautiful, and intuitive solutions.
            </p>
            <p className="about-text">
              With experience in both frontend and backend technologies, I create seamless user experiences
              backed by robust and scalable server-side architectures.
            </p>
          </div>

          <div className="skills-section">
            <h2 className="skills-heading">Technical Skills</h2>
            <div className="skills-grid grid grid-3">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  className="skill-card card"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <p className="skill-name">{skill.name}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="education-section">
            <h2 className="education-heading">Education</h2>
            <div className="education-card card">
              <h3 className="education-degree">Bachelor of Technology in Computer Science</h3>
              <p className="education-school">Rai University Ahmedabad</p>
              <p className="education-year">2023 - 2027</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
