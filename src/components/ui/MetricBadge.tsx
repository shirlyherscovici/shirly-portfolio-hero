interface MetricBadgeProps {
  value: string
  label: string
  theme?: 'light' | 'dark'
  size?: 'sm' | 'md' | 'lg'
  accent?: 'gold' | 'red' | 'cyan' | 'magenta'
  className?: string
}

const ACCENTS: Record<string, { light: string; dark: string }> = {
  gold: { light: 'text-pearl-gold2', dark: 'text-cine-gold' },
  red: { light: 'text-pearl-red', dark: 'text-cine-magenta' },
  cyan: { light: 'text-pearl-gold2', dark: 'text-cine-cyan' },
  magenta: { light: 'text-pearl-red', dark: 'text-cine-magenta' },
}

const SIZES: Record<string, string> = {
  sm: 'text-lg',
  md: 'text-2xl',
  lg: 'text-4xl',
}

/** A premium game-UI style metric badge — a big number + small caption,
 *  used for recruiter-facing stats throughout the hub and case studies. */
export default function MetricBadge({ value, label, theme = 'light', size = 'md', accent = 'gold', className = '' }: MetricBadgeProps) {
  const accentClass = ACCENTS[accent][theme]
  return (
    <div className={`leading-none ${className}`}>
      <p className={`font-display font-extrabold tracking-tight ${SIZES[size]} ${accentClass}`}>{value}</p>
      <p className={`mt-1 text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.08em] ${theme === 'light' ? 'text-pearl-sub' : 'text-cine-sub'}`}>
        {label}
      </p>
    </div>
  )
}
