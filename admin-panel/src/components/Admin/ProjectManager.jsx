import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiLayers } from 'react-icons/fi';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/projects`;

const ProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [error, setError] = useState(null);

  const fetchProjects = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setProjects(data);
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
    fetchProjects();
  }, []);

  const startEdit = (project) => {
    setEditingId(project.id);
    setFormData({ ...project });
  };

  const handleAdd = () => {
    const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id || 0)) + 1 : 1;
    const newProject = {
      id: newId,
      title: 'New Project',
      shortDesc: 'Short description...',
      description: 'Long description...',
      problem: '',
      solution: '',
      techStack: ['React'],
      githubLink: '',
      demoLink: '',
      color: '#3b82f6',
      isNew: true
    };
    setProjects(prev => [newProject, ...prev]);
    startEdit(newProject);
  };

  const saveEdit = async () => {
    try {
      const isExisting = !formData.isNew;
      const method = isExisting ? 'PUT' : 'POST';
      const url = isExisting ? `${API_URL}/${formData.id}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchProjects();
        setEditingId(null);
        window.dispatchEvent(new CustomEvent('projectsUpdated'));
        // Notify other tabs (like the portfolio)
        const channel = new BroadcastChannel('portfolio_updates');
        channel.postMessage('projects_updated');
        channel.close();
      }
    } catch (err) {
      console.error('Save error:', err);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (response.ok) {
          fetchProjects();
          window.dispatchEvent(new CustomEvent('projectsUpdated'));
          // Notify other tabs
          const channel = new BroadcastChannel('portfolio_updates');
          channel.postMessage('projects_updated');
          channel.close();
        }
      } catch (err) {
        console.error('Delete error:', err);
      }
    }
  };

  if (loading) return <div style={{ color: '#fff', padding: '2rem' }}>Loading projects...</div>;

  if (error) return (
    <div style={{ padding: '2rem', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', borderRadius: '12px', margin: '1rem', color: '#fff' }}>
      <h3 style={{ color: '#ef4444', marginTop: 0 }}>Connection Error</h3>
      <p>{error}</p>
      <button onClick={fetchProjects} style={{ padding: '0.5rem 1rem', background: '#ef4444', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Retry</button>
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h3 style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}>
          <FiLayers /> Project Catalog (MongoDB)
        </h3>
        <button
          onClick={handleAdd}
          style={{
            padding: '0.6rem 1.2rem',
            background: '#3b82f6',
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
          <FiPlus /> Add Project
        </button>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {projects.map(project => (
          <motion.div
            key={project.id}
            layout
            style={{
              padding: '1.25rem',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem'
            }}
          >
            {editingId === project.id ? (
              <div style={{ display: 'grid', gap: '1rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Title</label>
                    <input
                      style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Color (Hex)</label>
                    <input
                      style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                      value={formData.color}
                      onChange={e => setFormData({ ...formData, color: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Short Description</label>
                  <input
                    style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                    value={formData.shortDesc}
                    onChange={e => setFormData({ ...formData, shortDesc: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.75rem', color: '#71717a', marginBottom: '0.25rem' }}>Tech Stack (Comma separated)</label>
                  <input
                    style={{ width: '100%', padding: '0.5rem', background: '#0a0a0f', border: '1px solid #27272a', color: '#fff', borderRadius: '4px' }}
                    value={Array.isArray(formData.techStack) ? formData.techStack.join(', ') : formData.techStack}
                    onChange={e => setFormData({ ...formData, techStack: e.target.value.split(',').map(s => s.trim()) })}
                  />
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                  <button onClick={() => {
                    setEditingId(null);
                    if (project.isNew) {
                      setProjects(prev => prev.filter(p => p.id !== project.id));
                    }
                  }} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid #3f3f46', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}><FiX /> Cancel</button>
                  <button onClick={saveEdit} style={{ padding: '0.5rem 1rem', background: '#10b981', border: 'none', color: '#fff', borderRadius: '6px', cursor: 'pointer' }}><FiSave /> Save Changes</button>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: project.color }} />
                  <div>
                    <h4 style={{ margin: 0, color: '#fff', fontSize: '1rem' }}>{project.title}</h4>
                    <p style={{ margin: 0, color: '#71717a', fontSize: '0.8rem' }}>{project.techStack.join(' • ')}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => startEdit(project)} style={{ p: '0.5rem', background: 'rgba(255,255,255,0.05)', border: 'none', color: '#a1a1aa', borderRadius: '6px', cursor: 'pointer' }}><FiEdit2 /></button>
                  <button onClick={() => deleteProject(project.id)} style={{ p: '0.5rem', background: 'rgba(239,68,68,0.1)', border: 'none', color: '#ef4444', borderRadius: '6px', cursor: 'pointer' }}><FiTrash2 /></button>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ProjectManager;
