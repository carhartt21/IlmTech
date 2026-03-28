'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SunIcon, GridPowerIcon, HouseIcon, BatteryIcon, CarIcon, ThermometerIcon } from './Icons';

/* ── Animated numeric value with subtle random fluctuation ── */
function AnimatedValue({ value, unit }: { value: number; unit: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const interval = setInterval(() => {
      setDisplay((prev) => {
        const diff = (Math.random() - 0.5) * 0.2;
        return Math.max(0, Math.round((prev + diff) * 10) / 10);
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="font-mono font-semibold tabular-nums">
      {unit === '%' ? Math.round(display) : display.toFixed(1)} {unit}
    </span>
  );
}

/* ── Node positions (percentage of container) ── */
const positions = {
  solar:   { x: 50, y: 12 },
  grid:    { x: 15, y: 42 },
  home:    { x: 50, y: 42 },
  battery: { x: 85, y: 42 },
  wallbox: { x: 25, y: 80 },
  heating: { x: 75, y: 80 },
} as const;

/* ── Node configuration ── */
interface NodeSpec {
  id: keyof typeof positions;
  label: string;
  value: number;
  unit: string;
  color: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  size: number;
}

const nodeSpecs: NodeSpec[] = [
  { id: 'solar', label: 'PV-Anlage', value: 10.5, unit: 'kW', color: '#f59e0b', icon: SunIcon, size: 120 },
  { id: 'grid', label: 'Stromnetz', value: 0.3, unit: 'kW', color: '#a78bfa', icon: GridPowerIcon, size: 105 },
  { id: 'home', label: 'Haushalt', value: 4.8, unit: 'kW', color: '#00d4ff', icon: HouseIcon, size: 110 },
  { id: 'battery', label: 'Batterie', value: 72, unit: '%', color: '#22c55e', icon: BatteryIcon, size: 105 },
  { id: 'wallbox', label: 'Wallbox', value: 4.2, unit: 'kW', color: '#8b5cf6', icon: CarIcon, size: 95 },
  { id: 'heating', label: 'Wärmepumpe', value: 1.5, unit: 'kW', color: '#ef4444', icon: ThermometerIcon, size: 95 },
];

/* ── Circular node component (HA-style) ── */
function EnergyCircle({ node, delay = 0 }: { node: NodeSpec; delay?: number }) {
  const Icon = node.icon;
  const { size } = node;
  const r = size / 2;
  const strokeWidth = 5;
  const arcR = r - strokeWidth / 2 - 2;
  const circ = 2 * Math.PI * arcR;
  const pos = positions[node.id];

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: 'translate(-50%, -50%)' }}
      initial={{ opacity: 0, scale: 0.7 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, type: 'spring', stiffness: 200 }}
    >
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background ring */}
        <svg className="absolute inset-0" viewBox={`0 0 ${size} ${size}`}>
          <circle cx={r} cy={r} r={arcR} fill="none" stroke={node.color} strokeWidth={strokeWidth} opacity={0.15} />
        </svg>
        {/* Animated arc ring */}
        <svg className="absolute inset-0 -rotate-90" viewBox={`0 0 ${size} ${size}`}>
          <circle
            cx={r} cy={r} r={arcR}
            fill="none" stroke={node.color} strokeWidth={strokeWidth}
            strokeDasharray={circ} strokeDashoffset={circ * 0.25}
            strokeLinecap="round" className="ha-ring"
            style={{ filter: `drop-shadow(0 0 6px ${node.color}60)` }}
          />
        </svg>
        {/* Inner content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="mb-1" style={{ color: node.color }}><Icon size={22} /></div>
          <span className="text-sm" style={{ color: node.color }}>
            <AnimatedValue value={node.value} unit={node.unit} />
          </span>
        </div>
      </div>
      <span className="text-xs text-text-muted font-medium mt-1">{node.label}</span>
    </motion.div>
  );
}

/* ── Flow line with animated dots ── */
function FlowPath({ pathD, color, id, reverse = false }: { pathD: string; color: string; id: string; reverse?: boolean }) {
  return (
    <g>
      <path d={pathD} fill="none" stroke={color} strokeWidth="3" opacity={0.12} />
      <path
        d={pathD} fill="none" stroke={color} strokeWidth="2.5"
        strokeDasharray="8 10" opacity={0.55}
        className={reverse ? 'ha-flow-reverse' : 'ha-flow'}
      />
      <circle r="5" fill={color} opacity={0.85}>
        <animateMotion dur={reverse ? '3s' : '2.5s'} repeatCount="indefinite" keyPoints={reverse ? '1;0' : '0;1'} keyTimes="0;1">
          <mpath href={`#${id}`} />
        </animateMotion>
      </circle>
      <path id={id} d={pathD} fill="none" stroke="none" />
    </g>
  );
}

/* ── Build bezier curve between two node positions (in 1000x850 space) ─ */
function curvePath(
  fromId: keyof typeof positions,
  toId: keyof typeof positions,
  bendDir: 'auto' | 'above' | 'below' = 'auto',
): string {
  // Scale percentage positions to the 1000x850 SVG viewBox
  const f = { x: positions[fromId].x * 10, y: positions[fromId].y * 8.5 };
  const t = { x: positions[toId].x * 10, y: positions[toId].y * 8.5 };

  const mx = (f.x + t.x) / 2;
  const my = (f.y + t.y) / 2;
  const dx = t.x - f.x;
  const dy = t.y - f.y;
  let cx1: number, cy1: number, cx2: number, cy2: number;

  if (Math.abs(dy) < 30) {
    // Nearly horizontal — bend above or below
    const offset = bendDir === 'above' ? -80 : bendDir === 'below' ? 80 : (dx > 0 ? -50 : 50);
    cx1 = f.x + dx * 0.3;
    cy1 = f.y + offset;
    cx2 = t.x - dx * 0.3;
    cy2 = t.y + offset;
  } else if (Math.abs(dx) < 30) {
    // Nearly vertical — bend left or right
    const offset = bendDir === 'above' ? -60 : bendDir === 'below' ? 60 : 0;
    cx1 = mx + offset;
    cy1 = f.y + dy * 0.4;
    cx2 = mx + offset;
    cy2 = t.y - dy * 0.4;
  } else {
    // Diagonal — smooth S-curve
    cx1 = f.x + dx * 0.1;
    cy1 = f.y + dy * 0.6;
    cx2 = t.x - dx * 0.1;
    cy2 = t.y - dy * 0.6;
  }

  return `M ${f.x} ${f.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${t.x} ${t.y}`;
}

/* ── Main dashboard ── */
export default function EnergyDashboard() {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* Container with fixed aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '85%' }}>
        {/* SVG flow lines layer — same coordinate space as nodes (0-100%) */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 1000 850"
          preserveAspectRatio="xMidYMid meet"
          aria-hidden="true"
        >
          {/* Solar → Home */}
          <FlowPath id="f-solar-home" pathD={curvePath('solar', 'home')} color="#f59e0b" />
          {/* Solar → Grid */}
          <FlowPath id="f-solar-grid" pathD={curvePath('solar', 'grid')} color="#f59e0b" />
          {/* Solar → Battery */}
          <FlowPath id="f-solar-battery" pathD={curvePath('solar', 'battery')} color="#22c55e" />
          {/* Grid → Home */}
          <FlowPath id="f-grid-home" pathD={curvePath('grid', 'home')} color="#a78bfa" />
          {/* Home → Wallbox */}
          <FlowPath id="f-home-wallbox" pathD={curvePath('home', 'wallbox')} color="#00d4ff" />
          {/* Home → Heating */}
          <FlowPath id="f-home-heating" pathD={curvePath('home', 'heating')} color="#ef4444" />
          {/* Battery → Home */}
          <FlowPath id="f-battery-home" pathD={curvePath('battery', 'home', 'below')} color="#22c55e" reverse />
        </svg>

        {/* Absolutely positioned energy nodes */}
        {nodeSpecs.map((node, i) => (
          <EnergyCircle key={node.id} node={node} delay={i * 0.08} />
        ))}
      </div>

      {/* Status bar */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {[
          { label: 'Eigenverbrauch', value: '92%', color: '#22c55e' },
          { label: 'Netzeinspeisung', value: '0.3 kW', color: '#a78bfa' },
          { label: 'CO₂ gespart', value: '4.2 kg', color: '#22c55e' },
        ].map((stat) => (
          <div key={stat.label} className="text-center py-2.5 px-3 rounded-xl bg-surface/50 border border-white/5">
            <p className="text-[11px] text-text-muted">{stat.label}</p>
            <p className="text-sm font-bold mt-0.5" style={{ color: stat.color }}>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
