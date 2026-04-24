import React from 'react';
import styles from './Illustrations.module.css';

const DeveloperSvg = () => {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox="0 0 400 300" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background glow */}
        <circle cx="200" cy="150" r="100" fill="var(--accent-primary)" opacity="0.1" className={styles.floatingElement} />
        
        {/* Laptop Base */}
        <rect x="80" y="200" width="240" height="15" rx="5" fill="var(--text-muted)" />
        <path d="M60 215 h280 l-10 10 h-260 z" fill="var(--bg-dark)" stroke="var(--text-muted)" strokeWidth="2" />
        
        {/* Laptop Screen */}
        <rect x="100" y="80" width="200" height="120" rx="8" fill="var(--bg-darker)" stroke="var(--accent-primary)" strokeWidth="4" />
        <rect x="110" y="90" width="180" height="100" rx="4" fill="var(--bg-dark)" />
        
        {/* Code Lines inside screen */}
        <rect x="120" y="105" width="80" height="6" rx="3" fill="var(--accent-primary)" />
        <rect x="120" y="125" width="120" height="6" rx="3" fill="var(--text-muted)" />
        <rect x="120" y="145" width="100" height="6" rx="3" fill="var(--accent-secondary)" />
        <rect x="120" y="165" width="60" height="6" rx="3" fill="var(--text-muted)" />
        
        {/* Floating brackets */}
        <text x="140" y="160" fontSize="48" fontWeight="bold" fill="var(--accent-primary)" className={`${styles.bracket} ${styles.bracketLeft}`} opacity="0.4">{"{"}</text>
        <text x="220" y="160" fontSize="48" fontWeight="bold" fill="var(--accent-secondary)" className={`${styles.bracket} ${styles.bracketRight}`} opacity="0.4">{"}"}</text>
        
        {/* Spinning Gear */}
        <g className={styles.gear} style={{ transformOrigin: '320px 80px' }}>
          <circle cx="320" cy="80" r="20" fill="none" stroke="var(--text-muted)" strokeWidth="4" />
          <circle cx="320" cy="80" r="8" fill="var(--accent-secondary)" />
          <path d="M320 50 v10 M320 100 v10 M290 80 h10 M340 80 h10 M300 60 l8 8 M332 92 l8 8 M300 100 l8 -8 M332 68 l8 -8" stroke="var(--text-muted)" strokeWidth="4" strokeLinecap="round" />
        </g>
        
        {/* Floating nodes */}
        <circle cx="100" cy="60" r="6" fill="var(--accent-secondary)" className={styles.floatingElement} style={{ animationDelay: '1s' }} />
        <circle cx="120" cy="40" r="4" fill="var(--accent-primary)" className={styles.floatingElement} style={{ animationDelay: '0.5s' }} />
        <path d="M100 60 L120 40" stroke="var(--glass-border)" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default DeveloperSvg;
