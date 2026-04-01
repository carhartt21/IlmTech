'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainIcon, WorkflowIcon, ServerIcon, CompassIcon, HouseIcon } from './Icons';
import { useI18n } from './I18nProvider';

interface PillarNode {
  id: string;
  angle: number; // degrees around the center
  icon: React.ReactNode;
  color: string;
}

const pillars: PillarNode[] = [
  { id: 'agent',         angle: 225, icon: <BrainIcon size={22} />,    color: '#a855f7' },
  { id: 'workflow',      angle: 315, icon: <WorkflowIcon size={22} />, color: '#3b82f6' },
  { id: 'infrastructure',angle: 45,  icon: <ServerIcon size={22} />,   color: '#10b981' },
  { id: 'consulting',    angle: 135, icon: <CompassIcon size={22} />,  color: '#f59e0b' },
];

export default function AIPillarsHub() {
  const [active, setActive] = useState<string | null>(null);
  const { dict } = useI18n();
  const t = dict.aiPillarsHub;

  const radius = 38; // % from center
  const cx = 50;
  const cy = 50;

  return (
    <div className="relative w-full max-w-md mx-auto" style={{ aspectRatio: '1' }}>
      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <style>{`
            @keyframes pulseFlow {
              0% { stroke-dashoffset: 24; }
              100% { stroke-dashoffset: 0; }
            }
          `}</style>
        </defs>
        {pillars.map((p) => {
          const rad = (p.angle * Math.PI) / 180;
          const px = cx + radius * Math.cos(rad);
          const py = cy + radius * Math.sin(rad);
          const isActive = active === p.id;
          return (
            <line
              key={p.id}
              x1={cx}
              y1={cy}
              x2={px}
              y2={py}
              stroke={isActive ? p.color : `${p.color}40`}
              strokeWidth={isActive ? 1.5 : 0.8}
              strokeDasharray="4 4"
              style={{
                animation: 'pulseFlow 1.5s linear infinite',
                transition: 'stroke 0.3s, stroke-width 0.3s',
              }}
            />
          );
        })}
        {/* Cross-connections between adjacent pillars */}
        {pillars.map((p, i) => {
          const next = pillars[(i + 1) % pillars.length];
          const rad1 = (p.angle * Math.PI) / 180;
          const rad2 = (next.angle * Math.PI) / 180;
          const x1 = cx + radius * Math.cos(rad1);
          const y1 = cy + radius * Math.sin(rad1);
          const x2 = cx + radius * Math.cos(rad2);
          const y2 = cy + radius * Math.sin(rad2);
          const isActive = active === p.id || active === next.id;
          return (
            <line
              key={`cross-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={isActive ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.06)'}
              strokeWidth={0.5}
              strokeDasharray="2 3"
              style={{ transition: 'stroke 0.3s' }}
            />
          );
        })}
      </svg>

      {/* Center node */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-accent-blue/15 border border-accent-blue/40 flex items-center justify-center shadow-[0_0_24px_rgba(0,212,255,0.2)] z-10"
      >
        <span className="text-accent-blue"><HouseIcon size={24} /></span>
      </div>

      {/* Pillar nodes */}
      {pillars.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const left = cx + radius * Math.cos(rad);
        const top = cy + radius * Math.sin(rad);
        const isActive = active === p.id;
        const nodeT = t.nodes[p.id as keyof typeof t.nodes];
        return (
          <div key={p.id}>
            <button
              className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-10"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                backgroundColor: isActive ? `${p.color}30` : `${p.color}15`,
                border: `1.5px solid ${isActive ? p.color : `${p.color}60`}`,
                boxShadow: isActive ? `0 0 20px ${p.color}40` : 'none',
                transform: `translate(-50%, -50%) scale(${isActive ? 1.15 : 1})`,
              }}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive((prev) => (prev === p.id ? null : p.id))}
              aria-label={nodeT?.label}
            >
              <span style={{ color: p.color }}>{p.icon}</span>
            </button>

            {/* Label below node */}
            <div
              className="absolute -translate-x-1/2 text-center pointer-events-none z-10"
              style={{
                left: `${left}%`,
                top: `${top + 8}%`,
              }}
            >
              <span className="text-xs font-medium" style={{ color: isActive ? p.color : `${p.color}99` }}>
                {nodeT?.label}
              </span>
            </div>
          </div>
        );
      })}

      {/* Tooltip */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            className="absolute left-1/2 -translate-x-1/2 bg-surface border border-white/10 rounded-lg px-4 py-3 max-w-[220px] text-center shadow-xl z-20 pointer-events-none"
            style={{ bottom: '-2rem' }}
          >
            <p className="text-xs text-text-muted">
              {t.nodes[active as keyof typeof t.nodes]?.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
