import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiPython, SiJavascript, SiTypescript, SiPhp, SiC,
  SiGit, SiPostman, SiFigma, SiDocker,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiTailwindcss, SiThreedotjs
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandVscode } from 'react-icons/tb';
import { useSkills } from '../../hooks/useSkills';
import { useInteraction } from '../../hooks/useInteraction';

import styles from './Skills.module.css';

const iconMap = {
  SiPython: <SiPython />,
  SiJavascript: <SiJavascript />,
  SiTypescript: <SiTypescript />,
  FaJava: <FaJava />,
  SiPhp: <SiPhp />,
  SiC: <SiC />,
  SiGit: <SiGit />,
  SiVisualstudiocode: <TbBrandVscode />,
  SiPostman: <SiPostman />,
  SiFigma: <SiFigma />,
  SiDocker: <SiDocker />,
  SiReact: <SiReact />,
  SiNodedotjs: <SiNodedotjs />,
  SiExpress: <SiExpress />,
  SiMongodb: <SiMongodb />,
  SiMysql: <SiMysql />,
  SiTailwindcss: <SiTailwindcss />,
  SiThreedotjs: <SiThreedotjs />,
};

const SkillCard = ({ skill }) => {
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
      className={`${styles.skillCard} spotlight`}
      style={{ '--border-glow-color': `${skill.color}44` }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div 
        className={styles.iconWrapper}
        style={{ color: skill.color }}
      >
        {iconMap[skill.icon]}
      </div>
      <span className={styles.skillName}>{skill.name}</span>
    </motion.div>
  );
};

const Skills = () => {
  const [activeTab, setActiveTab] = useState('programming');
  const skillsData = useSkills();
  const { triggerFeedback } = useInteraction();
  const tabs = Object.keys(skillsData);

  const currentTab = tabs.includes(activeTab) ? activeTab : (tabs[0] || 'programming');

  const handleTabClick = (tab) => {
    triggerFeedback('light');
    setActiveTab(tab);
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className="section-container">
        <div className={styles.header}>
          <span className="moduleLabel">MODULE: SKILLS</span>
          <h2 className="moduleTitle">Technical Stack</h2>
        </div>

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${currentTab === tab ? styles.active : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={currentTab}
            className={styles.grid}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {skillsData[currentTab] && skillsData[currentTab].map((skill) => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
