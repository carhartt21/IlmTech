'use client';

import { useState, useEffect } from 'react';
import { useI18n } from './I18nProvider';

/* ── SVG viewBox dimensions ── */
const VW = 800;
const VH = 480;

/* ── Node positions (absolute coords in the viewBox) — star layout with Solar at center ── */
const nodes = {
  solar:   { x: 400, y: 210, r: 58, label: 'PV-Anlage',     value: 10.5, unit: 'kW', color: '#f59e0b', icon: 'sun' },
  grid:    { x: 400, y: 50,  r: 46, label: 'Stromnetz',      value: 0.3,  unit: 'kW', color: '#a78bfa', icon: 'grid' },
  battery: { x: 100, y: 210, r: 48, label: 'Batterie',       value: 72,   unit: '%',  color: '#22c55e', icon: 'battery' },
  home:    { x: 700, y: 210, r: 48, label: 'Haushalt',       value: 4.8,  unit: 'kW', color: '#00d4ff', icon: 'home' },
  wallbox: { x: 190, y: 400, r: 44, label: 'Wallbox',        value: 4.2,  unit: 'kW', color: '#8b5cf6', icon: 'car' },
  heating: { x: 610, y: 400, r: 44, label: 'Wärmepumpe',     value: 1.5,  unit: 'kW', color: '#ef4444', icon: 'thermo' },
} as const;

type NodeId = keyof typeof nodes;

/* ── Connection definitions — star radiating from Solar ── */
const connections: { from: NodeId; to: NodeId; color: string; reverse?: boolean; dur: number; begin: number }[] = [
  { from: 'solar', to: 'grid',    color: '#a78bfa', dur: 2.8, begin: 0 },
  { from: 'solar', to: 'battery', color: '#22c55e', dur: 2.2, begin: 0.6 },
  { from: 'solar', to: 'home',    color: '#00d4ff', dur: 1.8, begin: 0.3 },
  { from: 'solar', to: 'wallbox', color: '#8b5cf6', dur: 2.5, begin: 1.1 },
  { from: 'solar', to: 'heating', color: '#ef4444', dur: 3.0, begin: 0.8 },
  { from: 'grid',  to: 'home',    color: '#a78bfa', dur: 2.4, begin: 1.5 },
];

/* ── Compute port on circle circumference toward a target point ── */
function portToward(id: NodeId, tx: number, ty: number) {
  const n = nodes[id];
  const dx = tx - n.x;
  const dy = ty - n.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: n.x + (dx / dist) * n.r, y: n.y + (dy / dist) * n.r };
}

/* ── Smart path routing ── */
function buildPath(from: NodeId, to: NodeId): string {
  const src = nodes[from];
  const dst = nodes[to];
  const p0 = portToward(from, dst.x, dst.y);
  const p1 = portToward(to, src.x, src.y);

  const dx = dst.x - src.x;
  const dy = dst.y - src.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // For Grid → Home (arc around center)
  if ((from === 'grid' && to === 'home') || (from === 'home' && to === 'grid')) {
    const midY = Math.min(src.y, dst.y) - 30;
    const cpx = (p0.x + p1.x) / 2;
    return `M${p0.x},${p0.y} Q${cpx},${midY} ${p1.x},${p1.y}`;
  }

  // Direct connections — simple bezier with slight curve
  const cx = (p0.x + p1.x) / 2;
  const cy = (p0.y + p1.y) / 2;
  // Offset perpendicular to the line for a slight curve
  const perpX = -dy / dist * 20;
  const perpY = dx / dist * 20;
  return `M${p0.x},${p0.y} Q${cx + perpX},${cy + perpY} ${p1.x},${p1.y}`;
}

/* ── Icon SVG paths ── */
function NodeIcon({ type, color }: { type: string; color: string }) {
  const props = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'sun': return <g transform="translate(-12,-12)" {...props}><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" /></g>;
    case 'grid': return <g transform="translate(-12,-12)" {...props}><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></g>;
    case 'home': return <g transform="translate(-12,-12)" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></g>;
    case 'battery': return <g transform="translate(-12,-12)" {...props}><rect x="1" y="6" width="18" height="12" rx="2" /><path d="M23 13v-2" /><path d="M7 10v4M11 10v4" /></g>;
    case 'car': return <g transform="translate(-12,-12)" {...props}><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9L18 10l-4-5H7L3 10l-2.5 1.1C-.2 11.3-1 12.1-1 13v3c0 .6.4 1 1 1h2" transform="translate(1.5,0)"/><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></g>;
    case 'thermo': return <g transform="translate(-12,-12)" {...props}><path d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z" /></g>;
    default: return null;
  }
}

