import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiGitCommit, FiCode, FiActivity } from 'react-icons/fi';

const GITHUB_USERNAME = 'ShafnyHadhy';

const GitHubStats = () => {
  const [stats, setStats] = useState({
    user: null,
    repos: [],
    events: [],
    languages: {},
    loading: true,
    error: null
  });

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [userRes, reposRes, eventsRes] = await Promise.all([
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
          fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=20`)
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API limit reached or user not found');

        const user = await userRes.json();
        const repos = await reposRes.json();
        const events = await eventsRes.json();

        // Calculate most used languages
        const langs = {};
        repos.forEach(repo => {
          if (repo.language) {
            langs[repo.language] = (langs[repo.language] || 0) + 1;
          }
        });

        setStats({
          user,
          repos,
          events,
          languages: langs,
          loading: false,
          error: null
        });
      } catch (err) {
        setStats(prev => ({ ...prev, loading: false, error: err.message }));
      }
    };

    fetchGitHubData();
  }, []);

  if (stats.loading) return <div style={{ color: '#fff' }}>Loading real-time GitHub data...</div>;
  if (stats.error) return <div style={{ color: '#ef4444' }}>Error: {stats.error}</div>;

  const sortedLangs = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '2rem' }}>
      {/* Left Column: Stats & Languages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{
          padding: '1.75rem',
          borderRadius: '24px',
          background: '#0a0a0f',
          border: '1px solid rgba(255, 255, 255, 0.03)'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
            <FiGithub color="#6366f1" /> Profile Velocity
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{stats.user.public_repos}</div>
              <div style={{ fontSize: '0.75rem', color: '#52525b', fontWeight: 600, textTransform: 'uppercase' }}>Repositories</div>
            </div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff' }}>{stats.user.followers}</div>
              <div style={{ fontSize: '0.75rem', color: '#52525b', fontWeight: 600, textTransform: 'uppercase' }}>Followers</div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '1.75rem',
          borderRadius: '24px',
          background: '#0a0a0f',
          border: '1px solid rgba(255, 255, 255, 0.03)'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
            <FiCode color="#8b5cf6" /> Logic Distribution
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {sortedLangs.map(([lang, count]) => (
              <div key={lang}>
                <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#a1a1aa', fontWeight: 500 }}>{lang}</span>
                  <span style={{ fontSize: '0.8rem', color: '#52525b', marginLeft: 'auto', fontWeight: 700 }}>{Math.round((count / stats.repos.length) * 100)}%</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(255,255,255,0.02)', borderRadius: '2px' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / stats.repos.length) * 100}%` }}
                    style={{ height: '100%', background: '#6366f1', borderRadius: '2px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column: Recent Activity */}
      <div style={{
        padding: '1.75rem',
        borderRadius: '24px',
        background: '#0a0a0f',
        border: '1px solid rgba(255, 255, 255, 0.03)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', color: '#fff', fontSize: '1rem', fontWeight: 700 }}>
          <FiActivity color="#10b981" /> Transmission Logs
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', overflowY: 'auto', flex: 1, paddingRight: '0.5rem' }}>
          {stats.events.filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent').slice(0, 8).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: '1rem',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.02)'
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#fff', fontWeight: 600, marginBottom: '0.25rem' }}>
                {event.type === 'PushEvent' ? 'PROD_PUSH' : 'REPO_INIT'} &raquo; <span style={{ color: '#6366f1' }}>{event.repo.name.split('/')[1]}</span>
              </div>
              {event.payload.commits && event.payload.commits[0] && (
                <div style={{ fontSize: '0.75rem', color: '#52525b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {event.payload.commits[0].message}
                </div>
              )}
              <div style={{ fontSize: '0.65rem', color: '#3f3f46', marginTop: '0.5rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                {new Date(event.created_at).toLocaleTimeString()} // {new Date(event.created_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
