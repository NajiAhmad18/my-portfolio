import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const AdminTerminal = ({ onClose }) => {
  const [step, setStep] = useState('booting');
  const [lines, setLines] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [inputStep, setInputStep] = useState('username'); // 'username' or 'password'
  const [error, setError] = useState('');
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const bootSequence = [
    'Initializing Antigravity Kernel v4.6.0...',
    'Loading system modules...',
    'Network interface eth0: UP',
    'Secure Shell (SSH) initialized on port 22',
    'Accessing encrypted file system...',
    'Mounting /root...',
    'Kernel Ready.',
    '------------------------------------------',
    'ANTIGRAVITY SYSTEMS PORTFOLIO OS',
    'WARNING: UNAUTHORIZED ACCESS PROHIBITED',
    '------------------------------------------'
  ];

  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootSequence.length) {
        setLines(prev => [...prev, bootSequence[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setStep('login');
      }
    }, 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (step === 'login' && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, inputStep]);

  const handleLogin = (e) => {
    if (e.key === 'Enter') {
      const trimmedUsername = username.trim().toLowerCase();
      const trimmedPassword = password.trim();

      if (inputStep === 'username') {
        if (trimmedUsername === 'naji' || trimmedUsername === 'admin') {
          setInputStep('password');
          setLines(prev => [...prev, `login as: ${trimmedUsername}`]);
          // Short delay to ensure focus on next input
          setTimeout(() => inputRef.current?.focus(), 10);
        } else {
          setLines(prev => [...prev, `Invalid user: ${trimmedUsername}`]);
          setUsername('');
        }
      } else if (inputStep === 'password') {
        if (trimmedPassword === 'admin123') {
          setLines(prev => [...prev, '****************', 'Authentication successful.', 'Redirecting to Admin Panel...']);
          
          // Store a session flag so the admin layout knows we are logged in
          localStorage.setItem('admin_auth', 'true');
          
          setTimeout(() => {
            // Using window.location to ensure a clean navigation
            window.location.href = '/admin';
          }, 1500);
        } else {
          setLines(prev => [...prev, 'Authentication failed. Access denied.']);
          setPassword('');
          setInputStep('username');
          setUsername('');
          setTimeout(() => inputRef.current?.focus(), 10);
        }
      }
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(5, 5, 10, 0.98)',
      zIndex: 10000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '"Fira Code", "Courier New", monospace',
      color: '#10b981',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{
          width: '100%',
          maxWidth: '800px',
          height: '500px',
          background: '#0a0a0f',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '8px',
          padding: '2rem',
          overflowY: 'auto',
          boxShadow: '0 0 30px rgba(16, 185, 129, 0.1)'
        }}
      >
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ef4444' }} onClick={onClose} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#f59e0b' }} />
          <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#10b981' }} />
        </div>

        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: '0.25rem', opacity: 0.9 }}>{line}</div>
        ))}

        {step === 'login' && (
          <div style={{ marginTop: '1rem' }}>
            {inputStep === 'username' ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span>login as:</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleLogin}
                  style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', flex: 1 }}
                  autoFocus
                />
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <span>password for {username}:</span>
                <input
                  ref={inputRef}
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleLogin}
                  style={{ background: 'transparent', border: 'none', color: '#fff', outline: 'none', flex: 1 }}
                  autoFocus
                />
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminTerminal;
