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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
            <FiGithub /> Profile Stats
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#3b82f6' }}>{stats.user.public_repos}</div>
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Public Repos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#10b981' }}>{stats.user.followers}</div>
              <div style={{ fontSize: '0.8rem', color: '#a1a1aa' }}>Followers</div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
            <FiCode /> Most Used Languages
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {sortedLangs.map(([lang, count]) => (
              <div key={lang}>
                <div style={{ display: 'flex', justifyContent: 'between', marginBottom: '0.25rem' }}>
                  <span style={{ fontSize: '0.9rem', color: '#d4d4d8' }}>{lang}</span>
                  <span style={{ fontSize: '0.8rem', color: '#71717a', marginLeft: 'auto' }}>{Math.round((count / stats.repos.length) * 100)}%</span>
                </div>
                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(count / stats.repos.length) * 100}%` }}
                    style={{ height: '100%', background: '#3b82f6', borderRadius: '3px' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{
          padding: '1.5rem',
          borderRadius: '16px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)'
        }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#fff' }}>
            <FiGitCommit /> Commit Intensity (Latest Repos)
          </h3>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '60px', padding: '0 0.5rem' }}>
            {stats.repos.slice(0, 20).map((repo, i) => {
              const height = (repo.size % 100) / 2 + 10; // Mocking intensity based on size for visualization
              return (
                <motion.div
                  key={repo.id}
                  initial={{ height: 0 }}
                  animate={{ height: `${height}%` }}
                  transition={{ delay: i * 0.02 }}
                  style={{
                    flex: 1,
                    background: repo.stargazers_count > 0 ? '#10b981' : '#3b82f6',
                    borderRadius: '2px',
                    opacity: 0.6 + (height / 200)
                  }}
                  title={`${repo.name}: ${repo.size}KB`}
                />
              );
            })}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', fontSize: '0.7rem', color: '#71717a' }}>
            <span>Most Recent</span>
            <span>Older</span>
          </div>
        </div>
      </div>

      {/* Right Column: Recent Activity */}
      <div style={{
        padding: '1.5rem',
        borderRadius: '16px',
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        overflow: 'hidden'
      }}>
        <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', color: '#fff' }}>
          <FiActivity /> Recent Activity
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxHeight: '400px', overflowY: 'auto', paddingRight: '0.5rem' }}>
          {stats.events.filter(e => e.type === 'PushEvent' || e.type === 'CreateEvent').slice(0, 10).map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                padding: '0.75rem',
                borderRadius: '8px',
                background: 'rgba(255,255,255,0.02)',
                borderLeft: `3px solid ${event.type === 'PushEvent' ? '#10b981' : '#3b82f6'}`
              }}
            >
              <div style={{ fontSize: '0.85rem', color: '#fff', marginBottom: '0.25rem' }}>
                {event.type === 'PushEvent' ? 'Pushed to ' : 'Created '}
                <span style={{ color: '#3b82f6' }}>{event.repo.name.split('/')[1]}</span>
              </div>
              {event.payload.commits && event.payload.commits[0] && (
                <div style={{ fontSize: '0.75rem', color: '#a1a1aa', fontStyle: 'italic' }}>
                  "{event.payload.commits[0].message}"
                </div>
              )}
              <div style={{ fontSize: '0.7rem', color: '#71717a', marginTop: '0.25rem' }}>
                {new Date(event.created_at).toLocaleDateString()}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GitHubStats;
