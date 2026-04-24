import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import GitHubStats from './GitHubStats';
import ProjectManager from './ProjectManager';
import SkillManager from './SkillManager';
import { FiHome, FiLayout, FiGithub, FiMessageSquare, FiSettings, FiExternalLink, FiPieChart, FiCpu } from 'react-icons/fi';

const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  // Simple authentication check
  useEffect(() => {
    const isAuth = localStorage.getItem('admin_auth') === 'true';
    if (!isAuth) {
      navigate('/');
    }
  }, [navigate]);

  const menuItems = [
    { id: 'overview', label: 'Overview', icon: FiPieChart },
    { id: 'projects', label: 'Projects', icon: FiLayout },
    { id: 'skills', label: 'Skills', icon: FiCpu },
    { id: 'messages', label: 'Messages', icon: FiMessageSquare },
    { id: 'settings', label: 'Settings', icon: FiSettings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
             {/* Key Metrics Row */}
             <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
                <StatsCard label="Total Visitors" value="1,284" change="+12%" icon={FiPieChart} color="#3b82f6" />
                <StatsCard label="Messages Received" value="42" change="+5" icon={FiMessageSquare} color="#10b981" />
                <StatsCard label="Projects Deployed" value="8" change="0" icon={FiLayout} color="#8b5cf6" />
                <StatsCard label="Avg. Session Time" value="2m 45s" change="+18s" icon={FiPieChart} color="#f59e0b" />
             </div>

             <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>Developer Activity (Real Data)</h2>
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
        return (
          <div style={{ padding: '2rem', textAlign: 'center', color: '#71717a' }}>
            <FiMessageSquare size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <h3>Message Inbox</h3>
            <p>Connect your backend or EmailJS logs to view messages here.</p>
          </div>
        );
      case 'settings':
        return (
          <div style={{ padding: '2rem', color: '#fff' }}>
             <h3>Dashboard Settings</h3>
             <p style={{ color: '#71717a' }}>Configure your profile, GitHub username, and API keys.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      color: '#fff',
      display: 'flex',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Sidebar */}
      <div style={{
        width: '260px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        padding: '2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        position: 'fixed',
        height: '100vh'
      }}>
        <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, background: 'linear-gradient(to right, #3b82f6, #8b5cf6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
            Admin Panel
          </h1>
          <p style={{ fontSize: '0.75rem', color: '#71717a', marginTop: '0.25rem' }}>Portfolio Management</p>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: activeTab === item.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent',
                color: activeTab === item.id ? '#3b82f6' : '#a1a1aa',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                textAlign: 'left',
                fontSize: '0.9rem',
                fontWeight: activeTab === item.id ? 600 : 400
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <button
            onClick={() => {
              localStorage.removeItem('admin_auth');
              window.location.href = '/';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '0.5rem'
            }}
          >
            <FiSettings /> Logout
          </button>
          
          <button
            onClick={() => {
              window.location.href = '/';
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#71717a',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              padding: '0.5rem'
            }}
          >
            <FiExternalLink /> Back to Site
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main style={{
        marginLeft: '260px',
        flex: 1,
        padding: '2rem 3rem',
        background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.05), transparent 40%)'
      }}>
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 style={{ fontSize: '1.75rem', margin: 0 }}>{menuItems.find(i => i.id === activeTab)?.label}</h2>
            <p style={{ color: '#71717a', margin: '0.25rem 0 0 0' }}>Welcome back, Naji.</p>
          </div>
          <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, #3b82f6, #8b5cf6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600 }}>
            N
          </div>
        </header>

        {renderContent()}
      </main>
    </div>
  );
};

const StatsCard = ({ label, value, change, icon: Icon, color }) => (
  <motion.div
    whileHover={{ y: -5 }}
    style={{
      padding: '1.5rem',
      borderRadius: '16px',
      background: 'rgba(255, 255, 255, 0.03)',
      border: '1px solid rgba(255, 255, 255, 0.08)',
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>
        <Icon size={20} />
      </div>
      <div style={{ fontSize: '0.75rem', color: change.startsWith('+') ? '#10b981' : '#ef4444', fontWeight: 600 }}>
        {change}
      </div>
    </div>
    <div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#fff' }}>{value}</div>
      <div style={{ fontSize: '0.85rem', color: '#71717a' }}>{label}</div>
    </div>
  </motion.div>
);

const SystemHealth = () => {
  const [metrics, setMetrics] = useState({ cpu: 12, ram: 45, disk: 28 });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics({
        cpu: Math.floor(Math.random() * 15) + 5,
        ram: 45 + Math.floor(Math.random() * 3),
        disk: 28
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FiPieChart /> System Health</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        <HealthBar label="CPU Usage" value={metrics.cpu} color="#3b82f6" />
        <HealthBar label="RAM Usage" value={metrics.ram} color="#8b5cf6" />
        <HealthBar label="Storage" value={metrics.disk} color="#10b981" />
      </div>
    </div>
  );
};

const HealthBar = ({ label, value, color }) => (
  <div>
    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.5rem', color: '#a1a1aa' }}>
      <span>{label}</span>
      <span>{value}%</span>
    </div>
    <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px' }}>
      <motion.div animate={{ width: `${value}%` }} style={{ height: '100%', background: color, borderRadius: '3px' }} />
    </div>
  </div>
);

const TechDistribution = () => {
  const skills = [
    { name: 'Frontend', val: 90, color: '#6366f1' },
    { name: 'Backend', val: 85, color: '#10b981' },
    { name: 'DevOps', val: 65, color: '#f59e0b' },
    { name: 'Mobile', val: 40, color: '#ec4899' },
  ];

  return (
    <div style={{ padding: '1.5rem', borderRadius: '16px', background: 'rgba(255, 255, 255, 0.03)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
      <h3 style={{ fontSize: '1rem', marginBottom: '1.5rem' }}>Skill Matrix</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {skills.map(s => (
          <div key={s.name} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
             <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color }} />
             <span style={{ fontSize: '0.85rem', flex: 1, color: '#d4d4d8' }}>{s.name}</span>
             <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{s.val}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLayout;
