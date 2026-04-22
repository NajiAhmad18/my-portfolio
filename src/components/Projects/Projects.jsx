import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { projectsData } from '../../data/projects';
import ProjectModal from './ProjectModal';
import styles from './Projects.module.css';

const TiltCard = ({ project, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

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
          <button className={styles.linkBtn} onClick={(e) => { e.stopPropagation(); window.open(project.githubLink, '_blank'); }}>
            <FiGithub /> Source
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className={styles.projects}>
      <div className="section-container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Featured Projects
        </motion.h2>

        <div className={styles.grid}>
          {projectsData.map(project => (
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
