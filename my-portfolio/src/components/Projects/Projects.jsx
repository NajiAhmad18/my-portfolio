import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiExternalLink, FiGithub } from 'react-icons/fi';
import { useProjects } from '../../hooks/useProjects';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';
import { useTheme } from '../../context/ThemeContext';
import { HealthcareIcon, RevolveIcon, VacationIcon, PharmacyIcon, BiddingIcon } from './ProjectIcons';

const projectIcons = {
  1: HealthcareIcon,
  2: RevolveIcon,
  3: VacationIcon,
  4: PharmacyIcon,
  5: BiddingIcon
};

const TiltCard = ({ project, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const { activeTheme } = useTheme();
  const IconComponent = projectIcons[project.id] || HealthcareIcon;

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
    
    e.currentTarget.style.setProperty('--mouse-x', `${mouseX}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${mouseY}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={styles.projectCard}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        '--card-color': project.color
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.6
      }}
    >
      <div className={styles.projectCardInner} style={{ transform: "translateZ(30px)" }}>
        <div className={styles.projectImageContainer}>
          {IconComponent && (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <IconComponent color={project.color} theme={activeTheme} mouseX={mouseXSpring} mouseY={mouseYSpring} />
            </div>
          )}
        </div>
        <h3 className={styles.title}>{project.title}</h3>
        <p className={styles.shortDesc}>{project.shortDesc}</p>
        
        <div className={styles.techStack}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech} className={styles.techBadge}>{tech}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className={styles.techBadge}>+{project.techStack.length - 3}</span>
          )}
        </div>

        <div className={styles.links}>
          <button
            className={styles.linkBtn}
            onClick={(e) => { e.stopPropagation(); if (project.demoLink && project.demoLink !== '#') window.open(project.demoLink, '_blank'); }}
            style={{ '--card-color': project.color, opacity: project.demoLink && project.demoLink !== '#' ? 1 : 0.4, cursor: project.demoLink && project.demoLink !== '#' ? 'pointer' : 'not-allowed' }}
          >
            <FiExternalLink /> Live Demo
          </button>
          <button
            className={styles.linkBtn}
            onClick={(e) => { e.stopPropagation(); if (project.githubLink && project.githubLink !== '#') window.open(project.githubLink, '_blank'); }}
            style={{ '--card-color': project.color }}
          >
            <FiGithub /> Source
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const projects = useProjects();

  return (
    <section id="projects" className={styles.projects}>
      <div className="section-container">
        <div className={styles.header}>
          <span className="moduleLabel">MODULE: PROJECTS</span>
          <h2 className="moduleTitle">Deployed Systems</h2>
        </div>

        <div className={styles.grid}>
          {projects.map(project => (
            <TiltCard 
              key={project.id} 
              project={project} 
              onClick={setSelectedProject} 
            />
          ))}
        </div>
      </div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
};

export default Projects;
