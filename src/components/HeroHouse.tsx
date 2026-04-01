'use client';

import { useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SunIcon, LightbulbIcon, ThermometerIcon, ShieldIcon, PlugIcon, BoltIcon, WindowIcon, LeafIcon, BrainIcon, WorkflowIcon, CpuIcon, CompassIcon, ServerIcon } from './Icons';
import { useI18n } from './I18nProvider';

interface Feature {
  id: string;
  x: number;
  y: number;
  cx?: number;
  cy?: number;
  icon: ReactNode;
  ai?: boolean;
  color?: string;
  /** For AI nodes: connection point on the building side */
  bx?: number;
  by?: number;
}

/* Smart Home hotspots — x/y relative to the house area (left 62% of container) */
const houseFeatures: Feature[] = [
  { id: 'security', x: 15, y: 102, cx: 20, cy: 88, icon: <ShieldIcon size={16} /> },
  { id: 'light', x: 9, y: 51, cx: 22, cy: 60, icon: <LightbulbIcon size={16} /> },
  { id: 'heating', x: 42, y: 44, cx: 31, cy: 60, icon: <ThermometerIcon size={16} /> },
  { id: 'energy', x: 25, y: 16, cx: 25, cy: 42, icon: <BoltIcon size={16} /> },
  { id: 'appliances', x: 6, y: 76, cx: 31, cy: 83, icon: <WindowIcon size={16} /> },
  { id: 'pv', x: 36, y: 14, cx: 29, cy: 40, icon: <SunIcon size={16} /> },
  { id: 'wallbox', x: 55, y: 74, cx: 41, cy: 85, icon: <PlugIcon size={16} /> },
  { id: 'garden', x: 60, y: 100, cx: 51, cy: 90, icon: <LeafIcon size={16} /> },
];

/* AI nodes — agent connects to both house and building; workflow & llm connect only to building */
const aiFeatures: Feature[] = [
  { id: 'agent', x: 55, y: 42, cx: 40, cy: 60, icon: <BrainIcon size={16} />, ai: true, color: '#a855f7', bx: 65, by: 65 },
  { id: 'llm', x: 85, y: 29, icon: <CpuIcon size={16} />, ai: true, color: '#a855f7', bx: 78, by: 52 },
  { id: 'workflow', x: 62, y: 30, icon: <WorkflowIcon size={16} />, ai: true, color: '#a855f7', bx: 71, by: 52 },
  { id: 'consulting', x: 94, y: 55, icon: <CompassIcon size={16} />, ai: true, color: '#a855f7', bx: 85, by: 65 },
  { id: 'infrastructure', x: 95, y: 80, icon: <ServerIcon size={16} />, ai: true, color: '#a855f7', bx: 85, by: 80 },
];

