import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiCode, FiTarget, FiStar } from 'react-icons/fi';
import profileImg from '../../assets/profile.jpg';
import EngineeringSvg from '../Illustrations/EngineeringSvg';
import styles from './About.module.css';
import MetricsDashboard from './MetricsDashboard';
import { useSettings } from '../../hooks/useSettings';

const About = () => {
  const { aboutText, siteSubtitle } = useSettings();
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 }
    }
  };



  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="about" className={styles.about}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          About Me
        </motion.h2>

        <div className={styles.content}>
          <motion.div 
            className={styles.textContent}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <p className={styles.description}>
              {aboutText || 'Software Engineering Undergraduate focused on designing and developing practical, scalable software solutions. I prioritize structured thinking and clean code to deliver real solutions to complex problems.'}
            </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              style={{ width: '120px', margin: '1rem 0' }}
            >
              <EngineeringSvg />
            </motion.div>

            <div className={styles.highlights}>
              <div className={styles.highlightItem}>
                <div className={styles.icon}><FiMapPin /></div>
                <div>
                  <strong>Location</strong>
                  <div className={styles.itemText}>Sri Lanka</div>
                </div>
              </div>
              
              <div className={styles.highlightItem}>
                <div className={styles.icon}><FiCode /></div>
                <div>
                  <strong>Background</strong>
                  <div className={styles.itemText}>{siteSubtitle || 'Software Engineering Undergraduate'}</div>
                </div>
              </div>

              <div className={styles.highlightItem}>
                <div className={styles.icon}><FiTarget /></div>
                <div>
                  <strong>Career Goal</strong>
                  <div className={styles.itemText}>Software Engineer</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className={styles.imageContent}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div 
              className={styles.imageContainer}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.imageWrapper}>
                <img src={profileImg} alt="Naji Ahmad Javahir" className={styles.profileImage} />
                <div className={styles.imageOverlay}></div>
              </div>
            </div>
          </motion.div>
        </div>

        <MetricsDashboard />
      </div>
    </section>
  );
};

export default About;
