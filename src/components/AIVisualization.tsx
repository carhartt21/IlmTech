'use client';

import { useState, useSyncExternalStore } from 'react';
import { useI18n } from './I18nProvider';

const emptySubscribe = () => () => {};
function useHydrated() {
  return useSyncExternalStore(emptySubscribe, () => true, () => false);
}

const VW = 800;
const VH = 520;

const nodes = {
  agent:    { x: 400, y: 240, r: 62, color: '#00d4ff', icon: 'brain' },
  ha:       { x: 130, y: 160, r: 46, color: '#22c55e', icon: 'home' },
  llm:      { x: 670, y: 160, r: 46, color: '#f59e0b', icon: 'cpu' },
  workflow: { x: 130, y: 380, r: 46, color: '#8b5cf6', icon: 'workflow' },
  chat:     { x: 670, y: 380, r: 46, color: '#ef4444', icon: 'chat' },
  knowledge:{ x: 400, y: 460, r: 42, color: '#06b6d4', icon: 'db' },
} as const;

type NodeId = keyof typeof nodes;

interface NodeInfo {
  label: string;
  description: string;
  details: string[];
}

const connections: { from: NodeId; to: NodeId; color: string; dur: number; begin: number }[] = [
  { from: 'agent', to: 'ha',        color: '#22c55e', dur: 2.2, begin: 0 },
  { from: 'agent', to: 'llm',       color: '#f59e0b', dur: 2.0, begin: 0.4 },
  { from: 'agent', to: 'workflow',   color: '#8b5cf6', dur: 2.5, begin: 0.8 },
  { from: 'agent', to: 'chat',      color: '#ef4444', dur: 2.3, begin: 1.2 },
  { from: 'agent', to: 'knowledge', color: '#06b6d4', dur: 2.8, begin: 0.6 },
  { from: 'llm',   to: 'knowledge', color: '#06b6d4', dur: 3.0, begin: 1.6 },
];

function portToward(id: NodeId, tx: number, ty: number) {
  const n = nodes[id];
  const dx = tx - n.x;
  const dy = ty - n.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  return { x: n.x + (dx / dist) * n.r, y: n.y + (dy / dist) * n.r };
}

function buildPath(from: NodeId, to: NodeId): string {
  const src = nodes[from];
  const dst = nodes[to];
  const p0 = portToward(from, dst.x, dst.y);
  const p1 = portToward(to, src.x, src.y);
  const dx = dst.x - src.x;
  const dy = dst.y - src.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const perpX = -dy / dist * 25;
  const perpY = dx / dist * 25;
  const cx = (p0.x + p1.x) / 2;
  const cy = (p0.y + p1.y) / 2;
  return `M${p0.x},${p0.y} Q${cx + perpX},${cy + perpY} ${p1.x},${p1.y}`;
}

