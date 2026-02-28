import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaMapMarkerAlt, FaUser, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <motion.div
          className="contact-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="contact-heading">Get In Touch</h1>
          <p className="contact-subheading">
            Have a project, opportunity, or idea? Let's connect and build something impactful.
          </p>
        </motion.div>

        <motion.div
          className="contact-layout"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Left Side - Contact Info Card */}
          <div className="contact-card">
            <div className="contact-info">
              <a href="mailto:jagdeep@email.com" className="info-item">
                <FaEnvelope className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Email</span>
                  <span className="info-value">jagdeep@email.com</span>
                </div>
              </a>

              <a
                href="https://github.com/JagdeepMohanty"
                target="_blank"
                rel="noopener noreferrer"
                className="info-item"
              >
                <FaGithub className="info-icon" />
                <div className="info-text">
                  <span className="info-label">GitHub</span>
                  <span className="info-value">github.com/jagdeep</span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/jagdeep"
                target="_blank"
                rel="noopener noreferrer"
                className="info-item"
              >
                <FaLinkedin className="info-icon" />
                <div className="info-text">
                  <span className="info-label">LinkedIn</span>
                  <span className="info-value">linkedin.com/in/jagdeep</span>
                </div>
              </a>

              <div className="info-item">
                <FaMapMarkerAlt className="info-icon" />
                <div className="info-text">
                  <span className="info-label">Location</span>
                  <span className="info-value">India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Contact Form Card */}
          <div className="contact-card form-card">
            {isSubmitted && (
              <div className="success-message">
                ✓ Message sent successfully!
              </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <FaUser className="input-icon" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
                <label className="floating-label">Name</label>
              </div>

              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="contact-input"
                />
                <label className="floating-label">Email</label>
              </div>

              <div className="input-group">
                <FaPaperPlane className="textarea-icon" />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="contact-textarea"
                />
                <label className="floating-label">Message</label>
              </div>

              <button type="submit" className="submit-button">
                <FaPaperPlane />
                Send Message
              </button>
            </form>
          </div>
        </motion.div>

        {/* Bottom Social Icons Row */}
        <motion.div
          className="social-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://github.com/JagdeepMohanty"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/jagdeep"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <FaLinkedin />
          </a>
          <a href="mailto:jagdeep@email.com" className="social-icon">
            <FaEnvelope />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
