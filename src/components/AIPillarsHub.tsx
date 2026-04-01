'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BrainIcon, WorkflowIcon, ServerIcon, CompassIcon } from './Icons';
import { useI18n } from './I18nProvider';

interface PillarNode {
  id: string;
  angle: number;
  icon: React.ReactNode;
  color: string;
  glow: string;
}

const pillars: PillarNode[] = [
  { id: 'agent',          angle: 240, icon: <BrainIcon size={24} />,    color: '#a855f7', glow: 'rgba(168,85,247,0.35)' },
  { id: 'workflow',        angle: 330, icon: <WorkflowIcon size={24} />, color: '#3b82f6', glow: 'rgba(59,130,246,0.35)' },
  { id: 'infrastructure',  angle: 60,  icon: <ServerIcon size={24} />,   color: '#10b981', glow: 'rgba(16,185,129,0.35)' },
  { id: 'consulting',      angle: 150, icon: <CompassIcon size={24} />,  color: '#f59e0b', glow: 'rgba(245,158,11,0.35)' },
];

function polarToXY(angle: number, r: number, cx: number, cy: number) {
  const rad = ((angle - 90) * Math.PI) / 180; // -90 so 0° = top
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function AIPillarsHub() {
  const [active, setActive] = useState<string | null>(null);
  const { dict } = useI18n();
  const t = dict.aiPillarsHub;

  const cx = 200;
  const cy = 200;
  const radius = 140;

  const positions = pillars.map((p) => polarToXY(p.angle, radius, cx, cy));

  return (
    <div className="relative w-full max-w-[440px] mx-auto select-none" style={{ aspectRatio: '1' }}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
        <defs>
          {/* Gradient for each pillar connection */}
          {pillars.map((p, i) => (
            <linearGradient key={`grad-${p.id}`} id={`grad-${p.id}`} x1={cx} y1={cy} x2={positions[i].x} y2={positions[i].y} gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="rgba(0,212,255,0.6)" />
              <stop offset="100%" stopColor={p.color} stopOpacity="0.7" />
            </linearGradient>
          ))}

          {/* Flowing dot animation */}
          {pillars.map((p, i) => {
            const pos = positions[i];
            return (
              <motion.circle
                key={`dot-${p.id}`}
                r="3"
                fill={p.color}
                filter="url(#dotGlow)"
                initial={{ cx, cy, opacity: 0 }}
                animate={{
                  cx: [cx, (cx + pos.x) / 2, pos.x],
                  cy: [cy, (cy + pos.y) / 2, pos.y],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: 'easeInOut',
                }}
              />
            );
          })}

          <filter id="dotGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id="centerGlow">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Orbital rings */}
        <circle cx={cx} cy={cy} r={radius} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r={radius * 0.55} fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.75" strokeDasharray="4 6" />

        {/* Connection paths (curved) from center to each node */}
        {pillars.map((p, i) => {
          const pos = positions[i];
          const isActive = active === p.id;
          // Bezier control point offset perpendicular to the line
          const mx = (cx + pos.x) / 2;
          const my = (cy + pos.y) / 2;
          const dx = pos.x - cx;
          const dy = pos.y - cy;
          const len = Math.sqrt(dx * dx + dy * dy);
          const perpX = (-dy / len) * 20;
          const perpY = (dx / len) * 20;
          const ctrl = { x: mx + perpX, y: my + perpY };

          return (
            <path
              key={`conn-${p.id}`}
              d={`M${cx},${cy} Q${ctrl.x},${ctrl.y} ${pos.x},${pos.y}`}
              fill="none"
              stroke={isActive ? `url(#grad-${p.id})` : 'rgba(255,255,255,0.08)'}
              strokeWidth={isActive ? 2 : 1}
              style={{ transition: 'stroke 0.4s, stroke-width 0.4s' }}
            />
          );
        })}

        {/* Cross arcs between adjacent nodes */}
        {pillars.map((p, i) => {
          const nextIdx = (i + 1) % pillars.length;
          const a = positions[i];
          const b = positions[nextIdx];
          const isActive = active === p.id || active === pillars[nextIdx].id;
          return (
            <line
              key={`arc-${i}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke={isActive ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.03)'}
              strokeWidth="0.75"
              strokeDasharray="3 5"
              style={{ transition: 'stroke 0.4s' }}
            />
          );
        })}

        {/* Center glow ring */}
        <circle cx={cx} cy={cy} r="36" fill="rgba(0,212,255,0.06)" filter="url(#centerGlow)" />
      </svg>

      {/* Center hub */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center z-10"
        style={{
          background: 'radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,212,255,0.04) 70%, transparent 100%)',
          border: '1.5px solid rgba(0,212,255,0.35)',
          boxShadow: '0 0 30px rgba(0,212,255,0.15), inset 0 0 20px rgba(0,212,255,0.05)',
        }}
        animate={{ boxShadow: ['0 0 30px rgba(0,212,255,0.15)', '0 0 40px rgba(0,212,255,0.25)', '0 0 30px rgba(0,212,255,0.15)'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg
          width="34"
          height="34"
          viewBox="0 0 160 160"
          xmlns="http://www.w3.org/2000/svg"
          className="text-accent-blue drop-shadow-[0_0_6px_rgba(0,212,255,0.5)]"
        >
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="5" d="M -0.0002375 -0.0011625 L -0.0002375 -34.915225 C -0.0002375 -37.704288 2.284919 -39.954288 5.073981 -39.915225 L 42.234138 -39.356631 C 44.964606 -39.317569 47.159919 -37.091006 47.159919 -34.360538 L 47.159919 3.932431" transform="matrix(1, 0, 0, -1, 30.7268, 92.7254)"/>
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="5" d="M 0.000525 0.00184375 L -9.741662 0.0135625 C -11.948694 0.0174688 -13.737756 1.806531 -13.737756 4.013563 L -13.737756 31.341688 C -13.737756 34.06825 -15.917444 36.290906 -18.6401 36.341688 L -33.089319 36.619031 C -37.694787 36.704969 -39.741662 42.44325 -36.23385 45.423719 L 16.887244 90.626844 C 18.723181 92.189344 21.414588 92.220594 23.285681 90.69325 L 42.32865 75.181531 C 43.39115 74.314344 44.988806 75.072156 44.988806 76.447156 L 44.988806 84.482313 C 44.988806 85.560438 45.844275 86.447156 46.9224 86.482313 L 58.496619 86.861219 C 59.625525 86.896375 60.563025 85.990125 60.563025 84.861219 L 60.563025 64.345594 C 60.563025 63.771375 60.809119 63.220594 61.242713 62.841688 L 80.742713 45.740125 C 84.191931 42.712781 82.090369 37.029188 77.504431 36.978406 L 71.875525 36.915906 C 69.652869 36.892469 67.875525 35.056531 67.9224 32.833875 L 68.742713 -6.392687 C 68.801306 -9.201281 66.559119 -11.517687 63.750525 -11.545031 L 30.051306 -11.908312" transform="matrix(1, 0, 0, -1, 57.8276, 120.037)"/>
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="5" d="M -0.00118125 0.0001875 L 33.616006 28.230656 C 35.436319 29.761906 38.084756 29.793156 39.944131 28.312687 L 68.217569 5.808781 C 69.408975 4.859562 70.104287 3.418156 70.104287 1.894719 L 70.104287 -41.027156 C 70.104287 -43.238094 68.311319 -45.027156 66.104287 -45.027156 L 55.420694 -45.027156" transform="matrix(1, 0, 0, -1, 41.1379, 75.008)"/>
          <path fill="none" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="10" d="M 0.00149375 0.00184375 C 0.00149375 -1.380969 -1.1196 -2.498156 -2.498506 -2.498156 C -3.881319 -2.498156 -4.998506 -1.380969 -4.998506 0.00184375 C -4.998506 1.38075 -3.881319 2.501844 -2.498506 2.501844 C -1.1196 2.501844 0.00149375 1.38075 0.00149375 0.00184375 Z" transform="matrix(1, 0, 0, -1, 64.1821, 120.037)"/>
          <path fill="none" strokeWidth="3" strokeLinecap="butt" strokeLinejoin="miter" stroke="currentColor" strokeMiterlimit="10" d="M 0.00011875 0.00184375 C 0.00011875 -1.380969 -1.117069 -2.498156 -2.499881 -2.498156 C -3.882694 -2.498156 -4.999881 -1.380969 -4.999881 0.00184375 C -4.999881 1.38075 -3.882694 2.501844 -2.499881 2.501844 C -1.117069 2.501844 0.00011875 1.38075 0.00011875 0.00184375 Z" transform="matrix(1, 0, 0, -1, 95.5116, 120.037)"/>
          <path fillRule="nonzero" fill="currentColor" d="M 81.886719 84.371094 C 81.886719 86.582031 80.09375 88.371094 77.886719 88.371094 C 75.675781 88.371094 73.886719 86.582031 73.886719 84.371094 C 73.886719 82.164062 75.675781 80.371094 77.886719 80.371094 C 80.09375 80.371094 81.886719 82.164062 81.886719 84.371094"/>
          <path fill="none" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" stroke="currentColor" strokeMiterlimit="10" d="M 0.00111875 0.00100625 C 0.00111875 -2.209931 -1.79185 -3.998994 -3.998881 -3.998994 C -6.209819 -3.998994 -7.998881 -2.209931 -7.998881 0.00100625 C -7.998881 2.208038 -6.209819 4.001006 -3.998881 4.001006 C -1.79185 4.001006 0.00111875 2.208038 0.00111875 0.00100625 Z" transform="matrix(1, 0, 0, -1, 81.8856, 84.3721)"/>
        </svg>
      </motion.div>

      {/* Pillar nodes */}
      {pillars.map((p, i) => {
        const pos = positions[i];
        const isActive = active === p.id;
        const nodeT = t.nodes[p.id as keyof typeof t.nodes];
        // Convert SVG coords to percentages (viewBox 0 0 400 400)
        const leftPct = (pos.x / 400) * 100;
        const topPct = (pos.y / 400) * 100;

        // Label offset based on position
        const labelBelow = pos.y >= cy;
        const labelRight = pos.x >= cx;

        return (
          <div key={p.id}>
            <motion.button
              className="absolute -translate-x-1/2 -translate-y-1/2 w-14 h-14 rounded-full flex items-center justify-center cursor-pointer z-10 backdrop-blur-sm"
              style={{
                left: `${leftPct}%`,
                top: `${topPct}%`,
                backgroundColor: isActive ? `${p.color}25` : `${p.color}10`,
                border: `1.5px solid ${isActive ? p.color : `${p.color}50`}`,
                boxShadow: isActive ? `0 0 28px ${p.glow}` : `0 0 0px transparent`,
              }}
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setActive(p.id)}
              onMouseLeave={() => setActive(null)}
              onClick={() => setActive((prev) => (prev === p.id ? null : p.id))}
              aria-label={nodeT?.label}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.1, duration: 0.5, ease: 'easeOut' }}
            >
              <span style={{ color: p.color }}>{p.icon}</span>
            </motion.button>

            {/* Label */}
            <div
              className="absolute pointer-events-none z-10 whitespace-nowrap"
              style={{
                left: `${leftPct}%`,
                top: labelBelow ? `calc(${topPct}% + 34px)` : `calc(${topPct}% - 34px)`,
                transform: `translateX(${labelRight ? '-30%' : '-70%'})`,
              }}
            >
              <span
                className="text-[11px] font-semibold tracking-wide uppercase"
                style={{ color: isActive ? p.color : `${p.color}80`, transition: 'color 0.3s' }}
              >
                {nodeT?.label}
              </span>
            </div>

            {/* Tooltip on hover */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, y: labelBelow ? 8 : -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: labelBelow ? 8 : -8 }}
                  className="absolute z-20 pointer-events-none"
                  style={{
                    left: `${leftPct}%`,
                    top: labelBelow ? `calc(${topPct}% + 52px)` : `calc(${topPct}% - 52px)`,
                    transform: `translateX(${labelRight ? '-30%' : '-70%'})`,
                  }}
                >
                  <div
                    className="bg-surface/95 backdrop-blur-md border rounded-lg px-3 py-2 max-w-[200px] shadow-xl"
                    style={{ borderColor: `${p.color}30` }}
                  >
                    <p className="text-[11px] leading-relaxed text-text-muted">{nodeT?.description}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
