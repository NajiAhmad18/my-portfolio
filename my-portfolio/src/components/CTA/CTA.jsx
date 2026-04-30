import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { FiChevronRight } from 'react-icons/fi';
import styles from './CTA.module.css';
import { useInteraction } from '../../hooks/useInteraction';

const CTA = () => {
  const { triggerFeedback } = useInteraction();
  const terminalRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!terminalRef.current) return;
    const rect = terminalRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    terminalRef.current.style.setProperty('--mouse-x', `${x}px`);
    terminalRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const handleAction = () => {
    triggerFeedback('medium');
    window.location.href = '/contact';
  };

  return (
    <section className={styles.cta}>
      <div className="section-container">
        <motion.div
          ref={terminalRef}
          onMouseMove={handleMouseMove}
          className={`${styles.terminalContainer} spotlight`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Terminal Header */}
          <div className={styles.terminalHeader}>
            <div className={styles.dots}>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
              <span className={styles.dot}></span>
            </div>
            <div className={styles.terminalTitle}>bash — collaboration.sh</div>
          </div>

          {/* Terminal Content */}
          <div className={styles.terminalBody}>
            <div className={styles.line}>
              <span className={styles.prompt}>$</span>
              <span className={styles.command}>initiate --collaboration</span>
            </div>
            
            <div className={styles.output}>
              <h2 className={styles.heading}>
                Let's build something impactful together.
              </h2>
              <p className={styles.subheading}>
                I'm currently available for internships, client projects, and 
                engineering collaborations.
              </p>
            </div>

            <div className={styles.actionRow}>
              <button className={styles.actionBtn} onClick={handleAction}>
                <span className={styles.btnLabel}>Start Conversation</span>
                <FiChevronRight className={styles.btnIcon} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
