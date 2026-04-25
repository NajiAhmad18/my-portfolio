import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { FiSend } from 'react-icons/fi';
import ContactSvg from '../Illustrations/ContactSvg';
import styles from './Contact.module.css';

const Contact = () => {
  const form = useRef();
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const formData = new FormData(form.current);
    const email = formData.get('user_email');
    const name = formData.get('user_name');
    const message = formData.get('message');

    if (!name) newErrors.name = 'Name is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!message) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    if (!validate()) return;

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
      });

      // 2. Send via EmailJS
      const serviceID = 'service_ryez8ce';
      const templateID = 'template_m6z4pup';
      const publicKey = 'aEptkyFZEtknC7Khg';

      await emailjs.sendForm(serviceID, templateID, form.current, {
        publicKey: publicKey,
      });

      setStatus('success');
      form.current.reset();
    } catch (error) {
      console.error('FAILED...', error);
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>

        <motion.form 
          ref={form} 
          onSubmit={sendEmail} 
          className={styles.form}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.formGroup}>
            <label className={styles.label}>Name</label>
            <input 
              type="text" 
              name="user_name" 
              className={`${styles.input} ${errors.name ? styles.errorInput : ''}`} 
              placeholder="John Doe"
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email</label>
            <input 
              type="email" 
              name="user_email" 
              className={`${styles.input} ${errors.email ? styles.errorInput : ''}`} 
              placeholder="john@example.com"
            />
            {errors.email && <span className={styles.errorText}>{errors.email}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Message</label>
            <textarea 
              name="message" 
              className={`${styles.textarea} ${errors.message ? styles.errorInput : ''}`} 
              placeholder="Hello Naji, I'd like to discuss..."
            ></textarea>
            {errors.message && <span className={styles.errorText}>{errors.message}</span>}
          </div>

          <button type="submit" className={styles.submitBtn} disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Message'} <FiSend />
          </button>

          {status === 'success' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${styles.statusMessage} ${styles.success}`}>
              Message sent successfully! I'll get back to you soon.
            </motion.div>
          )}
          {status === 'error' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`${styles.statusMessage} ${styles.error}`}>
              Failed to send message. Please make sure you configured EmailJS correctly or try reaching out on LinkedIn.
            </motion.div>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center' }}
        >
          <ContactSvg />
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
