'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type NodeType = 'trigger' | 'ai' | 'process' | 'document' | 'output' | 'monitor' | 'review' | 'calendar' | 'email';

export interface WorkflowStep {
  label: string;
  detail: string;
  type: string;
}

function isNodeType(value: string): value is NodeType {
  return value === 'trigger'
    || value === 'ai'
    || value === 'process'
    || value === 'document'
    || value === 'output'
    || value === 'monitor'
    || value === 'review'
    || value === 'calendar'
    || value === 'email';
}

const nodeColors: Record<NodeType, { bg: string; border: string; text: string; glow: string }> = {
  trigger:  { bg: 'bg-green-500/15',   border: 'border-green-500/60',  text: 'text-green-400',   glow: '0 0 20px rgba(34,197,94,0.3)' },
  ai:       { bg: 'bg-purple-500/15',  border: 'border-purple-500/60', text: 'text-purple-400',  glow: '0 0 20px rgba(168,85,247,0.3)' },
  process:  { bg: 'bg-blue-500/15',    border: 'border-blue-500/60',   text: 'text-blue-400',    glow: '0 0 20px rgba(59,130,246,0.3)' },
  document: { bg: 'bg-orange-500/15',  border: 'border-orange-500/60', text: 'text-orange-400',  glow: '0 0 20px rgba(249,115,22,0.3)' },
  output:   { bg: 'bg-emerald-500/15', border: 'border-emerald-500/60',text: 'text-emerald-400', glow: '0 0 20px rgba(16,185,129,0.3)' },
  monitor:  { bg: 'bg-yellow-500/15',  border: 'border-yellow-500/60', text: 'text-yellow-400',  glow: '0 0 20px rgba(234,179,8,0.3)' },
  review:   { bg: 'bg-slate-400/15',   border: 'border-slate-400/60',  text: 'text-slate-300',   glow: '0 0 20px rgba(148,163,184,0.3)' },
  calendar: { bg: 'bg-cyan-500/15',    border: 'border-cyan-500/60',   text: 'text-cyan-400',    glow: '0 0 20px rgba(6,182,212,0.3)' },
  email:    { bg: 'bg-pink-500/15',    border: 'border-pink-500/60',   text: 'text-pink-400',    glow: '0 0 20px rgba(236,72,153,0.3)' },
};

function NodeIcon({ type }: { type: NodeType }) {
  const className = 'w-5 h-5';
  switch (type) {
    case 'trigger':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
      );
    case 'ai':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
        </svg>
      );
    case 'process':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12" />
        </svg>
      );
    case 'document':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
        </svg>
      );
    case 'output':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
        </svg>
      );
    case 'monitor':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case 'review':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      );
    case 'calendar':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    case 'email':
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
        </svg>
      );
  }
}

function Connector({ animate, delay }: { animate: boolean; delay: number }) {
  return (
    <motion.div
      className="flex items-center flex-shrink-0 mx-1"
      initial={animate ? { opacity: 0, scaleX: 0 } : false}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay, duration: 0.2 }}
      style={{ originX: 0 }}
    >
      <div className="h-px w-8 sm:w-12 bg-gradient-to-r from-white/30 to-white/10" />
      <svg className="w-2 h-2 text-white/30 -ml-px flex-shrink-0" viewBox="0 0 8 8" fill="currentColor">
        <path d="M0 0L8 4L0 8z" />
      </svg>
    </motion.div>
  );
}

function WorkflowNode({ step, animate, delay }: { step: WorkflowStep; animate: boolean; delay: number }) {
  const nodeType = isNodeType(step.type) ? step.type : 'process';
  const colors = nodeColors[nodeType];
  const [isActive, setIsActive] = useState(false);

  return (
    <motion.div
      className="flex flex-col items-center flex-shrink-0 w-[90px] sm:w-[110px]"
      initial={animate ? { opacity: 0, y: 12 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}
      onFocus={() => setIsActive(true)}
      onBlur={() => setIsActive(false)}
      tabIndex={0}
      aria-label={`${step.label}: ${step.detail}`}
    >
      {/* Icon wrapper */}
      <div className="relative">
        <div
          className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${colors.bg} ${colors.border} border flex items-center justify-center ${colors.text} transition-all duration-200`}
          style={{ boxShadow: isActive ? colors.glow : 'none' }}
        >
          <NodeIcon type={nodeType} />
        </div>

        {/* Detail tooltip above icon */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-10 pointer-events-none hidden sm:block"
            >
              <div className="bg-surface border border-white/15 rounded-lg px-3 py-2 shadow-xl w-[180px] sm:w-[200px]">
                <p className="text-xs text-text-muted whitespace-normal text-center">{step.detail}</p>
              </div>
              <div className="w-2 h-2 bg-surface border-r border-b border-white/15 rotate-45 mx-auto -mt-1" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Label */}
      <span className="text-[11px] sm:text-xs text-white font-medium mt-2 text-center leading-tight">
        {step.label}
      </span>
    </motion.div>
  );
}

export default function WorkflowVisualization({ steps }: { steps: WorkflowStep[] }) {
  return (
    <div className="pt-2">
      {/* Horizontal scrollable node graph */}
      <div className="overflow-x-auto pb-2">
        <div className="flex items-start justify-center min-w-max pt-20 pb-4">
          {steps.map((step, si) => (
            <div key={si} className="flex items-start">
              <WorkflowNode
                step={step}
                animate={true}
                delay={si * 0.1}
              />
              {si < steps.length - 1 && (
                <div className="pt-[18px] sm:pt-[21px]">
                  <Connector animate={true} delay={si * 0.1 + 0.05} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile legend — show details as list below on small screens */}
      <div className="sm:hidden mt-3 space-y-2 border-t border-white/10 pt-3">
        {steps.map((step, si) => {
          const nodeType = isNodeType(step.type) ? step.type : 'process';
          const colors = nodeColors[nodeType];
          return (
            <div key={si} className="flex items-start gap-2">
              <span className={`text-xs font-semibold ${colors.text} min-w-[70px]`}>{step.label}</span>
              <span className="text-xs text-text-muted">{step.detail}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
