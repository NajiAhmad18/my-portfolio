import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <motion.div
        className={styles.container}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 50 }}
      >
        <h2 className={styles.title}>
          Let's build something <span className="text-gradient">impactful</span> together
        </h2>
        <p className={styles.subtitle}>
          Open to internships, collaborations, and exciting software engineering opportunities.
        </p>
        <div className={styles.btnWrapper}>
          <Link to="/contact" className={styles.contactBtn}>
            Get In Touch
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
