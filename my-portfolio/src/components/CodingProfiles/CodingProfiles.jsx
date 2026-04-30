import React from 'react';
import { motion } from 'framer-motion';
import { SiLeetcode, SiGeeksforgeeks, SiGithub, SiCodeforces } from 'react-icons/si';
import { FiExternalLink } from 'react-icons/fi';
import styles from './CodingProfiles.module.css';

const CodingProfiles = () => {
  const profiles = [
    {
      name: 'GitHub',
      icon: <SiGithub />,
      link: 'https://github.com/NajiAhmad18',
      color: 'var(--text-main)'
    },
    {
      name: 'LeetCode',
      icon: <SiLeetcode />,
      link: 'https://leetcode.com/najiahmad/',
      color: '#FFA116'
    },
    {
      name: 'GeeksforGeeks',
      icon: <SiGeeksforgeeks />,
      link: 'https://auth.geeksforgeeks.org/user/najiahmad/',
      color: '#2F8D46'
    },
    {
      name: 'Codeforces',
      icon: <SiCodeforces />,
      link: 'https://codeforces.com/profile/najiahmad',
      color: '#1F8ACB'
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
        <div className={styles.header}>
          <span className="moduleLabel">MODULE: PROFILES</span>
          <h2 className="moduleTitle">Coding Profiles</h2>
        </div>

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
              style={{ '--accent-primary': profile.color }}
            >
              <div className={styles.profileCardInner}>
                <div 
                  className={styles.iconWrapper}
                  style={{ '--icon-color': profile.color }}
                >
                  {profile.icon}
                </div>
                <span className={styles.platformName}>{profile.name}</span>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CodingProfiles;
