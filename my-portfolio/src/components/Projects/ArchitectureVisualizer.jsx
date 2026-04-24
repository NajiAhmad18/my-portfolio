import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { architectures } from '../../data/architectures';

/* ── Thin vertical stem ─────────────────────────────────────── */
const VStem = ({ color, height = 24 }) => (
  <div style={{
    width: 2,
    height,
    background: color,
    flexShrink: 0,
    alignSelf: 'center',
  }} />
);

/* ── Fork connector: stem → horizontal bus ──────────────────── */
const ForkConnector = ({ color }) => (
  <div style={{ position: 'relative', width: '100%', height: 32 }}>
    {/* vertical stem down from gateway */}
    <div style={{
      position: 'absolute',
      top: 0, left: '50%',
      width: 2, height: '100%',
      background: color,
      transform: 'translateX(-50%)',
    }} />
    {/* horizontal bus bar at bottom */}
    <div style={{
      position: 'absolute',
      bottom: 0, left: '4%',
      width: '92%', height: 2,
      background: color,
    }} />
    {/* left end cap */}
    <div style={{
      position: 'absolute',
      bottom: 0, left: '4%',
      width: 2, height: 10,
      background: color,
    }} />
    {/* right end cap */}
    <div style={{
      position: 'absolute',
      bottom: 0, right: '4%',
      width: 2, height: 10,
      background: color,
    }} />
  </div>
);

/* ── Drop zone: space below bus bar with centre drop line ────── */
const DropZone = ({ color }) => (
  <div style={{ position: 'relative', width: '100%', height: 24 }}>
    {/* centre vertical drop */}
    <div style={{
      position: 'absolute',
      top: 0, left: '50%',
      width: 2, height: '100%',
      background: color,
      transform: 'translateX(-50%)',
    }} />
  </div>
);

/* ═══════════════════════════════════════════════════════════════
   Main component
═══════════════════════════════════════════════════════════════ */
const ArchitectureVisualizer = ({ projectId }) => {
  const { activeTheme } = useTheme();
  const isDark = activeTheme === 'dark';
  const [hoveredId, setHoveredId] = useState(null);

  const arch = architectures[projectId];
  if (!arch) return null;

  /* design tokens */
  const lineColor  = isDark ? '#52525b' : '#c4c4c8';
  const chipBg     = isDark ? '#27272a' : '#e4e4e7';
  const chipText   = isDark ? '#d4d4d8' : '#3f3f46';
  const cardBg     = isDark ? '#1e1e24' : '#ffffff';
  const cardBorder = isDark ? '#3f3f46' : '#e2e2e8';
  const cardText   = isDark ? '#e4e4e7' : '#18181b';
  const dbBorder   = isDark ? '#52525b' : '#a1a1aa';
  const dbText     = isDark ? '#a1a1aa' : '#71717a';
  const panelBg    = isDark ? '#18181b' : '#f4f4f5';
  const mutedText  = isDark ? '#71717a' : '#a1a1aa';
  const headText   = isDark ? '#f4f4f5' : '#18181b';

  const hoveredService =
    hoveredId === 'gateway'
      ? { name: arch.gateway.name, role: arch.gateway.role, color: arch.gateway.color }
      : arch.services.find(s => s.id === hoveredId) ?? null;

  /* fixed column count per service count */
  const count = arch.services.length;
  const cols  = count <= 4 ? count : count <= 6 ? 3 : 4;

  return (
    <div style={{
      marginTop: '2rem',
      padding: '1.75rem 1.5rem',
      borderRadius: '14px',
      background: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
      border: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
    }}>

      {/* Header */}
      <h4 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: '1.15rem',
        marginBottom: '0.3rem',
        color: headText,
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        ⚙️ {arch.title}
      </h4>
      <p style={{ fontSize: '0.85rem', color: mutedText, marginBottom: '1.75rem' }}>
        Hover over any component to see its role.
      </p>

      {/* ── Diagram column ── */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Layer 1: Clients */}
        <div style={{
          display: 'flex',
          gap: '0.75rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}>
          {arch.clients.map(c => (
            <div key={c} style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '8px',
              background: chipBg,
              color: chipText,
              fontSize: '0.88rem',
              fontWeight: 500,
            }}>
              {c}
            </div>
          ))}
        </div>

        {/* stem */}
        <VStem color={lineColor} height={24} />

        {/* Layer 2: Gateway / main backend */}
        <motion.div
          onHoverStart={() => setHoveredId('gateway')}
          onHoverEnd={() => setHoveredId(null)}
          whileHover={{ scale: 1.04 }}
          style={{
            padding: '0.8rem 2.5rem',
            borderRadius: '10px',
            background: arch.gateway.color,
            color: '#fff',
            fontSize: '0.95rem',
            fontWeight: 700,
            cursor: 'pointer',
            userSelect: 'none',
            boxShadow: `0 4px 20px ${arch.gateway.color}55`,
            border: hoveredId === 'gateway'
              ? '2px solid rgba(255,255,255,0.55)'
              : '2px solid transparent',
            transition: 'border 0.2s',
          }}
        >
          {arch.gateway.name}
        </motion.div>

        {/* fork connector (stem → bus bar) */}
        <ForkConnector color={lineColor} />

        {/* gap between bus bar and service boxes */}
        <DropZone color={lineColor} />

        {/* Layer 3: Services grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gap: '0.85rem',
          width: '100%',
        }}>
          {arch.services.map((s, i) => {
            const isHov = hoveredId === s.id;
            return (
              <motion.div
                key={s.id}
                onHoverStart={() => setHoveredId(s.id)}
                onHoverEnd={() => setHoveredId(null)}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ y: -3 }}
                style={{
                  padding: '0.8rem 0.6rem',
                  borderRadius: '10px',
                  background: isHov ? `${s.color}18` : cardBg,
                  border: `1.5px solid ${isHov ? s.color : cardBorder}`,
                  color: isHov ? s.color : cardText,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  textAlign: 'center',
                  lineHeight: 1.45,
                  transition: 'all 0.2s ease',
                  boxShadow: isHov ? `0 4px 14px ${s.color}30` : 'none',
                }}
              >
                {s.name}
              </motion.div>
            );
          })}
        </div>

        {/* stem */}
        <VStem color={lineColor} height={24} />

        {/* Layer 4: Database */}
        <div style={{
          padding: '0.6rem 1.75rem',
          borderRadius: '10px',
          border: `2px dashed ${dbBorder}`,
          color: dbText,
          fontSize: '0.88rem',
          fontWeight: 500,
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}>
          🗄️ {arch.db}
        </div>

      </div>
      {/* ── End diagram ── */}

      {/* Info panel */}
      <div style={{
        minHeight: 54,
        marginTop: '1.5rem',
        padding: '0.85rem 1.1rem',
        borderRadius: '10px',
        background: panelBg,
        borderLeft: `4px solid ${hoveredService ? hoveredService.color : 'transparent'}`,
        display: 'flex',
        alignItems: 'center',
        transition: 'border-color 0.2s ease',
      }}>
        <AnimatePresence mode="wait">
          {hoveredService ? (
            <motion.div
              key={hoveredService.name}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              style={{ fontSize: '0.92rem', color: cardText, lineHeight: 1.6 }}
            >
              <strong style={{ color: hoveredService.color }}>{hoveredService.name}: </strong>
              {hoveredService.role}
            </motion.div>
          ) : (
            <motion.div
              key="placeholder"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ fontSize: '0.88rem', color: mutedText, fontStyle: 'italic' }}
            >
              Hover a component above to see what it does.
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default ArchitectureVisualizer;