export default function HeroHouse({ highlightSegment }: { highlightSegment?: 'smart-home' | 'ai' | null }) {
  const [active, setActive] = useState<string | null>(null);
  const { locale, dict } = useI18n();
  const featureTexts = dict.heroHouse.features;
  const aiTexts = dict.heroHouse.aiFeatures;



  const aiTextById = {
    agent: aiTexts[0],
    workflow: aiTexts[1],
    llm: aiTexts[2],
    consulting: aiTexts[3],
    infrastructure: aiTexts[4],
  } as const;

  const features = houseFeatures.map((fp, i) => ({
    ...fp,
    label: featureTexts[i].label,
    description: featureTexts[i].description,
  }));

  const aiNodes = aiFeatures.map((fp) => ({
    ...fp,
    label: aiTextById[fp.id as keyof typeof aiTextById].label,
    description: aiTextById[fp.id as keyof typeof aiTextById].description,
  }));

  const allFeatures = [...features, ...aiNodes];
  const activeFeature = allFeatures.find((f) => f.id === active);

  return (
    <div className="relative w-full max-w-4xl mx-auto overflow-visible" style={{ aspectRatio: '487.5 / 200' }}>
      {/* Combined house + office building illustration */}
      <div className="absolute inset-0" aria-hidden="true">
        <img
          src="/hero_smart_home_ai_v2.svg"
          alt=""
          className="w-full h-full object-contain object-bottom"
          draggable={false}
        />
      </div>

      {/* Connecting lines & ground line — span full container */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
        <defs>
          <style>{`
            @keyframes dashFlow {
              to { stroke-dashoffset: -20; }
            }
            @keyframes dashFlowAI {
              to { stroke-dashoffset: -16; }
            }
          `}</style>
        </defs>
        {/* Smart Home feature lines */}
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
        {/* AI lines — to house side (only for nodes with cx/cy) */}
        {aiNodes.filter((f) => f.cx != null && f.cy != null).map((f) => (
          <line
            key={`ai-h-${f.id}`}
            x1={`${f.x}%`}
            y1={`${f.y}%`}
            x2={`${f.cx}%`}
            y2={`${f.cy}%`}
            stroke={active === f.id ? `${f.color}99` : `${f.color}33`}
            strokeWidth={active === f.id ? 2 : 1.5}
            strokeDasharray="4 4"
            style={{ animation: 'dashFlowAI 1.2s linear infinite', transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
        ))}
        {/* AI lines — to building side */}
        {aiNodes.map((f) => (
          <line
            key={`ai-b-${f.id}`}
            x1={`${f.x}%`}
            y1={`${f.y}%`}
            x2={`${f.bx}%`}
            y2={`${f.by}%`}
            stroke={active === f.id ? `${f.color}99` : `${f.color}33`}
            strokeWidth={active === f.id ? 2 : 1.5}
            strokeDasharray="4 4"
            style={{ animation: 'dashFlowAI 1.2s linear infinite', transition: 'stroke 0.3s, stroke-width 0.3s' }}
          />
        ))}
        {/* Connection dots — house side */}
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
        {/* Connection dots — AI to house (only for nodes with cx/cy) */}
        {aiNodes.filter((f) => f.cx != null && f.cy != null).map((f) => (
          <circle
            key={`dot-ah-${f.id}`}
            cx={`${f.cx}%`}
            cy={`${f.cy}%`}
            r="3"
            fill={active === f.id ? `${f.color}cc` : `${f.color}44`}
            style={{ transition: 'fill 0.3s' }}
          />
        ))}
        {/* Connection dots — AI to building */}
        {aiNodes.map((f) => (
          <circle
            key={`dot-ab-${f.id}`}
            cx={`${f.bx}%`}
            cy={`${f.by}%`}
            r="3"
            fill={active === f.id ? `${f.color}cc` : `${f.color}44`}
            style={{ transition: 'fill 0.3s' }}
          />
        ))}
      </svg>

      {/* Smart Home hotspots */}
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
          onClick={() => setActive((prev) => (prev === f.id ? null : f.id))}
          aria-label={f.label}
        >
          <span className="text-accent-blue">{f.icon}</span>
        </button>
      ))}

      {/* AI hotspots — between the two buildings */}
      {aiNodes.map((f) => (
        <button
          key={f.id}
          className={`absolute w-10 h-10 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full cursor-pointer transition-all duration-300 ${
            active === f.id ? 'scale-125' : 'hover:scale-110'
          }`}
          style={{
            left: `${f.x}%`,
            top: `${f.y}%`,
            backgroundColor: active === f.id ? `${f.color}40` : `${f.color}18`,
            border: `1.5px solid ${active === f.id ? f.color : `${f.color}80`}`,
            boxShadow: active === f.id ? `0 0 14px ${f.color}66` : 'none',
          }}
          onMouseEnter={() => setActive(f.id)}
          onMouseLeave={() => setActive(null)}
          onClick={() => setActive((prev) => (prev === f.id ? null : f.id))}
          aria-label={f.label}
        >
          <span style={{ color: f.color }}>{f.icon}</span>
        </button>
      ))}

      {/* Segment highlight overlays */}
      {highlightSegment && (
        <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
          {highlightSegment === 'smart-home' && (
            <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-accent-blue/15 via-accent-blue/8 to-transparent rounded-l-xl" />
          )}
          {highlightSegment === 'ai' && (
            <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-purple-500/15 via-purple-500/8 to-transparent rounded-r-xl" />
          )}
        </div>
      )}

      {/* Tooltip */}
      <AnimatePresence>
        {activeFeature && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="absolute left-1/2 -translate-x-1/2 bg-surface border border-white/10 rounded-lg px-4 py-3 max-w-xs text-center shadow-xl z-10 pointer-events-none"
            style={{ bottom: '-4rem' }}
          >
            <p className="text-sm font-semibold" style={{ color: activeFeature.ai ? activeFeature.color : '#00d4ff' }}>
              {activeFeature.label}
            </p>
            <p className="text-xs text-text-muted mt-1">{activeFeature.description}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
