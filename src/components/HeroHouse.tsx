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
  icon: ReactNode;
}

/* Positions mapped to plausible house locations (% of image dimensions) */
const features: HouseFeature[] = [
  {
    id: 'security',
    label: 'Sicherheit',
    description: 'Tür-, Fenster- und Bewegungssensoren vernetzen.',
    x: 44,
    y: 78,
    icon: <ShieldIcon size={16} />,
  },
  {
    id: 'light',
    label: 'Beleuchtung',
    description: 'Intelligente Lichtsteuerung für Komfort und Effizienz.',
    x: 36,
    y: 56,
    icon: <LightbulbIcon size={16} />,
  },
  {
    id: 'heating',
    label: 'Heizung',
    description: 'Adaptive Wärmesteuerung, abgestimmt auf Ihren Alltag.',
    x: 53,
    y: 56,
    icon: <ThermometerIcon size={16} />,
  },
  {
    id: 'energy',
    label: 'Energiemanagement',
    description: 'Verbrauch, PV-Ertrag und Speicher optimal balancieren.',
    x: 44,
    y: 42,
    icon: <BoltIcon size={16} />,
  },
  {
    id: 'appliances',
    label: 'Smart-Geräte',
    description: 'Haushaltsgeräte intelligent vernetzen und steuern.',
    x: 36,
    y: 74,
    icon: <WindowIcon size={16} />,
  },
  {
    id: 'pv',
    label: 'Photovoltaik',
    description: 'Eigenen Solarstrom erzeugen und intelligent nutzen.',
    x: 50,
    y: 38,
    icon: <SunIcon size={16} />,
  },
  {
    id: 'wallbox',
    label: 'Wallbox / EV',
    description: 'Elektroauto laden, wenn Solarstrom verfügbar ist.',
    x: 72,
    y: 80,
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
