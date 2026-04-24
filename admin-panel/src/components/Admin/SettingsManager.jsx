import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiCheckCircle, FiUser, FiGlobe, FiGithub, FiLinkedin, FiMail, FiTwitter, FiInfo } from 'react-icons/fi';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/settings`;

const SettingsManager = () => {
  const [settings, setSettings] = useState({
    siteTitle: '',
    siteSubtitle: '',
    aboutText: '',
    socialLinks: {
      github: '',
      linkedin: '',
      email: '',
      twitter: ''
    }
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setSettings({
          siteTitle: data.siteTitle || '',
          siteSubtitle: data.siteSubtitle || '',
          aboutText: data.aboutText || '',
          socialLinks: data.socialLinks || { github: '', linkedin: '', email: '', twitter: '' }
        });
      }
    } catch (err) {
      console.error('Failed to fetch settings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        
        const channel = new BroadcastChannel('portfolio_updates');
        channel.postMessage('settings_updated');
        channel.close();
      }
    } catch (err) {
      console.error('Failed to save settings:', err);
    } finally {
      setSaving(false);
    }
  };

  const updateSocial = (key, value) => {
    setSettings(prev => ({
      ...prev,
      socialLinks: { ...prev.socialLinks, [key]: value }
    }));
  };

  if (loading) return <div style={{ color: '#71717a', padding: '2rem' }}>Loading Global Configurations...</div>;

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* General Settings */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          background: '#0a0a0f',
          padding: '2.5rem',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
          <FiGlobe color="#6366f1" /> Global Metadata
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#71717a', fontWeight: 500 }}>Site Title</label>
            <input 
              style={inputStyle}
              value={settings.siteTitle}
              onChange={(e) => setSettings({...settings, siteTitle: e.target.value})}
              placeholder="e.g. Naji Ahmad"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontSize: '0.85rem', color: '#71717a', fontWeight: 500 }}>Professional Subtitle</label>
            <input 
              style={inputStyle}
              value={settings.siteSubtitle}
              onChange={(e) => setSettings({...settings, siteSubtitle: e.target.value})}
              placeholder="e.g. Software Engineer"
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <label style={{ fontSize: '0.85rem', color: '#71717a', fontWeight: 500 }}>About Teaser / Bio</label>
          <textarea 
            style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            value={settings.aboutText}
            onChange={(e) => setSettings({...settings, aboutText: e.target.value})}
            placeholder="A short, high-impact description of your work..."
          />
        </div>
      </motion.div>

      {/* Social Links */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          background: '#0a0a0f',
          padding: '2.5rem',
          borderRadius: '24px',
          border: '1px solid rgba(255,255,255,0.03)',
        }}
      >
        <h3 style={{ fontSize: '1.25rem', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem', color: '#fff' }}>
          <FiUser color="#10b981" /> Social Architecture
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div style={socialGroupStyle}>
            <FiGithub color="#71717a" />
            <input 
              style={socialInputStyle}
              value={settings.socialLinks.github}
              onChange={(e) => updateSocial('github', e.target.value)}
              placeholder="GitHub URL"
            />
          </div>
          <div style={socialGroupStyle}>
            <FiLinkedin color="#71717a" />
            <input 
              style={socialInputStyle}
              value={settings.socialLinks.linkedin}
              onChange={(e) => updateSocial('linkedin', e.target.value)}
              placeholder="LinkedIn URL"
            />
          </div>
          <div style={socialGroupStyle}>
            <FiMail color="#71717a" />
            <input 
              style={socialInputStyle}
              value={settings.socialLinks.email}
              onChange={(e) => updateSocial('email', e.target.value)}
              placeholder="Contact Email"
            />
          </div>
          <div style={socialGroupStyle}>
            <FiTwitter color="#71717a" />
            <input 
              style={socialInputStyle}
              value={settings.socialLinks.twitter}
              onChange={(e) => updateSocial('twitter', e.target.value)}
              placeholder="Twitter / X URL"
            />
          </div>
        </div>
      </motion.div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', alignItems: 'center' }}>
        {success && (
          <motion.span 
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ color: '#10b981', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
          >
            <FiCheckCircle /> Configuration Deployed Successfully
          </motion.span>
        )}
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{
            padding: '1rem 2.5rem',
            borderRadius: '14px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            fontWeight: 600,
            cursor: saving ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transition: 'all 0.2s ease',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.2)'
          }}
        >
          {saving ? 'Processing...' : <><FiSave /> Save Changes</>}
        </button>
      </div>
    </div>
  );
};

const inputStyle = {
  background: '#16161d',
  border: '1px solid #27272a',
  borderRadius: '12px',
  padding: '0.85rem 1.25rem',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  transition: 'border-color 0.2s ease',
};

const socialGroupStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  background: '#16161d',
  border: '1px solid #27272a',
  borderRadius: '12px',
  padding: '0 1.25rem',
};

const socialInputStyle = {
  background: 'transparent',
  border: 'none',
  padding: '0.85rem 0',
  color: '#fff',
  fontSize: '0.95rem',
  outline: 'none',
  flex: 1
};

export default SettingsManager;
