import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { SiLeetcode, SiHackerrank } from 'react-icons/si';
import styles from './CodingProfiles.module.css';

const CodingProfiles = () => {
  const profiles = [
    {
      name: 'GitHub',
      icon: <FiGithub />,
      link: 'https://github.com/NajiAhmad18',
      color: 'var(--text-main)'
    },
    {
      name: 'LeetCode',
      icon: <SiLeetcode />,
      link: 'https://leetcode.com/u/NajiAhmad/',
      color: '#FFA116'
    },
    {
      name: 'HackerRank',
      icon: <SiHackerrank />,
      link: 'https://www.hackerrank.com/profile/naji_a_javahir',
      color: '#00EA64'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { type: 'spring', stiffness: 100 }
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
    <section id="profiles" className={styles.profiles}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Coding Profiles
        </motion.h2>

        <motion.div 
          className={styles.container}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {profiles.map((profile) => (
            <motion.a
              key={profile.name}
              href={profile.link}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.profileCard}
              variants={itemVariants}
              onMouseMove={handleMouseMove}
              style={{ '--icon-color': profile.color }}
            >
              <div className={styles.profileCardInner}>
                <div className={styles.iconWrapper}>
                  {profile.icon}
                </div>
                <span className={styles.platformName}>{profile.name}</span>
                <FiExternalLink className={styles.externalIcon} />
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
