import { useState, useEffect } from 'react';
import { skillsData } from '../data/skills';

const API_URL = 'http://localhost:5001/api/skills';

export const useSkills = () => {
  const [skills, setSkills] = useState(skillsData);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(API_URL);
        if (response.ok) {
          const data = await response.json();
          if (data && data.length > 0) {
            // Group skills by category to match the expected format
            const grouped = data.reduce((acc, skill) => {
              if (!acc[skill.category]) {
                acc[skill.category] = [];
              }
              acc[skill.category].push(skill);
              return acc;
            }, {});
            setSkills(grouped);
          }
        }
      } catch (err) {
        console.error('Failed to fetch skills from MongoDB, using local fallback:', err);
      }
    };

    fetchSkills();

    // Listen for updates from other tabs
    const channel = new BroadcastChannel('portfolio_updates');
    channel.onmessage = (event) => {
      if (event.data === 'skills_updated') {
        fetchSkills();
      }
    };

    const handleUpdate = () => fetchSkills();
    window.addEventListener('skillsUpdated', handleUpdate);

    return () => {
      window.removeEventListener('skillsUpdated', handleUpdate);
      channel.close();
    };
  }, []);

  return skills;
};

