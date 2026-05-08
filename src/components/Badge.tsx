import { cn } from '@/lib/utils';

type BadgeVariant = 'confirmed' | 'conservative' | 'verify' | 'recommended' | 'warning' | 'danger' | 'demo';

const variants: Record<BadgeVariant, string> = {
  confirmed: 'bg-primary-900 text-primary-300 border-primary-700',
  conservative: 'bg-blue-900/40 text-blue-300 border-blue-700',
  verify: 'bg-yellow-900/40 text-yellow-300 border-yellow-700',
  recommended: 'bg-gold/20 text-gold border-gold/40',
  warning: 'bg-orange-900/40 text-orange-300 border-orange-700',
  danger: 'bg-red-900/40 text-red-300 border-red-700',
  demo: 'bg-purple-900/40 text-purple-300 border-purple-700',
};

const labels: Record<BadgeVariant, string> = {
  confirmed: 'رقم مؤكد',
  conservative: 'افتراض محافظ',
  verify: 'يحتاج تحقق',
  recommended: 'موصى به',
  warning: 'تحذير',
  danger: 'مرتفع',
  demo: 'بيانات تجريبية',
};

interface BadgeProps {
  variant: BadgeVariant;
  label?: string;
  className?: string;
}

export function Badge({ variant, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border',
        variants[variant],
        className
      )}
    >
      {label || labels[variant]}
    </span>
  );
}
