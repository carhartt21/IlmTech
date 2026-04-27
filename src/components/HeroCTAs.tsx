'use client';

import { useState } from 'react';
import CTAButton from './CTAButton';
import HeroHouse from './HeroHouse';

interface HeroCTAsProps {
  locale: string;
  smartHomeLabel: string;
  smartHomeAudience: string;
  aiServicesLabel: string;
  aiAudience: string;
}

export default function HeroCTAs({ locale, smartHomeLabel, smartHomeAudience, aiServicesLabel, aiAudience }: HeroCTAsProps) {
  const [segment, setSegment] = useState<'smart-home' | 'ai' | null>(null);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-6 justify-center">
        <CTAButton
          href={`/${locale}/smart-home`}
          variant="secondary"
          className="px-10 py-4 shadow-[0_0_20px_rgba(0,212,255,0.15)] hover:shadow-[0_0_28px_rgba(0,212,255,0.3)]"
          onMouseEnter={() => setSegment('smart-home')}
          onMouseLeave={() => setSegment(null)}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-bold tracking-wide text-accent-blue">{smartHomeAudience}</span>
            <span className="text-lg font-semibold">{smartHomeLabel}</span>
          </div>
        </CTAButton>
        <CTAButton
          href={`/${locale}/ai-services`}
          variant="secondary"
          className="px-10 py-4 shadow-[0_0_20px_rgba(168,85,247,0.15)] hover:shadow-[0_0_28px_rgba(168,85,247,0.3)]"
          onMouseEnter={() => setSegment('ai')}
          onMouseLeave={() => setSegment(null)}
        >
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-xs font-bold tracking-wide text-accent-purple">{aiAudience}</span>
            <span className="text-lg font-semibold">{aiServicesLabel}</span>
          </div>
        </CTAButton>
      </div>

      <div className="mt-12">
        <HeroHouse highlightSegment={segment} />
      </div>
    </>
  );
}
