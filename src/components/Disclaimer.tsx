'use client';

import { projectConfig } from '@/data/projectConfig';

interface DisclaimerProps {
  variant?: 'top' | 'bottom' | 'inline';
}

export function Disclaimer({ variant = 'inline' }: DisclaimerProps) {
  const base =
    'text-xs text-calm-400 border border-calm-700 rounded-lg p-3 bg-charcoal-light/50';
  const top = 'sticky top-0 z-50 rounded-none border-x-0 border-t-0 text-center py-2 bg-charcoal text-calm-500';

  if (variant === 'top') {
    return (
      <div className={top} role="banner">
        <p className="max-w-4xl mx-auto text-xs leading-relaxed px-4">
          ⚠️ {projectConfig.disclaimer}
        </p>
      </div>
    );
  }

  return (
    <div className={base} role="note">
      <p className="leading-relaxed">
        <span className="text-gold font-medium ml-1">⚠️ تنبيه قانوني:</span>
        {projectConfig.disclaimer}
      </p>
    </div>
  );
}
