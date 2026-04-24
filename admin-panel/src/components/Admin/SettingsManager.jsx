import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFileText, FiSave, FiCheckCircle, FiExternalLink } from 'react-icons/fi';

const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/settings`;

const SettingsManager = () => {
  const [resumeUrl, setResumeUrl] = useState('');
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
        setResumeUrl(data.resumeUrl);
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
        body: JSON.stringify({ resumeUrl }),
      });

      if (response.ok) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
        // Notify portfolio of update
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

  if (loading) return <div className="loading">Loading Settings...</div>;

  return (
    <div className="settings-manager">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="admin-card"
      >
        <div className="card-header">
          <h3><FiFileText /> Resume Management</h3>
          <p>Update your live resume link here. You can use a local path like <code>/resume.pdf</code> or an external link from Google Drive/Cloudinary.</p>
        </div>

        <div className="settings-form">
          <div className="input-group">
            <label>Resume Link / Path</label>
            <div className="url-input-wrapper">
              <input 
                type="text" 
                value={resumeUrl}
                onChange={(e) => setResumeUrl(e.target.value)}
                placeholder="/resume.pdf"
              />
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="preview-btn">
                <FiExternalLink /> Preview
              </a>
            </div>
          </div>

          <button 
            onClick={handleSave} 
            className={`save-btn ${success ? 'success' : ''}`}
            disabled={saving}
          >
            {saving ? 'Saving...' : success ? <><FiCheckCircle /> Saved!</> : <><FiSave /> Update Resume</>}
          </button>
        </div>
      </motion.div>

      <style jsx>{`
        .settings-manager {
          max-width: 800px;
          margin: 0 auto;
        }
        .admin-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          padding: 2rem;
          backdrop-filter: blur(10px);
        }
        .card-header h3 {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin: 0 0 0.5rem 0;
          color: var(--accent-primary);
        }
        .card-header p {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 2rem;
        }
        .input-group {
          margin-bottom: 1.5rem;
        }
        .input-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: var(--text-main);
        }
        .url-input-wrapper {
          display: flex;
          gap: 1rem;
        }
        input {
          flex: 1;
          background: rgba(0, 0, 0, 0.2);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          padding: 0.8rem 1rem;
          color: white;
          outline: none;
          transition: border-color 0.3s;
        }
        input:focus {
          border-color: var(--accent-primary);
        }
        .preview-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.2rem;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          color: white;
          text-decoration: none;
          font-size: 0.9rem;
          transition: background 0.3s;
        }
        .preview-btn:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .save-btn {
          width: 100%;
          padding: 1rem;
          border: none;
          border-radius: 10px;
          background: var(--accent-primary);
          color: white;
          font-weight: 600;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          transition: all 0.3s;
        }
        .save-btn:hover:not(:disabled) {
          filter: brightness(1.2);
          transform: translateY(-2px);
        }
        .save-btn.success {
          background: #10b981;
        }
        .save-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default SettingsManager;
