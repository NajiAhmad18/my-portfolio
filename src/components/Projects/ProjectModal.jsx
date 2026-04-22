import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';
import styles from './Projects.module.css';

const ProjectModal = ({ project, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && project && (
        <motion.div 
          className={styles.modalOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            className={styles.modalContent}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            style={{ borderTop: `4px solid ${project.color}` }}
          >
            <button className={styles.closeBtn} onClick={onClose}>
              <FiX />
            </button>

            <h3 className={styles.modalTitle}>{project.title}</h3>
            
            <div className={styles.techStack} style={{ marginBottom: '2rem' }}>
              {project.techStack.map(tech => (
                <span key={tech} className={styles.techBadge}>{tech}</span>
              ))}
            </div>

            <h4 className={styles.modalSectionTitle}>About the Project</h4>
            <p className={styles.modalDesc}>{project.description}</p>

            <div className={styles.links} style={{ marginTop: '3rem' }}>
              <a 
                href={project.demoLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.linkBtn}
                style={{ '--card-color': project.color }}
              >
                <FiExternalLink /> Live Demo
              </a>
              <a 
                href={project.githubLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.linkBtn}
                style={{ '--card-color': project.color }}
              >
                <FiGithub /> Source Code
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;
