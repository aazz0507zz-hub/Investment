import { cn } from '@/lib/utils';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  highlight?: boolean;
  className?: string;
  icon?: string;
}

export function StatCard({ label, value, sub, highlight, className, icon }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-5 border flex flex-col gap-1',
        highlight
          ? 'bg-forest border-gold/40 shadow-lg shadow-gold/10'
          : 'bg-charcoal-light border-calm-700',
        className
      )}
    >
      {icon && <span className="text-2xl mb-1">{icon}</span>}
      <p className="text-calm-400 text-sm leading-tight">{label}</p>
      <p
        className={cn(
          'text-2xl font-bold leading-tight',
          highlight ? 'text-gold' : 'text-ivory'
        )}
      >
        {value}
      </p>
      {sub && <p className="text-calm-500 text-xs mt-1">{sub}</p>}
    </div>
  );
}
