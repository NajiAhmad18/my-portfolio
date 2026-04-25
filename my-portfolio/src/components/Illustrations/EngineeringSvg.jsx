import React from 'react';
import styles from './Illustrations.module.css';

const EngineeringSvg = () => {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox="0 0 200 200" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Animated Background Aura */}
        <circle cx="100" cy="100" r="80" fill="url(#grad1)" opacity="0.15">
          <animate attributeName="r" values="75;85;75" dur="4s" repeatCount="indefinite" />
        </circle>

        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'var(--accent-primary)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'var(--accent-secondary)', stopOpacity: 1 }} />
          </linearGradient>
        </defs>

        {/* Central Core */}
        <circle cx="100" cy="100" r="35" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="5,5" className={styles.gear} />
        
        {/* Orbiting Elements */}
        <g className={styles.gear} style={{ transformOrigin: '100px 100px', animationDuration: '10s' }}>
          <circle cx="100" cy="40" r="8" fill="var(--accent-primary)" className={styles.floatingElement} />
          <circle cx="160" cy="100" r="6" fill="var(--accent-secondary)" className={styles.floatingElement} style={{ animationDelay: '1s' }} />
          <circle cx="100" cy="160" r="10" fill="var(--accent-primary)" opacity="0.6" className={styles.floatingElement} style={{ animationDelay: '2s' }} />
          <circle cx="40" cy="100" r="7" fill="var(--accent-secondary)" opacity="0.4" className={styles.floatingElement} style={{ animationDelay: '1.5s' }} />
        </g>

        {/* Connecting Lines */}
        <path d="M100 40 L100 160" stroke="var(--glass-border)" strokeWidth="1" opacity="0.3" />
        <path d="M40 100 L160 100" stroke="var(--glass-border)" strokeWidth="1" opacity="0.3" />
        
        {/* Central Icon - Minimalist Code Symbol */}
        <path d="M85 90 L75 100 L85 110" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M115 90 L125 100 L115 110" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M105 85 L95 115" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export default EngineeringSvg;
