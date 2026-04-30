import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useProjects } from '../../hooks/useProjects';
import { useSkills } from '../../hooks/useSkills';
import { FiGithub, FiCode, FiBox, FiCoffee } from 'react-icons/fi';
import styles from './MetricsDashboard.module.css';

const MetricCard = ({ metric, index }) => {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mouse-x', `${x}px`);
    cardRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`${styles.metricCard} spotlight`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <div className={styles.iconWrapper}>
        <metric.icon />
      </div>
      
      <div className={styles.content}>
        <div className={styles.value}>{metric.value}</div>
        <div className={styles.label}>{metric.label}</div>
      </div>
    </motion.div>
  );
};

const MetricsDashboard = () => {
  const projects = useProjects();
  const skillsGrouped = useSkills();

  // Calculate real-time numbers
  const projectCount = Array.isArray(projects) ? projects.length : 0;
  
  // Count total skills across all categories
  const skillCount = Object.values(skillsGrouped).reduce((acc, category) => {
    return acc + (Array.isArray(category) ? category.length : 0);
  }, 0);

  const metrics = [
    { 
      id: 1, 
      label: 'Projects Completed', 
      value: projectCount, 
      icon: FiBox
    },
    { 
      id: 2, 
      label: 'Technologies Used', 
      value: skillCount, 
      icon: FiCode
    },
    { id: 3, label: 'GitHub Commits', value: '500+', icon: FiGithub },
    { id: 4, label: 'Cups of Coffee', value: '∞', icon: FiCoffee },
  ];

  return (
    <div className={styles.dashboard}>
      <motion.h3 
        className={styles.title}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        By The Numbers
      </motion.h3>
      
      <div className={styles.grid}>
        {metrics.map((metric, index) => (
          <MetricCard key={metric.id} metric={metric} index={index} />
        ))}
      </div>
    </div>
  );
};

export default MetricsDashboard;
