import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUpload, FiFileText, FiCheck, FiAlertCircle, FiExternalLink, FiClock } from 'react-icons/fi';

const ResumeManager = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [currentResume, setCurrentResume] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    fetchCurrentSettings();
  }, []);

  const fetchCurrentSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings`);
      const data = await res.json();
      setCurrentResume(data);
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      setMessage({ type: '', text: '' });
    } else {
      setMessage({ type: 'error', text: 'Please select a valid PDF file.' });
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append('resume', file);

    try {
      const res = await fetch(`${API_URL}/api/upload-resume`, {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setMessage({ type: 'success', text: 'Resume updated successfully!' });
        setFile(null);
        fetchCurrentSettings();
        
        // Notify other tabs
        const channel = new BroadcastChannel('portfolio_updates');
        channel.postMessage('settings_updated');
        channel.close();
      } else {
        throw new Error('Upload failed');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      setMessage({ type: 'error', text: 'Failed to upload resume. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        
        {/* Left: Upload Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            background: '#0a0a0f',
            padding: '2.5rem',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.03)',
          }}
        >
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <FiUpload color="#6366f1" /> Upload New Version
          </h3>
          
          <div 
            style={{
              border: '2px dashed rgba(99, 102, 241, 0.2)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.3s ease',
              background: file ? 'rgba(99, 102, 241, 0.03)' : 'transparent'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFile = e.dataTransfer.files[0];
              if (droppedFile.type === 'application/pdf') setFile(droppedFile);
            }}
          >
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: 0,
                cursor: 'pointer'
              }}
            />
            
            <FiFileText size={40} color={file ? '#6366f1' : '#3f3f46'} style={{ marginBottom: '1rem' }} />
            <p style={{ color: file ? '#fff' : '#71717a', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
              {file ? file.name : 'Click or drag PDF here'}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#52525b' }}>Maximum size: 10MB</p>
          </div>

          <button
            onClick={handleUpload}
            disabled={!file || loading}
            style={{
              width: '100%',
              marginTop: '2rem',
              padding: '1rem',
              borderRadius: '12px',
              background: file ? '#6366f1' : '#16161d',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              cursor: file ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem'
            }}
          >
            {loading ? 'Uploading Architecture...' : 'Update Resume'}
          </button>

          <AnimatePresence>
            {message.text && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  borderRadius: '10px',
                  background: message.type === 'success' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                  color: message.type === 'success' ? '#10b981' : '#ef4444',
                  fontSize: '0.85rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                {message.type === 'success' ? <FiCheck /> : <FiAlertCircle />}
                {message.text}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Right: Status Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <div style={{
            background: '#0a0a0f',
            padding: '2rem',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.03)',
          }}>
            <h4 style={{ color: '#52525b', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>Current Asset Status</h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' }}>
                    <FiFileText size={18} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Main Resume</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#52525b' }}>PDF Document</p>
                  </div>
                </div>
                {currentResume?.resumeUrl && (
                  <button 
                    onClick={() => window.open(`${currentResume.resumeUrl}?v=${Date.now()}`, '_blank')}
                    style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer' }}
                  >
                    <FiExternalLink size={18} />
                  </button>
                )}
              </div>

              <div style={{ height: '1px', background: 'rgba(255,255,255,0.03)' }} />

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
                    <FiClock size={18} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600 }}>Last Synced</p>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#52525b' }}>
                      {currentResume?.lastUpdated ? new Date(currentResume.lastUpdated).toLocaleString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.05), rgba(168, 85, 247, 0.05))',
            padding: '2rem',
            borderRadius: '24px',
            border: '1px solid rgba(99, 102, 241, 0.1)',
          }}>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#a1a1aa', lineHeight: '1.6' }}>
              Updating your resume here will automatically synchronize the "Download CV" button across the public portfolio. The asset is stored on our high-performance infrastructure for rapid delivery.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default ResumeManager;
