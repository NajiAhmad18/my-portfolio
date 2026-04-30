import React, { useState, useRef, useEffect } from 'react';
import { FiSun, FiMoon, FiMonitor } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';
import styles from './ThemeToggle.module.css';

import { useInteraction } from '../../hooks/useInteraction';

const ThemeToggle = () => {
  const { theme, setTheme, activeTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { triggerFeedback } = useInteraction();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const options = [
    { value: 'light', label: 'Light', icon: <FiSun /> },
    { value: 'dark', label: 'Dark', icon: <FiMoon /> },
    { value: 'system', label: 'System', icon: <FiMonitor /> },
  ];

  return (
    <div className={styles.toggleContainer} ref={dropdownRef}>
      <button 
        className={styles.toggleBtn} 
        onClick={() => {
          triggerFeedback('light');
          setIsOpen(!isOpen);
        }}
        aria-label="Toggle theme"
      >
        {activeTheme === 'dark' ? <FiMoon /> : <FiSun />}
      </button>

      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option) => (
            <button
              key={option.value}
              className={`${styles.optionBtn} ${theme === option.value ? styles.active : ''}`}
              onClick={() => {
                triggerFeedback('medium');
                setTheme(option.value);
                setIsOpen(false);
              }}
            >
              {option.icon}
              <span>{option.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ThemeToggle;