/* ── Animated value with fluctuation ── */
function useAnimatedValue(initial: number) {
  const [val, setVal] = useState(initial);
  useEffect(() => {
    const iv = setInterval(() => {
      setVal((v) => Math.max(0, Math.round((v + (Math.random() - 0.5) * 0.2) * 10) / 10));
    }, 2000);
    return () => clearInterval(iv);
  }, []);
  return val;
}

function EnergyNode({ id, label }: { id: NodeId; label: string }) {
  const n = nodes[id];
  const val = useAnimatedValue(n.value);
  const strokeW = 4;
  const arcR = n.r - strokeW / 2 - 2;
  const circ = 2 * Math.PI * arcR;
  const display = n.unit === '%' ? `${Math.round(val)} %` : `${val.toFixed(1)} kW`;

  return (
    <g>
      {/* Background ring */}
      <circle cx={n.x} cy={n.y} r={arcR} fill="none" stroke={n.color} strokeWidth={strokeW} opacity={0.15} />
      {/* Animated arc ring */}
      <circle
        cx={n.x} cy={n.y} r={arcR}
        fill="none" stroke={n.color} strokeWidth={strokeW}
        strokeDasharray={circ} strokeDashoffset={circ * 0.25}
        strokeLinecap="round" className="ha-ring"
        transform={`rotate(-90 ${n.x} ${n.y})`}
        style={{ filter: `drop-shadow(0 0 6px ${n.color}60)` }}
      />
      {/* Dark fill to hide edges underneath */}
      <circle cx={n.x} cy={n.y} r={arcR - strokeW} fill="#0f172a" />
      {/* Icon */}
      <g transform={`translate(${n.x}, ${n.y - 8})`}>
        <NodeIcon type={n.icon} color={n.color} />
      </g>
      {/* Value */}
      <text x={n.x} y={n.y + 16} textAnchor="middle" fill={n.color} fontSize="13" fontFamily="monospace" fontWeight="600">
        {display}
      </text>
      {/* Label below circle */}
      <text x={n.x} y={n.y + n.r + 18} textAnchor="middle" fill="#94a3b8" fontSize="12" fontWeight="500">
        {label}
      </text>
    </g>
  );
}

/* ── Flow line with animated dot ── */
function FlowEdge({ from, to, color, reverse = false, idx, dur, begin }: { from: NodeId; to: NodeId; color: string; reverse?: boolean; idx: number; dur: number; begin: number }) {
  const d = buildPath(from, to);
  const pathId = `flow-${idx}`;
  // Vary dash animation speed per edge
  const dashDur = `${(dur * 0.5).toFixed(1)}s`;
  return (
    <g>
      <path d={d} fill="none" stroke={color} strokeWidth="3" opacity={0.12} />
      <path d={d} fill="none" stroke={color} strokeWidth="2" strokeDasharray="8 10" opacity={0.5}
        style={{ animation: `${reverse ? 'ha-dash-reverse' : 'ha-dash'} ${dashDur} linear infinite` }} />
      <circle r="5" fill={color} opacity={0.85}>
        <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" keyPoints={reverse ? '1;0' : '0;1'} keyTimes="0;1">
          <mpath href={`#${pathId}`} />
        </animateMotion>
      </circle>
      <path id={pathId} d={d} fill="none" stroke="none" />
    </g>
  );
}

/* ── Arrow markers ── */
function ArrowDefs() {
  const colors = [...new Set(connections.map((c) => c.color))];
  return (
    <defs>
      {colors.map((col) => (
        <marker key={col} id={`arrow-${col.replace('#', '')}`} viewBox="0 0 10 7" refX="9" refY="3.5" markerWidth="8" markerHeight="6" orient="auto-start-reverse" markerUnits="userSpaceOnUse">
          <path d="M0,0 L10,3.5 L0,7 Z" fill={col} opacity="0.7" />
        </marker>
      ))}
    </defs>
  );
}

/* ── Main dashboard ── */
export default function EnergyDashboard() {
  const { dict } = useI18n();
  const nodeLabels = dict.energyDashboard.nodes;
  const stats = dict.energyDashboard.stats;
  const statColors = ['#22c55e', '#a78bfa', '#22c55e'];

  return (
    <div className="relative w-full max-w-3xl mx-auto">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
        <ArrowDefs />

        {/* Flow edges (behind nodes) */}
        {connections.map((c, i) => (
          <FlowEdge key={i} from={c.from} to={c.to} color={c.color} reverse={c.reverse} idx={i} dur={c.dur} begin={c.begin} />
        ))}

        {/* Nodes */}
        {(Object.keys(nodes) as NodeId[]).map((id) => (
          <EnergyNode key={id} id={id} label={nodeLabels[id]} />
        ))}
      </svg>

      {/* Status bar */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="text-center py-2.5 px-3 rounded-xl bg-surface/50 border border-white/5">
            <p className="text-[11px] text-text-muted">{stat.label}</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: statColors[i] }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
