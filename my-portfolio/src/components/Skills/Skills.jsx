import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  SiPython, SiJavascript, SiTypescript, SiPhp, SiC,
  SiGit, SiPostman, SiFigma, SiDocker,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiMysql, SiTailwindcss, SiThreedotjs
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbBrandVscode } from 'react-icons/tb';
import { skillsData } from '../../data/skills';

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

const Skills = () => {
  const [activeTab, setActiveTab] = useState('programming');
  const tabs = Object.keys(skillsData);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      }
    },
    exit: { 
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.9
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { duration: 0.2 }
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
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          My Skills
        </motion.h2>

        <div className={styles.tabs}>
          {tabs.map(tab => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.active : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            className={styles.grid}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {skillsData[activeTab].map((skill, index) => (
              <motion.div 
                key={skill.name} 
                className={styles.skillCard}
                variants={itemVariants}
                onMouseMove={handleMouseMove}
              >
                <div className={styles.skillCardInner}>
                  <div 
                    className={styles.iconWrapper}
                    style={{ color: skill.color }}
                  >
                    {iconMap[skill.icon]}
                  </div>
                  <span className={styles.skillName}>{skill.name}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Skills;
