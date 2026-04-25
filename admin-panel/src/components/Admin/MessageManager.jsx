import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiTrash2, FiCheckCircle, FiClock } from 'react-icons/fi';

const MessageManager = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = `${import.meta.env.VITE_API_URL || 'http://localhost:5001'}/api/messages`;

  const fetchMessages = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Failed to fetch messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}/read`, { method: 'PUT' });
      if (response.ok) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, read: true } : msg));
      }
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    }
  };

  const deleteMessage = async (id) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (response.ok) {
        setMessages(messages.filter(msg => msg._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete message:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return <div style={{ padding: '4rem', textAlign: 'center', color: '#71717a' }}>Loading messages...</div>;
  }

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, margin: '0 0 0.5rem 0' }}>Inbox</h2>
          <p style={{ color: '#71717a', margin: 0, fontSize: '0.9rem' }}>
            {messages.filter(m => !m.read).length} unread messages
          </p>
        </div>
        <button 
          onClick={fetchMessages}
          style={{ background: '#16161d', border: '1px solid #27272a', padding: '0.75rem 1.5rem', borderRadius: '12px', color: '#fff', cursor: 'pointer', fontWeight: 600 }}
        >
          Refresh
        </button>
      </div>

      {messages.length === 0 ? (
        <div style={{ padding: '6rem', textAlign: 'center', background: '#0a0a0f', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.03)' }}>
          <FiMessageSquare size={48} style={{ opacity: 0.2, marginBottom: '1.5rem', color: '#6366f1' }} />
          <h3 style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>No messages yet</h3>
          <p style={{ color: '#71717a', margin: 0 }}>When someone contacts you via your portfolio, it will appear here.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                style={{
                  background: msg.read ? '#0a0a0f' : '#111116',
                  border: `1px solid ${msg.read ? 'rgba(255,255,255,0.03)' : 'rgba(99, 102, 241, 0.2)'}`,
                  borderRadius: '16px',
                  padding: '1.5rem',
                  display: 'flex',
                  gap: '1.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {!msg.read && (
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', background: '#6366f1' }} />
                )}
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                    <div>
                      <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '1.1rem', fontWeight: 700 }}>{msg.name}</h4>
                      <a href={`mailto:${msg.email}`} style={{ color: '#6366f1', textDecoration: 'none', fontSize: '0.85rem' }}>{msg.email}</a>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#71717a', fontSize: '0.8rem' }}>
                      <FiClock size={14} />
                      {formatDate(msg.createdAt)}
                    </div>
                  </div>
                  
                  <div style={{ color: '#d4d4d8', fontSize: '0.95rem', lineHeight: 1.6, background: 'rgba(255,255,255,0.02)', padding: '1rem', borderRadius: '12px' }}>
                    {msg.message}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', justifyContent: 'center' }}>
                  {!msg.read && (
                    <button 
                      onClick={() => markAsRead(msg._id)}
                      title="Mark as read"
                      style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <FiCheckCircle size={18} />
                    </button>
                  )}
                  <button 
                    onClick={() => deleteMessage(msg._id)}
                    title="Delete message"
                    style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default MessageManager;
