import React from 'react';
import styles from './Illustrations.module.css';

const ContactSvg = () => {
  return (
    <div className={styles.svgContainer}>
      <svg viewBox="0 0 400 300" className={styles.svg} fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Background glow */}
        <circle cx="200" cy="150" r="100" fill="var(--accent-secondary)" opacity="0.1" className={styles.floatingElement} />
        
        {/* Paper Plane */}
        <g className={styles.paperPlane} style={{ transformOrigin: '200px 150px' }}>
          <path d="M120 180 L280 100 L200 240 L170 190 L240 130 L160 170 Z" fill="var(--accent-primary)" />
          <path d="M120 180 L160 170 L170 190 Z" fill="var(--accent-secondary)" />
          <path d="M170 190 L165 210 L200 240 Z" fill="var(--text-muted)" opacity="0.5" />
          
          {/* Dash lines behind plane */}
          <path d="M80 200 L110 185" stroke="var(--text-muted)" strokeWidth="3" strokeDasharray="5,5" opacity="0.5" />
          <path d="M90 220 L130 200" stroke="var(--text-muted)" strokeWidth="3" strokeDasharray="5,5" opacity="0.3" />
        </g>
        
        {/* Floating Bubble */}
        <g className={styles.bubble} style={{ transformOrigin: '300px 80px' }}>
          <path d="M280 60 C280 40 300 30 320 30 C340 30 360 40 360 60 C360 80 340 90 320 90 C310 90 290 100 280 110 C285 95 280 80 280 60 Z" fill="var(--glass-bg)" stroke="var(--accent-secondary)" strokeWidth="3" />
          <circle cx="305" cy="60" r="4" fill="var(--text-main)" />
          <circle cx="320" cy="60" r="4" fill="var(--text-main)" />
          <circle cx="335" cy="60" r="4" fill="var(--text-main)" />
        </g>
      </svg>
    </div>
  );
};

export default ContactSvg;
