import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { FiGithub, FiCode, FiBox, FiCoffee } from 'react-icons/fi';

const metrics = [
  { id: 1, label: 'Projects Completed', value: '10+', icon: FiBox, color: '#3b82f6' },
  { id: 2, label: 'Technologies Used', value: '15+', icon: FiCode, color: '#10b981' },
  { id: 3, label: 'GitHub Commits', value: '500+', icon: FiGithub, color: '#8b5cf6' },
  { id: 4, label: 'Cups of Coffee', value: '∞', icon: FiCoffee, color: '#f59e0b' },
];

const MetricsDashboard = () => {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';

  return (
    <div style={{ marginTop: '4rem' }}>
      <motion.h3 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center', color: isDark ? '#f4f4f5' : '#18181b' }}
      >
        By The Numbers
      </motion.h3>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem'
      }}>
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            style={{
              padding: '1.5rem',
              borderRadius: '12px',
              background: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.02)',
              border: `1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              position: 'relative',
              overflow: 'hidden'
            }}
            whileHover={{ y: -5, boxShadow: `0 10px 30px -10px ${metric.color}40` }}
          >
            <div style={{
              width: '50px',
              height: '50px',
              borderRadius: '50%',
              background: `${metric.color}20`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: metric.color,
              fontSize: '1.5rem'
            }}>
              <metric.icon />
            </div>
            
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: isDark ? '#fff' : '#000', marginBottom: '0.25rem' }}>
                {metric.value}
              </div>
              <div style={{ fontSize: '0.9rem', color: isDark ? '#a1a1aa' : '#52525b' }}>
                {metric.label}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MetricsDashboard;
