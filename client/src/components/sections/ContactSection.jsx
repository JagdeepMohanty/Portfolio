import { useState } from 'react';
import { motion } from 'framer-motion';
import './ContactSection.css';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Netlify Forms handle submission automatically
  // The form uses data-netlify="true" attribute
  // Status will be handled by Netlify's form submission
  const handleSubmit = (e) => {
    // Let Netlify Forms handle the submission
    // The page will reload or show Netlify's success message
    setStatus({ type: 'success', message: 'Redirecting to Netlify form submission...' });
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <h1 className="section-title">Get In Touch</h1>

        <motion.div
          className="contact-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="contact-card card">
            {/* Netlify Forms - hidden input for form name */}
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true" 
              onSubmit={handleSubmit}
              className="contact-form"
            >
              <input type="hidden" name="form-name" value="contact" />
              
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Your message..."
                />
              </div>

              <button type="submit" className="btn-primary">
                Send Message
              </button>

              {status.message && (
                <p className={`status-message ${status.type}`}>
                  {status.message}
                </p>
              )}
            </form>
            
            <p className="form-note">
              Your message will be sent via Netlify Forms. I'll get back to you as soon as possible!
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
