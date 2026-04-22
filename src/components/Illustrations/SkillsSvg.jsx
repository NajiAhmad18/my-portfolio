import React from 'react';
import styles from './Illustrations.module.css';

const SkillsSvg = () => {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox="0 0 400 200" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg" style={{ maxHeight: '150px' }}>
        {/* Background glow */}
        <circle cx="200" cy="100" r="80" fill="var(--accent-primary)" opacity="0.1" className={styles.floatingElement} />
        
        {/* Center Node */}
        <circle cx="200" cy="100" r="25" fill="var(--bg-darker)" stroke="var(--accent-primary)" strokeWidth="4" />
        <circle cx="200" cy="100" r="10" fill="var(--accent-secondary)" className={styles.gear} />

        {/* Connecting Lines */}
        <path d="M200 75 L200 40" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M200 125 L200 160" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M175 100 L140 100" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M225 100 L260 100" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M182 82 L155 55" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M218 118 L245 145" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M218 82 L245 55" stroke="var(--glass-border)" strokeWidth="3" />
        <path d="M182 118 L155 145" stroke="var(--glass-border)" strokeWidth="3" />

        {/* Outer Nodes */}
        <g className={styles.floatingElement} style={{ animationDelay: '0s' }}>
          <circle cx="200" cy="40" r="12" fill="var(--glass-bg)" stroke="var(--text-muted)" strokeWidth="2" />
          <circle cx="200" cy="40" r="4" fill="var(--accent-primary)" />
        </g>
        <g className={styles.floatingElement} style={{ animationDelay: '0.2s' }}>
          <circle cx="200" cy="160" r="12" fill="var(--glass-bg)" stroke="var(--text-muted)" strokeWidth="2" />
          <circle cx="200" cy="160" r="4" fill="var(--accent-secondary)" />
        </g>
        <g className={styles.floatingElement} style={{ animationDelay: '0.4s' }}>
          <circle cx="140" cy="100" r="12" fill="var(--glass-bg)" stroke="var(--text-muted)" strokeWidth="2" />
          <circle cx="140" cy="100" r="4" fill="var(--accent-secondary)" />
        </g>
        <g className={styles.floatingElement} style={{ animationDelay: '0.6s' }}>
          <circle cx="260" cy="100" r="12" fill="var(--glass-bg)" stroke="var(--text-muted)" strokeWidth="2" />
          <circle cx="260" cy="100" r="4" fill="var(--accent-primary)" />
        </g>
        
        {/* Diagonal Nodes */}
        <circle cx="155" cy="55" r="8" fill="var(--text-main)" opacity="0.5" />
        <circle cx="245" cy="145" r="8" fill="var(--text-main)" opacity="0.5" />
        <circle cx="245" cy="55" r="8" fill="var(--text-main)" opacity="0.5" />
        <circle cx="155" cy="145" r="8" fill="var(--text-main)" opacity="0.5" />
      </svg>
    </div>
  );
};

export default SkillsSvg;
