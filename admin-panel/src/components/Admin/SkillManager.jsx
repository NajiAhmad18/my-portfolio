import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlus, FiTrash2, FiSave, FiX, FiCpu } from 'react-icons/fi';

const API_URL = 'http://localhost:5001/api/skills';

const SkillManager = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: 'programming',
    icon: '',
    color: '#ffffff'
  });

  const [error, setError] = useState(null);

  const fetchSkills = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setSkills(data);
      } else {
        setError(data.message || 'Server returned an invalid format');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Could not connect to the backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  const handleSave = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchSkills();
        setIsAdding(false);
        setFormData({ name: '', category: 'programming', icon: '', color: '#ffffff' });
        
        // Notify other components and tabs
        window.dispatchEvent(new CustomEvent('skillsUpdated'));
        const channel = new BroadcastChannel('portfolio_updates');
        channel.postMessage('skills_updated');
        channel.close();
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill?')) {
      try {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        fetchSkills();
        
        // Notify other components and tabs
        window.dispatchEvent(new CustomEvent('skillsUpdated'));
        const channel = new BroadcastChannel('portfolio_updates');
        channel.postMessage('skills_updated');
        channel.close();
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) return <div style={{ color: '#fff', padding: '2rem' }}>Loading skills...</div>;

  if (error) return (
    <div style={{ padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', margin: '1rem', color: '#fff' }}>
      <h3 style={{ color: '#ef4444', marginTop: 0 }}>Connection Error</h3>
      <p>{error}</p>
      <button onClick={fetchSkills} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <FiCpu /> Skills Inventory (MongoDB)
        </h3>
        <button
          onClick={() => setIsAdding(true)}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#10b981',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
        >
          <FiPlus /> Add Skill
        </button>
      </div>

      {isAdding && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            padding: '1.5rem',
            background: 'rgba(16, 185, 129, 0.05)',
            border: '1px solid rgba(16, 185, 129, 0.2)',
            borderRadius: '12px',
            marginBottom: '2rem',
            display: 'grid',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Name</label>
              <input
                style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. React"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Category</label>
              <select
                style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
              >
                <option value="programming">Programming</option>
                <option value="tools">Tools</option>
                <option value="technologies">Technologies</option>
              </select>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Icon Key (from SimpleIcons)</label>
              <input
                style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                value={formData.icon}
                onChange={e => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g. SiReact"
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Color (Hex)</label>
              <input
                style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                value={formData.color}
                onChange={e => setFormData({ ...formData, color: e.target.value })}
                placeholder="#61DAFB"
              />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
            <button onClick={() => setIsAdding(false)} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #3f3f46', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}><FiX /> Cancel</button>
            <button onClick={handleSave} style={{ padding: '0.5rem 1rem', background: '#10b981', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}><FiSave /> Save Skill</button>
          </div>
        </motion.div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
        {skills.map(skill => (
          <motion.div
            key={skill._id}
            layout
            style={{
              padding: '1rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: skill.color }} />
              <div>
                <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 500 }}>{skill.name}</div>
                <div style={{ color: '#71717a', fontSize: '0.7rem' }}>{skill.category}</div>
              </div>
            </div>
            <button
              onClick={() => handleDelete(skill._id)}
              style={{ padding: '0.4rem', background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', borderRadius: '4px' }}
            >
              <FiTrash2 size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SkillManager;
