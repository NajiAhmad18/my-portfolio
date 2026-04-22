import React from 'react';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import styles from './Hero.module.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <section id="hero" className={styles.hero}>
      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={itemVariants} className={styles.greeting}>
          Hello, I'm
        </motion.p>

        <motion.h1 variants={itemVariants} className={styles.name}>
          Naji Ahmad <span className="text-gradient">Javahir</span>
        </motion.h1>

        <motion.h2 variants={itemVariants} className={styles.role}>
          Software Engineering Student
        </motion.h2>

        <motion.p variants={itemVariants} className={styles.tagline}>
          Aspiring Software Engineer passionate about building scalable, efficient, and user-focused applications that solve real-world problems.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.ctaGroup}>
          <a href="#projects" className={`${styles.btn} ${styles.primary}`}>
            View Projects
          </a>
          <a href="/resume.pdf" download className={`${styles.btn} ${styles.secondary}`}>
            Download Resume
          </a>
        </motion.div>
      </motion.div>

      <div className={styles.scrollIndicator}>
        <span>Scroll</span>
        <FiChevronDown />
      </div>
    </section>
  );
};

export default Hero;
