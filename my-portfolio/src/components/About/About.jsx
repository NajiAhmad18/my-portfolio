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
      {/* Decorative background elements */}
      <div className={styles.bgBlob} />
      
      <div className="section-container">
        <motion.div 
          className={styles.header}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className={styles.svgWrapper}>
             <EngineeringSvg />
          </div>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div 
            className={styles.imageSection}
            variants={imageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.imageCard} onMouseMove={handleMouseMove}>
              <div className={styles.imageInner}>
                <img src={profileImg} alt="Naji Ahmad Javahir" className={styles.profileImage} />
                <div className={styles.imageOverlay} />
              </div>
              <div className={styles.cardDecoration} />
            </div>
          </motion.div>

          <motion.div 
            className={styles.textSection}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={styles.introBox}>
              <span className={styles.hello}>Hello! I'm Naji</span>
              <p className={styles.description}>
                {aboutText || "As a Software Engineering student, I am dedicated to bridging the gap between complex problems and elegant, scalable solutions. My approach is rooted in structured thinking and the pursuit of clean, maintainable code. Whether building high-performance web applications or architecting backend systems, I strive to create impactful user experiences that solve real-world challenges with precision and creativity."}
              </p>
            </div>

            <div className={styles.highlightsGrid}>
              <div className={styles.highlightCard}>
                <div className={styles.cardIcon}><FiMapPin /></div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Location</span>
                  <span className={styles.cardValue}>Sri Lanka</span>
                </div>
              </div>
              
              <div className={styles.highlightCard}>
                <div className={styles.cardIcon}><FiCode /></div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Experience</span>
                  <span className={styles.cardValue}>{siteSubtitle || 'SWE Undergraduate'}</span>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.cardIcon}><FiTarget /></div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Goal</span>
                  <span className={styles.cardValue}>Software Engineer</span>
                </div>
              </div>

              <div className={styles.highlightCard}>
                <div className={styles.cardIcon}><FiStar /></div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardLabel}>Focus</span>
                  <span className={styles.cardValue}>Clean Code</span>
                </div>
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
