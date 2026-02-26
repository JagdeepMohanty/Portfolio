import { useState, useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUserTie, FaCode, FaAward, FaGithub, FaEnvelope } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'certificates', 'github', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', icon: AiFillHome, label: 'Home' },
    { id: 'about', icon: FaUserTie, label: 'About' },
    { id: 'projects', icon: FaCode, label: 'Projects' },
    { id: 'certificates', icon: FaAward, label: 'Certificates' },
    { id: 'github', icon: FaGithub, label: 'GitHub' },
    { id: 'contact', icon: FaEnvelope, label: 'Contact' },
  ];

  const handleClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        {navItems.map(({ id, icon: Icon, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`nav-icon ${activeSection === id ? 'active' : ''}`}
            data-tooltip={label}
            onClick={(e) => handleClick(e, id)}
          >
            <Icon />
          </a>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
