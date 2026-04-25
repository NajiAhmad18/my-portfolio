import React from 'react';
import styles from './Illustrations.module.css';

const EngineeringSvg = () => {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox="0 0 200 120" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="engGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="var(--accent-primary)" />
            <stop offset="100%" stopColor="var(--accent-secondary)" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Orbit Path */}
        <ellipse cx="100" cy="60" rx="80" ry="30" stroke="var(--glass-border)" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
        
        {/* Connection Lines */}
        <path d="M40 60 Q100 20 160 60" stroke="var(--accent-primary)" strokeWidth="0.5" opacity="0.2" />
        <path d="M40 60 Q100 100 160 60" stroke="var(--accent-secondary)" strokeWidth="0.5" opacity="0.2" />

        {/* Central Core Nodes */}
        <g filter="url(#glow)">
          <path d="M85 50 L75 60 L85 70" stroke="var(--accent-primary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M115 50 L125 60 L115 70" stroke="var(--accent-secondary)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M105 45 L95 75" stroke="url(#engGrad)" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Floating Particles */}
        <circle cx="40" cy="60" r="4" fill="var(--accent-primary)">
          <animate attributeName="opacity" values="0.4;1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
        <circle cx="160" cy="60" r="4" fill="var(--accent-secondary)">
          <animate attributeName="opacity" values="1;0.4;1" dur="2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default EngineeringSvg;
