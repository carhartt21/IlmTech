'use client';

import { useState, type ReactNode } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, LightbulbIcon, ThermometerIcon, ShieldIcon, PlugIcon, BoltIcon, WindowIcon } from './Icons';

interface HouseFeature {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  /** Connection target on the house (% coords) */
  cx: number;
  cy: number;
  icon: ReactNode;
}

/* Icon positions spread around the house, each connecting to a logical point */
const features: HouseFeature[] = [
  {
    id: 'security',
    label: 'Sicherheit',
    description: 'Tür-, Fenster- und Bewegungssensoren vernetzen.',
    x: 34, y: 92, cx: 44, cy: 78,
    icon: <ShieldIcon size={16} />,
  },
  {
    id: 'light',
    label: 'Beleuchtung',
    description: 'Intelligente Lichtsteuerung für Komfort und Effizienz.',
    x: 14, y: 50, cx: 30, cy: 54,
    icon: <LightbulbIcon size={16} />,
  },
  {
    id: 'heating',
    label: 'Heizung',
    description: 'Adaptive Wärmesteuerung, abgestimmt auf Ihren Alltag.',
    x: 68, y: 44, cx: 56, cy: 52,
    icon: <ThermometerIcon size={16} />,
  },
  {
    id: 'energy',
    label: 'Energiemanagement',
    description: 'Verbrauch, PV-Ertrag und Speicher optimal balancieren.',
    x: 36, y: 16, cx: 42, cy: 36,
    icon: <BoltIcon size={16} />,
  },
  {
    id: 'appliances',
    label: 'Smart-Geräte',
    description: 'Haushaltsgeräte intelligent vernetzen und steuern.',
    x: 10, y: 76, cx: 28, cy: 74,
    icon: <WindowIcon size={16} />,
  },
  {
    id: 'pv',
    label: 'Photovoltaik',
    description: 'Eigenen Solarstrom erzeugen und intelligent nutzen.',
    x: 58, y: 14, cx: 50, cy: 34,
    icon: <SunIcon size={16} />,
  },
  {
    id: 'wallbox',
    label: 'Wallbox / EV',
    description: 'Elektroauto laden, wenn Solarstrom verfügbar ist.',
    x: 88, y: 74, cx: 74, cy: 78,
    icon: <PlugIcon size={16} />,
  },
];

export default function HeroHouse() {
  const [active, setActive] = useState<string | null>(null);
  const activeFeature = features.find((f) => f.id === active);

  return (
    <div className="relative w-full max-w-xl mx-auto" style={{ aspectRatio: '270 / 200' }}>
      {/* Smart home illustration */}
      <Image
        src="/hero_smart_home.svg"
        alt="Smart Home Illustration"
        fill
        className="object-contain"
        priority
      />

      {/* Animated connecting lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <style>{`
            @keyframes dashFlow {
              to { stroke-dashoffset: -20; }
            }
          `}</style>
        </defs>
        {features.map((f) => (
          <line
            key={f.id}
            x1={`${f.x}%`}
            y1={`${f.y}%`}
            x2={`${f.cx}%`}
            y2={`${f.cy}%`}
            stroke={active === f.id ? 'rgba(0,212,255,0.6)' : 'rgba(0,212,255,0.2)'}
            strokeWidth={active === f.id ? 2 : 1}
            strokeDasharray="6 4"
            style={{ animation: 'dashFlow 1.5s linear infinite', transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
        ))}
        {/* Connection dots on the house */}
        {features.map((f) => (
          <circle
            key={`dot-${f.id}`}
            cx={`${f.cx}%`}
            cy={`${f.cy}%`}
            r="3"
            fill={active === f.id ? 'rgba(0,212,255,0.8)' : 'rgba(0,212,255,0.3)'}
            style={{ transition: 'fill 0.3s' }}
          />
        ))}
      </svg>

      {/* Interactive hotspots — icons always visible */}
      {features.map((f) => (
        <button
          key={f.id}
          className={`absolute w-9 h-9 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
            active === f.id
              ? 'bg-accent-blue/30 border border-accent-blue scale-125 shadow-[0_0_12px_rgba(0,212,255,0.4)]'
              : 'bg-accent-blue/10 border border-accent-blue/50 hover:bg-accent-blue/20 hover:scale-110'
          }`}
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          onMouseEnter={() => setActive(f.id)}
          onMouseLeave={() => setActive(null)}
          onClick={() => setActive(active === f.id ? null : f.id)}
          aria-label={f.label}
        >
          <span className="text-accent-blue">
            {f.icon}
          </span>
        </button>
      ))}

      {/* Tooltip */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute bottom-0 left-1/2 -translate-x-1/2 bg-surface border border-white/10 rounded-lg px-4 py-3 max-w-xs text-center shadow-xl z-10"
          >
            <p className="text-sm font-semibold text-accent-blue">{activeFeature.label}</p>
            <p className="text-xs text-text-muted mt-1">{activeFeature.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
