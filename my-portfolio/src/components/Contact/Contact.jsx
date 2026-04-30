import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';
import { useInteraction } from '../../hooks/useInteraction';

const Contact = () => {
  const form = useRef();
  const { triggerFeedback } = useInteraction();
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    triggerFeedback('medium');
    setIsSubmitting(true);
    setStatus('');

    const formData = new FormData(form.current);
    const name = formData.get('user_name');
    const email = formData.get('user_email');
    const message = formData.get('message');

    try {
      // 1. Save to Database
      const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/messages`;
      await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      }).catch(err => console.log('DB save failed, but proceeding with email', err)); // Non-blocking

      // 2. Send via EmailJS
      const serviceID = 'service_ryez8ce';
      const templateID = 'template_m6z4pup';
      const publicKey = 'aEptkyFZEtknC7Khg';

      await emailjs.sendForm(serviceID, templateID, form.current, {
        publicKey: publicKey,
      });

      setStatus('Payload delivered successfully.');
      form.current.reset();
    } catch (error) {
      console.error('FAILED...', error);
      setStatus('Delivery failed.');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.grid}>
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span className="moduleLabel">MODULE: CONTACT</span>
          <h2 className="moduleTitle">Let’s Work Together</h2>
        </motion.div>

        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <form className={styles.form} ref={form} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
              <label htmlFor="user_name">Name</label>
              <input 
                type="text" 
                id="user_name" 
                name="user_name" 
                placeholder="e.g. John Doe" 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="user_email">Email</label>
              <input 
                type="email" 
                id="user_email" 
                name="user_email" 
                placeholder="e.g. john@example.com" 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="message">Message</label>
              <textarea 
                id="message" 
                name="message" 
                placeholder="Enter your message here..." 
                required
              ></textarea>
            </div>
            
            <div className={styles.actions}>
              <button 
                type="submit" 
                className={styles.submitBtn}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
              {status && <span className={styles.status}>{status}</span>}
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
