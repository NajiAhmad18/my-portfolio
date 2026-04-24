import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // Try to get theme from local storage, default to 'system'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'system';
  });

  // Derived active theme (either 'light' or 'dark') based on the current `theme` state
  const [activeTheme, setActiveTheme] = useState('dark');

  useEffect(() => {
    const applyTheme = (currentTheme) => {
      let resolvedTheme = currentTheme;
      
      // If system, check system preference
      if (currentTheme === 'system') {
        resolvedTheme = window.matchMedia('(prefers-color-scheme: light)').matches 
          ? 'light' 
          : 'dark';
      }

      // Apply to document element
      document.documentElement.setAttribute('data-theme', resolvedTheme);
      setActiveTheme(resolvedTheme);
    };

    applyTheme(theme);
    localStorage.setItem('theme', theme);

    // If theme is system, we need to listen for OS changes
    if (theme === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const handleChange = () => applyTheme('system');
      
      // Modern browsers
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
        return () => mediaQuery.removeListener(handleChange);
      }
    }
  }, [theme]);

  const value = {
    theme,
    setTheme,
    activeTheme // Expose activeTheme so components know if it's currently dark or light
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
