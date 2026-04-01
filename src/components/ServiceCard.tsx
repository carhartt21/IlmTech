'use client';

import Link from 'next/link';
import { type ReactNode } from 'react';
import { useI18n } from './I18nProvider';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href?: string;
}

export default function ServiceCard({ icon, title, description, href }: ServiceCardProps) {
  const { dict } = useI18n();

  const content = (
    <div className="group relative p-6 rounded-xl bg-surface/50 border border-white/5 hover:border-accent-blue/30 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.08)] h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-accent-blue transition-colors">{title}</h3>
      <p className="text-sm text-text-muted leading-relaxed">{description}</p>
      {href && (
        <span className="inline-block mt-4 text-xs text-accent-blue opacity-0 group-hover:opacity-100 transition-opacity">
          {dict.serviceCard.learnMore}
        </span>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