function NodeIcon({ type, color }: { type: string; color: string }) {
  const props = { fill: 'none', stroke: color, strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
  switch (type) {
    case 'brain': return <g transform="translate(-14,-14)" {...props}><path d="M12 2a6 6 0 0 0-6 6c0 1.7.7 3.2 1.8 4.2L12 16l4.2-3.8A6 6 0 0 0 12 2z" /><path d="M12 16v6" /><path d="M9 8h.01M15 8h.01M10 11h4" /></g>;
    case 'home': return <g transform="translate(-12,-12)" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></g>;
    case 'cpu': return <g transform="translate(-12,-12)" {...props}><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" /></g>;
    case 'workflow': return <g transform="translate(-12,-12)" {...props}><rect x="3" y="6" width="6" height="4" rx="1" /><rect x="15" y="6" width="6" height="4" rx="1" /><rect x="9" y="14" width="6" height="4" rx="1" /><path d="M6 10v2a2 2 0 0 0 2 2h1M18 10v2a2 2 0 0 1-2 2h-1" /></g>;
    case 'chat': return <g transform="translate(-12,-12)" {...props}><path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5z" /></g>;
    case 'db': return <g transform="translate(-12,-12)" {...props}><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" /></g>;
    default: return null;
  }
}

export default function AIVisualization() {
  const mounted = useHydrated();
  const [activeNode, setActiveNode] = useState<NodeId | null>(null);
  const { dict } = useI18n();

  const nodeInfo: Record<NodeId, NodeInfo> = {
    agent: {
      label: dict.aiVisualization.agent.label,
      description: dict.aiVisualization.agent.description,
      details: ['Orchestrator', 'Skill Loader', 'Policy Engine', 'Context Graph'],
    },
    ha: {
      label: dict.aiVisualization.ha.label,
      description: dict.aiVisualization.ha.description,
      details: ['Zigbee', 'Z-Wave', 'Matter', 'WiFi'],
    },
    llm: {
      label: dict.aiVisualization.llm.label,
      description: dict.aiVisualization.llm.description,
      details: ['Llama 4', 'Qwen3', 'DeepSeek-R1', 'Mistral'],
    },
    workflow: {
      label: dict.aiVisualization.workflow.label,
      description: dict.aiVisualization.workflow.description,
      details: ['400+ Integrationen', 'Visual Builder', 'Self-hosted'],
    },
    chat: {
      label: dict.aiVisualization.chat.label,
      description: dict.aiVisualization.chat.description,
      details: ['Telegram', 'WhatsApp', 'Signal', 'E-Mail'],
    },
    knowledge: {
      label: dict.aiVisualization.knowledge.label,
      description: dict.aiVisualization.knowledge.description,
      details: ['Qdrant', 'ChromaDB', 'RAG', 'Dokumente'],
    },
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <svg
        viewBox={`0 0 ${VW} ${VH}`}
        className="w-full h-auto"
        aria-label="AI Architecture Visualization"
      >
        <defs>
          {connections.map((c, i) => (
            <linearGradient key={`grad-${i}`} id={`ai-grad-${i}`} gradientUnits="userSpaceOnUse"
              x1={nodes[c.from].x} y1={nodes[c.from].y}
              x2={nodes[c.to].x} y2={nodes[c.to].y}
            >
              <stop offset="0%" stopColor={nodes[c.from].color} stopOpacity="0.6" />
              <stop offset="100%" stopColor={nodes[c.to].color} stopOpacity="0.6" />
            </linearGradient>
          ))}
          {/* Glow filter */}
          <filter id="ai-glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* Connections */}
        {connections.map((c, i) => {
          const path = buildPath(c.from, c.to);
          const pathId = `ai-path-${i}`;
          return (
            <g key={i}>
              <path id={pathId} d={path} fill="none" stroke={`url(#ai-grad-${i})`} strokeWidth="2" opacity="0.3" />
              {mounted && (
                <>
                  <circle r="4" fill={c.color} opacity="0.8" filter="url(#ai-glow)">
                    <animateMotion dur={`${c.dur}s`} repeatCount="indefinite" begin={`${c.begin}s`}>
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                  <circle r="2" fill="white" opacity="0.6">
                    <animateMotion dur={`${c.dur}s`} repeatCount="indefinite" begin={`${c.begin + c.dur * 0.5}s`}>
                      <mpath href={`#${pathId}`} />
                    </animateMotion>
                  </circle>
                </>
              )}
            </g>
          );
        })}

        {/* Nodes */}
        {(Object.entries(nodes) as [NodeId, typeof nodes[NodeId]][]).map(([id, node]) => {
          const info = nodeInfo[id];
          const isCenter = id === 'agent';
          const isActive = activeNode === id;
          return (
            <g
              key={id}
              className="cursor-pointer"
              onClick={() => setActiveNode(isActive ? null : id)}
              role="button"
              tabIndex={0}
              aria-label={info.label}
            >
              {/* Outer glow ring */}
              {(isCenter || isActive) && (
                <circle cx={node.x} cy={node.y} r={node.r + 8} fill="none" stroke={node.color} strokeWidth="1" opacity="0.3">
                  {mounted && (
                    <animate attributeName="r" values={`${node.r + 6};${node.r + 14};${node.r + 6}`} dur="3s" repeatCount="indefinite" />
                  )}
                </circle>
              )}
              {/* Background circle */}
              <circle
                cx={node.x} cy={node.y} r={node.r}
                fill={`${node.color}10`}
                stroke={node.color}
                strokeWidth={isActive ? 2.5 : 1.5}
                opacity={isActive ? 1 : 0.8}
                className="transition-all duration-300"
              />
              {/* Icon */}
              <g transform={`translate(${node.x},${node.y - (isCenter ? 8 : 6)})`}>
                <NodeIcon type={node.icon} color={node.color} />
              </g>
              {/* Label */}
              <text
                x={node.x} y={node.y + (isCenter ? 20 : 18)}
                textAnchor="middle" fill="white" fontSize={isCenter ? 11 : 9.5} fontWeight="600"
              >
                {info.label}
              </text>
              <text
                x={node.x} y={node.y + (isCenter ? 33 : 30)}
                textAnchor="middle" fill={node.color} fontSize="7" opacity="0.7"
              >
                {info.description}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Detail Panel */}
      {activeNode && (
        <div className="mt-4 p-4 rounded-xl bg-surface/30 border border-white/10 animate-in fade-in duration-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: nodes[activeNode].color }} />
            <h4 className="text-base font-semibold text-white">{nodeInfo[activeNode].label}</h4>
            <span className="text-xs text-text-muted">{nodeInfo[activeNode].description}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {nodeInfo[activeNode].details.map((detail, i) => (
              <span key={i} className="px-3 py-1 text-xs rounded-full border" style={{
                borderColor: `${nodes[activeNode].color}40`,
                backgroundColor: `${nodes[activeNode].color}10`,
                color: nodes[activeNode].color,
              }}>
                {detail}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
