import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Certificates', path: '/certificates' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link to="/" className="logo">
            <span className="logo-text">Jagdeep Mohanty </span>
          </Link>

          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hamburger" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
