import React from 'react';
import { motion } from 'framer-motion';
import styles from './CTA.module.css';

const CTA = () => {
  return (
    <section className={styles.cta}>
      <motion.div 
        className={styles.container}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, type: "spring", stiffness: 50 }}
      >
        <h2 className={styles.title}>Let's build something <span className="text-gradient">impactful</span> together</h2>
        
        <div className={styles.btnWrapper}>
          <a href="#contact" className={styles.contactBtn}>
            Contact Me
          </a>
        </div>
      </motion.div>
    </section>
  );
};

export default CTA;
