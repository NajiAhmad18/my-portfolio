import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import styles from './Hero.module.css';
import { useSettings } from '../../hooks/useSettings';

const MagneticName = ({ firstName, lastName }) => {
  const ref = useRef(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const rotateX = useTransform(springY, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(springX, [-0.5, 0.5], ['-8deg', '8deg']);
  const translateY = useTransform(springY, [-0.5, 0.5], ['-6px', '6px']);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) / (rect.width / 2));
    y.set((e.clientY - centerY) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.h1
      ref={ref}
      className={styles.name}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, translateY, transformStyle: 'preserve-3d', perspective: 800 }}
    >
      <span>{firstName} </span>
      <span className="text-gradient">{lastName}</span>
    </motion.h1>
  );
};

const Hero = () => {
  const { resumeUrl, siteTitle, siteSubtitle, aboutText, resumeOriginalName } = useSettings();
  
  const nameParts = siteTitle?.split(' ') || ['Naji', 'Ahmad'];
  const firstName = nameParts.slice(0, -1).join(' ') || 'Naji';
  const lastName = nameParts[nameParts.length - 1] || 'Ahmad';

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

        <motion.div variants={itemVariants}>
          <MagneticName firstName={firstName} lastName={lastName} />
        </motion.div>

        <motion.h2 variants={itemVariants} className={styles.role}>
          {siteSubtitle || 'Software Engineering Undergraduate'}
        </motion.h2>

        <motion.p variants={itemVariants} className={styles.tagline}>
          {aboutText || 'Structured thinking. Clean code. Real solutions.'}
        </motion.p>

        <motion.div variants={itemVariants} className={styles.ctaGroup}>
          <a href="#projects" className={`${styles.btn} ${styles.primary}`}>
            View Projects
          </a>
          <a 
            href={resumeUrl ? `${resumeUrl}${resumeUrl.includes('?') ? '&' : '?'}v=${Date.now()}` : '#'} 
            download={resumeOriginalName || "Resume.pdf"} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={`${styles.btn} ${styles.secondary}`}
          >
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


