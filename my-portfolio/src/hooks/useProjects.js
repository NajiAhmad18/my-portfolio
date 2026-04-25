import { useState, useEffect } from 'react';
import { projectsData } from '../data/projects';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/projects`;

export const useProjects = () => {
  const [projects, setProjects] = useState(projectsData);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            setProjects(data);
          }
        }
      } catch (err) {
        console.error('Failed to fetch projects from MongoDB, using local fallback:', err);
      }
    };

    fetchProjects();

    // Listen for updates from other tabs
    const channel = new BroadcastChannel('portfolio_updates');
    channel.onmessage = (event) => {
      if (event.data === 'projects_updated') {
        fetchProjects();
      }
    };

    // Polling fallback for live updates across different origins
    const pollInterval = import.meta.env.DEV ? 3000 : 30000;
    const interval = setInterval(() => {
      fetchProjects();
    }, pollInterval);

    return () => {
      channel.close();
      clearInterval(interval);
    };
  }, []);

  return projects;
};
