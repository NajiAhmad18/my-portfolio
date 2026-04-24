import React from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

// Helpers for dynamic theming
const getThemeColors = (theme) => {
  const isLight = theme === 'light';
  return {
    bg: isLight ? '#f8fafc' : '#050505',
    solid: isLight ? '#ffffff' : '#050505',
    gridOpacity: isLight ? 0.15 : 0.1,
    spotlightOpacity: isLight ? "0.15" : "0.4",
  };
};

// Common subtle grid background for the technical aesthetic
const GridBackground = ({ color, gridOpacity }) => (
  <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: gridOpacity }}>
    <defs>
      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
        <path d="M 10 0 L 0 0 0 10" fill="none" stroke={color} strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid)" />
  </svg>
);

// High-end glowing drop shadow filter for SVGs
const GlowFilter = ({ id }) => (
  <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
    <feGaussianBlur stdDeviation="2" result="blur1" />
    <feGaussianBlur stdDeviation="4" result="blur2" />
    <feMerge>
      <feMergeNode in="blur2" />
      <feMergeNode in="blur1" />
      <feMergeNode in="SourceGraphic" />
    </feMerge>
  </filter>
);

// Cursor Spotlight Effect that reveals elements
const CursorSpotlight = ({ mouseX, mouseY, color, spotlightOpacity }) => {
  // mouseX and mouseY are -0.5 to 0.5
  const cx = useTransform(mouseX || useMotionValue(0), [-0.5, 0.5], [0, 100]);
  const cy = useTransform(mouseY || useMotionValue(0), [-0.5, 0.5], [0, 100]);
  
  return (
    <>
      <defs>
        <radialGradient id={`spotlight`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={spotlightOpacity} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <motion.circle cx={cx} cy={cy} r="40" fill={`url(#spotlight)`} style={{ pointerEvents: 'none' }} />
    </>
  );
};

// Hook for parallax layers
const useParallax = (mouseVal, range) => {
  return useTransform(mouseVal || useMotionValue(0), [-0.5, 0.5], [-range, range]);
};

// 1. Healthcare Microservices Platform
export const HealthcareIcon = ({ color, theme, mouseX, mouseY }) => {
  const t = getThemeColors(theme);
  const px1 = useParallax(mouseX, 10);
  const py1 = useParallax(mouseY, 10);
  const px2 = useParallax(mouseX, -5);
  const py2 = useParallax(mouseY, -5);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: t.bg, borderRadius: '8px' }}>
      <GridBackground color={color} gridOpacity={t.gridOpacity} />
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
        <defs><GlowFilter id="glow-health" /></defs>
        <CursorSpotlight mouseX={mouseX} mouseY={mouseY} color={color} spotlightOpacity={t.spotlightOpacity} />
        
        <motion.g style={{ x: px2, y: py2 }}>
          {[ [20, 25], [80, 25], [80, 75], [20, 75], [15, 50], [85, 50] ].map((pos, i) => (
            <g key={i}>
              <path d={`M 50 50 L ${pos[0]} ${pos[1]}`} stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
              <motion.path 
                d={`M 50 50 L ${pos[0]} ${pos[1]}`} 
                stroke={color} strokeWidth="1.5" strokeDasharray="4 20"
                initial={{ strokeDashoffset: 24 }} animate={{ strokeDashoffset: 0 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.1 }}
                filter="url(#glow-health)"
              />
              <motion.circle cx={pos[0]} cy={pos[1]} r="3" fill={t.bg} stroke={color} strokeWidth="1.5"
                filter="url(#glow-health)" animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }} />
              <circle cx={pos[0]} cy={pos[1]} r="1" fill={color} />
            </g>
          ))}
        </motion.g>

        <motion.g style={{ x: px1, y: py1 }}>
          <motion.polygon points="50,38 60,44 60,56 50,62 40,56 40,44" fill={t.solid} stroke={color} strokeWidth="1.5"
            filter="url(#glow-health)" animate={{ rotate: 360 }} transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 50px' }} />
          <motion.polygon points="50,42 57,46 57,54 50,58 43,54 43,46" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.6"
            animate={{ rotate: -360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 50px' }} />
          <circle cx="50" cy="50" r="4" fill={color} filter="url(#glow-health)" />
        </motion.g>
      </svg>
    </div>
  );
};

