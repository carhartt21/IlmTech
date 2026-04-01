'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WorkflowVisualization, { type WorkflowStep } from './WorkflowVisualization';

export interface SegmentCardItem {
  segment: string;
  pain: string;
  solution: string;
  workflow?: {
    title: string;
    steps: WorkflowStep[];
  };
}

export interface SegmentCardLabels {
  problem: string;
  solution: string;
  showWorkflow: string;
  hideWorkflow: string;
}

interface Props {
  items: SegmentCardItem[];
  labels: SegmentCardLabels;
}

export default function SegmentCards({ items, labels }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {items.map((item, i) => {
        const hasWorkflow = !!item.workflow;
        const isOpen = openIndex === i;
        const isAnimating = animatingIndex === i;

        return (
          <div
            key={i}
            className="rounded-xl bg-surface/20 border border-white/5 overflow-visible transition-colors"
          >
            {/* Segment info row */}
            <div className="grid md:grid-cols-3 gap-4 p-6">
              <div>
                <h3 className="text-base font-semibold text-white">{item.segment}</h3>
              </div>
              <div>
                <p className="text-xs text-text-muted/60 uppercase tracking-wider mb-1">{labels.problem}</p>
                <p className="text-sm text-text-muted">{item.pain}</p>
              </div>
              <div>
                <p className="text-xs text-accent-blue/60 uppercase tracking-wider mb-1">{labels.solution}</p>
                <p className="text-sm text-text-muted">{item.solution}</p>
              </div>
            </div>

            {/* Expandable workflow */}
            {hasWorkflow && (
              <>
                <button
                  onClick={() => {
                    if (isOpen) {
                      setAnimatingIndex(i);
                      setOpenIndex(null);
                    } else {
                      setAnimatingIndex(i);
                      setOpenIndex(i);
                    }
                  }}
                  className="w-full flex items-center gap-2 px-6 pb-4 pt-0 text-left hover:opacity-80 transition-opacity"
                  aria-expanded={isOpen}
                >
                  <svg
                    className={`w-4 h-4 text-accent-blue transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                  <span className="text-xs text-accent-blue/70">
                    {isOpen ? labels.hideWorkflow : labels.showWorkflow}
                    {!isOpen && item.workflow && (
                      <span className="text-text-muted/50"> — {item.workflow.title}</span>
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && item.workflow && (
                    <motion.div
                      key="workflow"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      style={{ overflow: isAnimating ? 'hidden' : 'visible' }}
                      onAnimationComplete={() => setAnimatingIndex(null)}
                    >
                      <div className="px-6 pb-6 border-t border-white/5">
                        <p className="text-xs text-text-muted/50 uppercase tracking-wider mt-4 mb-1">{item.workflow.title}</p>
                        <WorkflowVisualization steps={item.workflow.steps} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
