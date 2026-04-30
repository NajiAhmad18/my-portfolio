import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiGlobe, FiCpu, FiSmartphone } from 'react-icons/fi';
import styles from './WhatsNext.module.css';

const upcoming = [
  {
    id: 1,
    icon: <FiCpu />,
    title: 'AI-Powered Code Review Tool',
    description: 'A developer tool that uses LLMs to review pull requests and suggest improvements automatically.',
    tags: ['LLM', 'GitHub API', 'Node.js'],
    status: 'Idea',
    progress: 10
  },
  {
    id: 2,
    icon: <FiGlobe />,
    title: 'Real-Time Whiteboard',
    description: 'Collaborative whiteboard with live cursors and diagram tools, built on WebSockets.',
    tags: ['WebSockets', 'React', 'Canvas API'],
    status: 'Prototyping',
    progress: 30
  },
  {
    id: 3,
    icon: <FiSmartphone />,
    title: 'Health Tracker App',
    description: 'Mobile app that connects with wearables to track vitals and surfaces AI-driven health recommendations.',
    tags: ['React Native', 'AI/ML', 'Bluetooth'],
    status: 'Research',
    progress: 15
  }
];

const RoadmapCard = ({ item }) => {
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
      className={`${styles.card} spotlight`}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <div className={styles.cardHeader}>
        <div className={styles.icon}>{item.icon}</div>
        <span className={styles.statusBadge}>{item.status}</span>
      </div>
      
      <h3 className={styles.title}>{item.title}</h3>
      <p className={styles.desc}>{item.description}</p>

      <div className={styles.tags}>
        {item.tags.map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
      </div>

      <div className={styles.progressSection}>
        <div className={styles.progressInfo}>
          <span>Phase Progress</span>
          <span>{item.progress}%</span>
        </div>
        <div className={styles.progressBar}>
          <motion.div 
            className={styles.progressFill}
            initial={{ width: 0 }}
            whileInView={{ width: `${item.progress}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

const WhatsNext = () => {
  return (
    <section id="whats-next" className={styles.roadmap}>
      <div className="section-container">
        <div className={styles.header}>
          <span className="moduleLabel">MODULE: ROADMAP</span>
          <h2 className="moduleTitle">What I'm Building Next</h2>
        </div>

        <div className={styles.grid}>
          {upcoming.map((item) => (
            <RoadmapCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatsNext;