// 2. ReVolve - Circular Economy
export const RevolveIcon = ({ color, theme, mouseX, mouseY }) => {
  const t = getThemeColors(theme);
  const px1 = useParallax(mouseX, 8);
  const py1 = useParallax(mouseY, 8);
  const px2 = useParallax(mouseX, -8);
  const py2 = useParallax(mouseY, -8);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: t.bg, borderRadius: '8px' }}>
      <GridBackground color={color} gridOpacity={t.gridOpacity} />
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
        <defs><GlowFilter id="glow-revolve" /></defs>
        <CursorSpotlight mouseX={mouseX} mouseY={mouseY} color={color} spotlightOpacity={t.spotlightOpacity} />
        
        <motion.g style={{ x: px2, y: py2 }}>
          <circle cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" />
          <circle cx="50" cy="50" r="28" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.2" strokeDasharray="2 4" />
          {[0, 120, 240].map((angle, i) => (
            <motion.circle key={i} cx="50" cy="50" r="32" fill="none" stroke={color} strokeWidth="2" 
              strokeDasharray="15 186" animate={{ strokeDashoffset: [201, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: i * 1 }} filter="url(#glow-revolve)" />
          ))}
        </motion.g>

        <motion.g style={{ x: px1, y: py1 }}>
          {[0, 120, 240].map((angle, i) => (
            <motion.g key={i} style={{ transformOrigin: '50px 50px' }} animate={{ rotate: angle }}>
              <motion.circle cx="50" cy="18" r="4" fill={t.solid} stroke={color} strokeWidth="1.5"
                filter="url(#glow-revolve)" animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                transition={{ duration: 2, delay: i * 0.5, repeat: Infinity }} />
              <path d="M 50 22 L 50 35 L 43 42" fill="none" stroke={color} strokeWidth="1" strokeOpacity="0.6" strokeDasharray="2 2" />
            </motion.g>
          ))}
          <motion.path d="M 45 45 L 55 45 L 50 55 Z" fill={t.solid} stroke={color} strokeWidth="1.5"
            filter="url(#glow-revolve)" animate={{ rotate: -360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: '50px 50px' }} />
        </motion.g>
      </svg>
    </div>
  );
};

