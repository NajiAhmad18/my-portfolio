import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GitHubStats from './GitHubStats';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import { FiHome, FiLayout, FiGithub, FiMessageSquare, FiSettings, FiExternalLink, FiPieChart, FiCpu, FiFileText } from 'react-icons/fi';
import SettingsManager from './SettingsManager';
import ResumeManager from './ResumeManager';
import MessageManager from './MessageManager';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('admin_auth') === 'true';
    setIsAuthorized(auth);
  }, []);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FiPieChart },
    { id: 'projects', label: 'Projects', icon: FiLayout },
    { id: 'skills', label: 'Skills', icon: FiCpu },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'resume', label: 'Resume', icon: FiFileText },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
             {/* Main Hero Metrics */}
             <OverviewStats />

             {/* Secondary Data Layer */}
             <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <TechPulse />
                  <GitHubStats />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <SystemHealth />
                  <TechDistribution />
                </div>
             </div>
          </div>
        );
      case 'projects':
        return <ProjectManager />;
      case 'skills':
        return <SkillManager />;
      case 'messages':
        return <MessageManager />;
      case 'resume':
        return <ResumeManager />;
      case 'settings':
        return <SettingsManager />;
      default:
        return null;
    }
  };

  if (!isAuthorized) {
    return (
      <div style={{ minHeight: '100vh', background: '#030305', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Inter', sans-serif" }}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ background: '#0a0a0f', padding: '3.5rem', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.03)', width: '100%', maxWidth: '420px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' }}
        >
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', margin: '0 auto 2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 30px rgba(99, 102, 241, 0.3)' }}>
            <FiSettings size={32} color="#fff" />
          </div>
          <h2 style={{ color: '#fff', margin: '0 0 0.5rem 0', letterSpacing: '-0.02em' }}>Admin Control</h2>
          <p style={{ color: '#71717a', fontSize: '0.95rem', marginBottom: '2.5rem' }}>Secure Management Gateway</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="password" 
              placeholder="Authorization Key" 
              onKeyDown={(e) => {
                if (e.key === 'Enter' && e.target.value === 'admin123') {
                  localStorage.setItem('admin_auth', 'true');
                  setIsAuthorized(true);
                }
              }}
              style={{ padding: '1rem 1.25rem', borderRadius: '12px', background: '#16161d', border: '1px solid #27272a', color: '#fff', outline: 'none', fontSize: '1rem', transition: 'border-color 0.2s' }}
            />
            <button 
              onClick={(e) => {
                const input = e.target.previousSibling;
                if (input.value === 'admin123') {
                  localStorage.setItem('admin_auth', 'true');
                  setIsAuthorized(true);
                }
              }}
              style={{ padding: '1rem', borderRadius: '12px', background: '#6366f1', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer', fontSize: '1rem', transition: 'transform 0.2s' }}
            >
              Initialize Session
            </button>
          </div>
          <p style={{ color: '#3f3f46', fontSize: '0.75rem', marginTop: '2rem' }}>&copy; 2026 NAJI ARCHITECTURE</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030305',
      color: '#fff',
      display: 'flex',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Sleek Sidebar */}
      <div style={{
        width: '280px',
        background: '#08080a',
        borderRight: '1px solid rgba(255, 255, 255, 0.03)',
        padding: '2.5rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#6366f1' }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.05em', color: '#fff' }}>NAJI.CONSOLE</span>
          </div>
          <p style={{ fontSize: '0.7rem', color: '#52525b', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Core Infrastructure</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.85rem 1.25rem',
                borderRadius: '12px',
                background: activeTab === item.id ? 'rgba(99, 102, 241, 0.08)' : 'transparent',
                color: activeTab === item.id ? '#6366f1' : '#71717a',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                fontSize: '0.95rem',
                fontWeight: activeTab === item.id ? 600 : 400
              }}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              window.location.reload();
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.85rem', padding: '0.75rem' }}
          >
            <FiSettings size={16} /> Terminate Session
          </button>
          
          <button
            onClick={() => window.open('http://localhost:5173', '_blank')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#52525b', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.03)', borderRadius: '10px', cursor: 'pointer', fontSize: '0.85rem', padding: '0.75rem', justifyContent: 'center' }}
          >
            <FiExternalLink size={16} /> Public Preview
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main style={{ marginLeft: '280px', flex: 1, padding: '3rem 4rem', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3.5rem' }}>
            <div>
              <h1 style={{ fontSize: '2rem', fontWeight: 800, margin: 0, letterSpacing: '-0.03em' }}>{menuItems.find(i => i.id === activeTab)?.label}</h1>
              <p style={{ color: '#52525b', margin: '0.5rem 0 0 0', fontSize: '0.95rem' }}>Operational status: <span style={{ color: '#10b981' }}>Active</span></p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
               <div style={{ textAlign: 'right' }}>
                  <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 600 }}>Naji Ahmad</p>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#52525b' }}>Lead Architect</p>
               </div>
               <DevLogo />
            </div>
          </header>

          {renderContent()}
        </div>
      </main>
    </div>
  );
};

// --- Real-Time Overview Stats ---
const OverviewStats = () => {
  const [counts, setCounts] = useState({ projects: 0, skills: 0 });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [projRes, skillRes] = await Promise.all([
          fetch('http://localhost:5001/api/projects'),
          fetch('http://localhost:5001/api/skills')
        ]);
        const projects = await projRes.json();
        const skills = await skillRes.json();
        setCounts({
          projects: Array.isArray(projects) ? projects.length : 0,
          skills: Array.isArray(skills) ? skills.length : 0
        });
      } catch (err) {
        console.error('Overview fetch error:', err);
      }
    };

    fetchCounts();
    const channel = new BroadcastChannel('portfolio_updates');
    channel.onmessage = fetchCounts;
    return () => channel.close();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
      <StatsCard label="Total Visitors" value="1,284" change="+12%" icon={FiPieChart} color="#6366f1" />
      <StatsCard label="Live Skills" value={counts.skills} change="Active" icon={FiCpu} color="#10b981" />
      <StatsCard label="Live Projects" value={counts.projects} change="Deployed" icon={FiLayout} color="#8b5cf6" />
      <StatsCard label="Uptime" value="99.9%" change="Stable" icon={FiCpu} color="#f59e0b" />
    </div>
  );
};

// --- Modern Stats Card ---
const StatsCard = ({ label, value, change, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -4, borderColor: `${color}40` }}
    style={{
      padding: '1.75rem',
      borderRadius: '24px',
      background: '#0a0a0f',
      border: '1px solid rgba(255, 255, 255, 0.03)',
      transition: 'border-color 0.3s ease'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.5rem' }}>
      <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: `${color}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        <Icon size={22} />
      </div>
      <div style={{ fontSize: '0.75rem', background: change.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(255,255,255,0.03)', color: change.startsWith('+') ? '#10b981' : '#71717a', padding: '4px 8px', borderRadius: '6px', fontWeight: 700 }}>
        {change}
      </div>
    </div>
    <div>
      <h4 style={{ fontSize: '1.85rem', fontWeight: 800, margin: 0, color: '#fff' }}>{value}</h4>
      <p style={{ fontSize: '0.85rem', color: '#52525b', margin: '0.4rem 0 0 0', fontWeight: 500 }}>{label}</p>
    </div>
  </motion.div>
);

// --- Real-Time Tech Stack Pulse ---
const TechPulse = () => {
  const [techStats, setTechStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechStats = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/projects`);
        if (response.ok) {
          const projects = await response.json();
          
          if (Array.isArray(projects)) {
            const counts = {};
            projects.forEach(p => {
              if (p.techStack && Array.isArray(p.techStack)) {
                p.techStack.forEach(tech => {
                  counts[tech] = (counts[tech] || 0) + 1;
                });
              }
            });
            
            const sorted = Object.entries(counts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([name, count]) => ({ name, count }));
            
            setTechStats(sorted);
          }
        }
      } catch (err) {
        console.error('Tech pulse fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechStats();
    
    // Refresh on updates
    const channel = new BroadcastChannel('portfolio_updates');
    channel.onmessage = (e) => {
      if (e.data === 'projects_updated') fetchTechStats();
    };
    
    return () => channel.close();
  }, []);

  return (
    <div style={{ padding: '2rem', borderRadius: '24px', background: '#0a0a0f', border: '1px solid rgba(255, 255, 255, 0.03)', minHeight: '240px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Tech Stack Pulse</h3>
          <p style={{ fontSize: '0.75rem', color: '#52525b', margin: '0.25rem 0 0 0' }}>Real-time database analysis</p>
        </div>
        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1', boxShadow: '0 0 15px #6366f1' }} />
      </div>

      {loading ? (
        <div style={{ height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3f3f46' }}>Analyzing...</div>
      ) : (
        <div style={{ display: 'grid', gap: '1.25rem' }}>
          {techStats.map((tech, index) => (
            <div key={tech.name}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.5rem' }}>
                <span style={{ color: '#a1a1aa', fontWeight: 500 }}>{tech.name}</span>
                <span style={{ color: '#6366f1', fontWeight: 700 }}>{tech.count} {tech.count === 1 ? 'Project' : 'Projects'}</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,0.02)', borderRadius: '3px', overflow: 'hidden' }}>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${(tech.count / Math.max(...techStats.map(t => t.count))) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  style={{ height: '100%', background: 'linear-gradient(90deg, #6366f1, #a855f7)', borderRadius: '3px' }} 
                />
              </div>
            </div>
          ))}
          {techStats.length === 0 && (
            <div style={{ textAlign: 'center', color: '#52525b', fontSize: '0.85rem', padding: '2rem' }}>
              Add projects to see tech distribution
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// --- Refined System Health ---
const SystemHealth = () => {
  const [metrics, setMetrics] = useState({ cpu: 8, ram: 42, latency: 24 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(5, Math.min(20, prev.cpu + (Math.random() * 4 - 2))),
        ram: 42 + (Math.random() * 1),
        latency: 22 + Math.floor(Math.random() * 5)
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '2rem', borderRadius: '24px', background: '#0a0a0f', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', boxShadow: '0 0 10px #10b981' }} />
        System Resources
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <HealthBar label="Processor Load" value={Math.round(metrics.cpu)} color="#6366f1" />
        <HealthBar label="Memory Buffer" value={Math.round(metrics.ram)} color="#8b5cf6" />
        <HealthBar label="Network Latency" value={metrics.latency} color="#10b981" suffix="ms" max={100} />
      </div>
    </div>
  );
};

const HealthBar = ({ label, value, color, suffix = "%", max = 100 }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.75rem', fontWeight: 500 }}>
      <span style={{ color: '#71717a' }}>{label}</span>
      <span style={{ color: '#fff' }}>{value}{suffix}</span>
    </div>
    <div style={{ height: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '2px', overflow: 'hidden' }}>
      <motion.div animate={{ width: `${(value / max) * 100}%` }} transition={{ type: "spring", stiffness: 50 }} style={{ height: '100%', background: color, borderRadius: '2px' }} />
    </div>
  </div>
);

// --- Refined Tech Distribution ---
const TechDistribution = () => {
  const stacks = [
    { name: 'MERN Stack', val: 92, color: '#6366f1' },
    { name: 'Cloud Infrastructure', val: 78, color: '#10b981' },
    { name: 'System Architecture', val: 85, color: '#f59e0b' },
  ];

  return (
    <div style={{ padding: '2rem', borderRadius: '24px', background: '#0a0a0f', border: '1px solid rgba(255, 255, 255, 0.03)' }}>
      <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '2rem' }}>Core Specialization</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {stacks.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div style={{ width: '4px', height: '16px', borderRadius: '2px', background: s.color }} />
             <span style={{ fontSize: '0.9rem', flex: 1, color: '#a1a1aa', fontWeight: 500 }}>{s.name}</span>
             <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fff' }}>{s.val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const DevLogo = () => (
  <motion.div
    whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(99, 102, 241, 0.4)' }}
    transition={{ type: "spring", stiffness: 300 }}
    style={{
      width: '48px',
      height: '48px',
      borderRadius: '14px',
      background: '#0a0a0f',
      border: '1px solid rgba(255,255,255,0.05)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    {/* Subtle Background Glow */}
    <div style={{ position: 'absolute', width: '100%', height: '100%', background: 'radial-gradient(circle, rgba(99, 102, 241, 0.1) 0%, transparent 70%)' }} />
    
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* The "N" Sigil formed by brackets and a slash */}
      <motion.path 
        d="M6 18L6 6L18 18L18 6" 
        stroke="#6366f1" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
      
      {/* Decorative Minimal Code Nodes */}
      <circle cx="6" cy="6" r="1.5" fill="#fff" />
      <circle cx="18" cy="18" r="1.5" fill="#fff" />
      
      {/* Floating Prompt Cursor */}
      <motion.rect 
        x="19" y="5" width="2" height="4" 
        fill="#8b5cf6" 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
      />
    </svg>
  </motion.div>
);



export default AdminLayout;
