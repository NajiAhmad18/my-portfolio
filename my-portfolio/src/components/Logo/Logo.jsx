import React from 'react';
import { motion } from 'framer-motion';

const Logo = ({ size = 40 }) => (
  <motion.div
    whileHover={{ scale: 1.1 }}
    transition={{ type: "spring", stiffness: 300 }}
    style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: '10px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Subtle Background Glow */}
    <div style={{ 
      position: 'absolute', 
      width: '100%', 
      height: '100%', 
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)' 
    }} />
    
    <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <motion.path 
        d="M6 18L6 6L18 18L18 6" 
        stroke="#6366f1" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Decorative Minimal Code Nodes */}
      <circle cx="6" cy="6" r="1.5" fill="#fff" />
      <circle cx="18" cy="18" r="1.5" fill="#fff" />
      
      {/* Floating Prompt Cursor */}
      <motion.rect 
        x="19" y="5" width="2" height="4" 
        fill="#8b5cf6" 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </svg>
  </motion.div>
);

export default Logo;