// 3. Smart Vacation Home Rental
export const VacationIcon = ({ color, theme, mouseX, mouseY }) => {
  const t = getThemeColors(theme);
  const px1 = useParallax(mouseX, 12);
  const py1 = useParallax(mouseY, 12);
  const px2 = useParallax(mouseX, -6);
  const py2 = useParallax(mouseY, -6);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: t.bg, borderRadius: '8px' }}>
      <GridBackground color={color} gridOpacity={t.gridOpacity} />
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
        <defs><GlowFilter id="glow-vacation" /></defs>
        <CursorSpotlight mouseX={mouseX} mouseY={mouseY} color={color} spotlightOpacity={t.spotlightOpacity} />
        
        <motion.g style={{ x: px2, y: py2 }}>
          <path d="M 20 75 L 80 75 L 60 65 L 40 65 Z" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" />
          <path d="M 35 45 L 20 30 M 65 45 L 80 30 M 35 65 L 15 65 M 65 65 L 85 65" stroke={color} strokeWidth="0.5" strokeOpacity="0.4" strokeDasharray="2 2" />
          <motion.circle cx="20" cy="30" r="3" fill={t.bg} stroke={color} strokeWidth="1.5" filter="url(#glow-vacation)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          <motion.circle cx="80" cy="30" r="3" fill={t.bg} stroke={color} strokeWidth="1.5" filter="url(#glow-vacation)" animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, delay: 1, repeat: Infinity }} />
          <circle cx="15" cy="65" r="2" fill={color} />
          <circle cx="85" cy="65" r="2" fill={color} />
        </motion.g>

        <motion.g style={{ x: px1, y: py1 }}>
          <motion.path d="M 35 65 L 35 45 L 50 32 L 65 45 L 65 65 Z" fill={t.solid} stroke={color} strokeWidth="1.5" filter="url(#glow-vacation)" />
          <motion.rect x="44" y="48" width="12" height="17" fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1"
            animate={{ opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity }} filter="url(#glow-vacation)" />
          {[1, 2, 3].map(i => (
            <motion.path key={i} d={`M ${50 - i*6} ${25 - i*4} Q 50 ${20 - i*5} ${50 + i*6} ${25 - i*4}`} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" filter="url(#glow-vacation)"
              animate={{ opacity: [0, 1, 0], y: [0, -3, -6] }} transition={{ duration: 2, delay: i * 0.4, repeat: Infinity }} />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

// 4. Online Pharmacy Portal
export const PharmacyIcon = ({ color, theme, mouseX, mouseY }) => {
  const t = getThemeColors(theme);
  const px1 = useParallax(mouseX, 6);
  const py1 = useParallax(mouseY, 6);
  const px2 = useParallax(mouseX, -10);
  const py2 = useParallax(mouseY, -10);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: t.bg, borderRadius: '8px' }}>
      <GridBackground color={color} gridOpacity={t.gridOpacity} />
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
        <defs>
          <GlowFilter id="glow-pharmacy" />
          <linearGradient id="scan" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={color} />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <CursorSpotlight mouseX={mouseX} mouseY={mouseY} color={color} spotlightOpacity={t.spotlightOpacity} />

        <motion.g style={{ x: px1, y: py1 }}>
          <path d="M 40 20 L 60 20 L 60 40 L 80 40 L 80 60 L 60 60 L 60 80 L 40 80 L 40 60 L 20 60 L 20 40 L 40 40 Z" fill={t.solid} stroke={color} strokeWidth="0.5" strokeOpacity="0.3" />
          <motion.path d="M 40 20 L 60 20 L 60 40 L 80 40 L 80 60 L 60 60 L 60 80 L 40 80 L 40 60 L 20 60 L 20 40 L 40 40 Z" fill="none" stroke={color} strokeWidth="2" strokeDasharray="30 130" strokeLinecap="round" filter="url(#glow-pharmacy)" animate={{ strokeDashoffset: [160, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "linear" }} />
          <motion.line x1="15" y1="20" x2="85" y2="20" stroke="url(#scan)" strokeWidth="4" filter="url(#glow-pharmacy)" animate={{ y1: [15, 85, 15], y2: [15, 85, 15], opacity: [0, 1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} />
        </motion.g>

        <motion.g style={{ x: px2, y: py2 }}>
          {[ { x: 30, y: 40, delay: 0 }, { x: 70, y: 70, delay: 0.8 }, { x: 50, y: 60, delay: 1.5 }, { x: 60, y: 30, delay: 2.2 } ].map((pill, i) => (
            <motion.rect key={i} x={pill.x - 3} y={pill.y} width="6" height="12" rx="3" fill={color} filter="url(#glow-pharmacy)" animate={{ y: [pill.y, pill.y - 25], opacity: [0, 1, 0], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 3, delay: pill.delay, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </motion.g>
      </svg>
    </div>
  );
};

// 5. Online Bidding System
export const BiddingIcon = ({ color, theme, mouseX, mouseY }) => {
  const t = getThemeColors(theme);
  const px1 = useParallax(mouseX, 15);
  const py1 = useParallax(mouseY, 15);
  const px2 = useParallax(mouseX, -8);
  const py2 = useParallax(mouseY, -8);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden', background: t.bg, borderRadius: '8px' }}>
      <GridBackground color={color} gridOpacity={t.gridOpacity} />
      <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 1 }}>
        <defs><GlowFilter id="glow-bidding" /></defs>
        <CursorSpotlight mouseX={mouseX} mouseY={mouseY} color={color} spotlightOpacity={t.spotlightOpacity} />

        <motion.g style={{ x: px2, y: py2 }}>
          <path d="M 30 75 L 70 75 L 60 80 L 40 80 Z" fill={t.solid} stroke={color} strokeWidth="1" strokeOpacity="0.5" />
          <ellipse cx="50" cy="75" rx="20" ry="3" fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.5" />
          {[1, 2, 3].map(i => (
            <motion.ellipse key={i} cx="50" cy="75" rx="20" ry="5" fill="none" stroke={color} strokeWidth="1.5" filter="url(#glow-bidding)" initial={{ scale: 1, opacity: 0.8 }} animate={{ scale: 3, opacity: 0 }} transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity, ease: "easeOut" }} />
          ))}
          {[ { path: "M 10 40 Q 20 60 40 75" }, { path: "M 90 40 Q 80 60 60 75" }, { path: "M 50 15 L 50 70" } ].map((p, i) => (
            <g key={i}>
              <path d={p.path} fill="none" stroke={color} strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="2 2" />
              <motion.path d={p.path} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeDasharray="4 100" filter="url(#glow-bidding)" animate={{ strokeDashoffset: [100, 0] }} transition={{ duration: 1.2, delay: i * 0.4, repeat: Infinity, ease: "linear" }} />
            </g>
          ))}
        </motion.g>

        <motion.g style={{ x: px1, y: py1 }}>
          <motion.g animate={{ rotate: [0, -35, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.15, 0.25, 1], ease: "easeInOut" }} style={{ transformOrigin: '65px 55px' }}>
            <rect x="40" y="45" width="12" height="24" rx="2" fill={t.solid} stroke={color} strokeWidth="2" filter="url(#glow-bidding)" transform="rotate(-45 45 55)" />
            <line x1="43" y1="48" x2="49" y2="48" stroke={color} strokeWidth="1" transform="rotate(-45 45 55)" />
            <line x1="43" y1="66" x2="49" y2="66" stroke={color} strokeWidth="1" transform="rotate(-45 45 55)" />
            <line x1="52" y1="52" x2="85" y2="19" stroke={color} strokeWidth="2.5" strokeLinecap="round" filter="url(#glow-bidding)" />
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};
