import { useState, useEffect } from 'react';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/settings`;

export const useSettings = () => {
  const [settings, setSettings] = useState({ 
    siteTitle: 'Naji Ahmad Javahir',
    siteSubtitle: 'Software Engineering Undergraduate',
    aboutText: 'Software Engineering Undergraduate focused on building practical, scalable solutions',
    resumeUrl: '/Naji_Ahmad_Javahir_Software_Engineering_Intern.pdf',
    resumeOriginalName: 'Naji_Ahmad_Javahir_Software_Engineering_Intern.pdf'
  });

  const fetchSettings = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setSettings(data);
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    }
  };

  useEffect(() => {
    fetchSettings();

    // Listen for updates from admin panel
    const channel = new BroadcastChannel('portfolio_updates');
    channel.onmessage = (event) => {
      if (event.data === 'settings_updated') {
        fetchSettings();
      }
    };

    // Polling fallback for live updates across different origins (dev mode)
    const pollInterval = import.meta.env.DEV ? 3000 : 30000;
    const interval = setInterval(() => {
      fetchSettings();
    }, pollInterval);

    return () => {
      channel.close();
      clearInterval(interval);
    };
  }, []);

  return settings;
};
