import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DevMode = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [output, setOutput] = useState([
    { type: 'system', text: 'Welcome to Developer Mode. Type "help" to see available commands.' }
  ]);
  const inputRef = useRef(null);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // CMD + K or CTRL + K or type 'dev' sequentially (simplified to CMD+K here)
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [output]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = input.trim().toLowerCase();
      let res = '';

      if (cmd === 'help') {
        res = 'Available commands: help, clear, whoami, skills, projects, admin, sudo';
      } else if (cmd === 'clear') {
        setOutput([]);
        setInput('');
        return;
      } else if (cmd === 'whoami') {
        res = 'Naji Ahmad Javahir - Software Engineer';
      } else if (cmd === 'skills') {
        res = 'JavaScript, React, Node.js, Express, MongoDB, Java, Python...';
      } else if (cmd === 'projects') {
        res = '1. Healthcare Microservices\n2. ReVolve\n3. Vacation Home Rental\n4. Pharmacy Portal\n5. Bidding System';
      } else if (cmd === 'admin') {
        res = 'Redirecting to admin dashboard...';
        setTimeout(() => {
          window.location.href = '/admin';
        }, 1000);
      } else if (cmd === 'sudo') {
        res = 'Nice try. This incident will be reported.';
      } else if (cmd === '') {
        res = '';
      } else {
        res = `Command not found: ${cmd}`;
      }

      setOutput(prev => [
        ...prev, 
        { type: 'user', text: `> ${cmd}` },
        ...(res ? [{ type: 'system', text: res }] : [])
      ]);
      setInput('');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          style={{
            position: 'fixed',
            top: '5%',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '90%',
            maxWidth: '600px',
            background: 'rgba(10, 10, 15, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
            zIndex: 9999,
            overflow: 'hidden',
            fontFamily: '"Fira Code", monospace',
            color: '#10b981',
            backdropFilter: 'blur(10px)'
          }}
        >
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '8px 16px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>developer_mode.exe (Press CMD+K to close)</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#a1a1aa', cursor: 'pointer' }}
            >
              ✕
            </button>
          </div>

          <div style={{
            padding: '16px',
            height: '300px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            {output.map((line, i) => (
              <div key={i} style={{ 
                color: line.type === 'user' ? '#fff' : '#10b981',
                whiteSpace: 'pre-wrap',
                fontSize: '0.9rem'
              }}>
                {line.text}
              </div>
            ))}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ color: '#fff' }}>&gt;</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleCommand}
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#fff',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  width: '100%'
                }}
                autoFocus
              />
            </div>
            <div ref={bottomRef} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DevMode;
