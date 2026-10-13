import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMapPin, FiMail, FiTerminal } from 'react-icons/fi';
import styles from './About.module.css';
import { useInteraction } from '../../hooks/useInteraction';
import profileImg from '../../assets/profile.jpg';
import MetricsDashboard from './MetricsDashboard';

const RESUME_FILE_NAME = 'Naji_Ahmad_Javahir_Internship_Resume.pdf';
const RESUME_DOWNLOAD_URL = `/${RESUME_FILE_NAME}?v=20261013`;

const About = () => {
  const { triggerFeedback } = useInteraction();

  const handleDownload = () => {
    triggerFeedback('medium');
  };

  const details = [
    {
      icon: <FiTerminal />,
      label: 'Role',
      value: 'Full-Stack Engineer',
    },
    {
      icon: <FiMapPin />,
      label: 'Location',
      value: 'Colombo, Sri Lanka',
    },
    {
      icon: <FiMail />,
      label: 'Email',
      value: 'naji.a.javahir@gmail.com',
    },
  ];

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

        <div className={styles.grid}>

          {/* ── LEFT SIDE (Image) ── */}
          <motion.div
            className={styles.photoCol}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            <div
              className={styles.imageContainer}
              onMouseMove={handleMouseMove}
            >
              <div className={styles.imageWrapper}>
                <img
                  src={profileImg}
                  alt="Naji Ahmad Javahir"
                  className={styles.image}
                />
              </div>
            </div>
          </motion.div>

          {/* ── RIGHT SIDE (Content) ── */}
          <motion.div
            className={styles.content}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            <div className={styles.header}>
              <span className="moduleLabel">01 / About</span>
              <h2 className="roleTitle">Systems work best when every layer has a clear job.</h2>
            </div>

            <p className={styles.focusLine}>
              I design practical software from the request boundary through to the data it relies on.
            </p>

            <p className={styles.text}>
              I build practical software with clean architecture, database design, and performance-aware implementation.
            </p>

            <p className={styles.availabilityLine}>
              Available for internships and junior engineering roles.
            </p>

            {/* Key Details Grid */}
            <div className={styles.detailsGrid}>
              {details.map((item, i) => (
                <div key={i} className={styles.detailItem}>
                  <div>
                    <span className={styles.detailLabel}>{item.label}</span>
                    <span className={styles.detailValue}>{item.value}</span>
                  </div>
                </div>
              ))}

              <div className={styles.detailItem}>
                <div>
                  <span className={styles.detailLabel}>Resume</span>
                  <a
                    href={RESUME_DOWNLOAD_URL}
                    download={RESUME_FILE_NAME}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.downloadLink}
                    onClick={handleDownload}
                  >
                    <FiDownload /> Download
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* ── Metrics Dashboard ── */}
        <MetricsDashboard />

      </div>
    </section>
  );
};

export default About;
