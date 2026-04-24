import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiZap, FiGlobe, FiCpu, FiSmartphone, FiArrowRight } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const upcoming = [
  {
    id: 1,
    icon: FiCpu,
    title: 'AI-Powered Code Review Tool',
    description: 'A developer tool that uses LLMs to review pull requests, detect code smells, and suggest improvements automatically.',
    tags: ['LLM', 'GitHub API', 'Node.js'],
    status: 'Idea Phase',
    color: '#6366f1',
    progress: 10
  },
  {
    id: 2,
    icon: FiGlobe,
    title: 'Real-Time Collaborative Whiteboard',
    description: 'Figma-style collaborative whiteboard with live cursors, sticky notes, and diagram tools, built on WebSockets and CRDT.',
    tags: ['WebSockets', 'CRDT', 'React', 'Canvas API'],
    status: 'Prototyping',
    color: '#10b981',
    progress: 30
  },
  {
    id: 3,
    icon: FiSmartphone,
    title: 'Mobile Health Tracker App',
    description: 'A cross-platform mobile app that connects with wearables to track vitals and surfaces AI-driven health recommendations.',
    tags: ['React Native', 'AI/ML', 'Bluetooth API'],
    status: 'Research',
    color: '#f59e0b',
    progress: 15
  },
  {
    id: 4,
    icon: FiZap,
    title: 'Dev Portfolio OS (This Site v2)',
    description: 'A next-gen portfolio that operates like a mini OS: draggable windows, a live terminal, and an AI assistant for navigation.',
    tags: ['React', 'Framer Motion', 'AI'],
    status: 'Planning',
    color: '#ec4899',
    progress: 20
  }
];

const statusColors = {
  'Idea Phase': '#a1a1aa',
  'Research': '#f59e0b',
  'Planning': '#3b82f6',
  'Prototyping': '#10b981'
};

const WhatsNext = () => {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';
  const [hovered, setHovered] = useState(null);

  return (
    <section id="whats-next" style={{ padding: 'var(--section-padding)', backgroundColor: 'transparent', position: 'relative' }}>
      <div className="section-container">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          What I'm Building Next
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ color: isDark ? '#a1a1aa' : '#52525b', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}
        >
          Ideas and experiments I'm currently exploring. Direction matters as much as experience.
        </motion.p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {upcoming.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onHoverStart={() => setHovered(item.id)}
              onHoverEnd={() => setHovered(null)}
              style={{
                padding: '1.5rem',
                borderRadius: '16px',
                background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.9)',
                border: `1px solid ${hovered === item.id ? item.color : (isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)')}`,
                transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                boxShadow: hovered === item.id ? `0 10px 30px -10px ${item.color}40` : 'none',
                cursor: 'default',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle glow background */}
              <div style={{
                position: 'absolute',
                top: '-40px',
                right: '-40px',
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `${item.color}20`,
                filter: 'blur(30px)',
                pointerEvents: 'none',
                transition: 'opacity 0.3s ease',
                opacity: hovered === item.id ? 1 : 0.4
              }} />

              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: `${item.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: item.color,
                  fontSize: '1.3rem',
                  flexShrink: 0
                }}>
                  <item.icon />
                </div>

                <span style={{
                  fontSize: '0.75rem',
                  padding: '3px 10px',
                  borderRadius: '20px',
                  background: `${statusColors[item.status]}20`,
                  color: statusColors[item.status],
                  border: `1px solid ${statusColors[item.status]}40`,
                  fontWeight: 500,
                  whiteSpace: 'nowrap'
                }}>
                  {item.status}
                </span>
              </div>

              {/* Title & Description */}
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: isDark ? '#f4f4f5' : '#18181b', marginBottom: '0.75rem' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '0.9rem', color: isDark ? '#a1a1aa' : '#52525b', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                {item.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1.25rem' }}>
                {item.tags.map(tag => (
                  <span key={tag} style={{
                    fontSize: '0.75rem',
                    padding: '3px 10px',
                    borderRadius: '20px',
                    background: isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)',
                    color: isDark ? '#d4d4d8' : '#52525b',
                    border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                  }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: isDark ? '#71717a' : '#a1a1aa' }}>Progress</span>
                  <span style={{ fontSize: '0.75rem', color: item.color, fontWeight: 600 }}>{item.progress}%</span>
                </div>
                <div style={{ height: '4px', borderRadius: '4px', background: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)', overflow: 'hidden' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.progress}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.1 + 0.3 }}
                    style={{ height: '100%', borderRadius: '4px', background: item.color }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          style={{ textAlign: 'center', marginTop: '3rem', color: isDark ? '#52525b' : '#a1a1aa', fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <FiArrowRight /> Always building, always learning.
        </motion.div>
      </div>
    </section>
  );
};

export default WhatsNext;
