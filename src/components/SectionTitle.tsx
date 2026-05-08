import { cn } from '@/lib/utils';

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  id?: string;
  className?: string;
}

export function SectionTitle({ title, subtitle, id, className }: SectionTitleProps) {
  return (
    <div className={cn('mb-8', className)} id={id}>
      <h2 className="text-2xl md:text-3xl font-bold text-ivory mb-2">{title}</h2>
      {subtitle && <p className="text-calm-400 text-base leading-relaxed">{subtitle}</p>}
      <div className="w-16 h-1 bg-gold rounded-full mt-3" />
    </div>
  );
}
