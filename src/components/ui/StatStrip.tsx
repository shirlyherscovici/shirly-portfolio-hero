interface Stat {
  icon?: React.ReactNode
  label: string
  value: string
}

interface StatStripProps {
  stats: Stat[]
  theme: 'light' | 'dark'
  className?: string
  /** 'lg' bumps the value size up for footers where readability matters
   *  more than density (e.g. Amy's animated count-up metrics). */
  size?: 'sm' | 'lg'
}

/** A compact row of "IMPACT" style stats used in every case study footer.
 *  Every value glows in its theme's accent color — a real "this is
 *  evidence, look here" pop rather than flat text sitting in a list. */
export default function StatStrip({ stats, theme, className = '', size = 'sm' }: StatStripProps) {
  const light = theme === 'light'
  const valueSize = size === 'lg' ? 'text-2xl sm:text-3xl' : 'text-lg sm:text-xl'
  const glow = light
    ? { textShadow: '0 0 16px rgba(176,42,58,0.4), 0 0 32px rgba(176,42,58,0.2)' }
    : { textShadow: '0 0 16px rgba(79,216,255,0.5), 0 0 32px rgba(79,216,255,0.25)' }
  return (
    <div className={`flex flex-wrap items-center gap-x-6 gap-y-2 ${className}`}>
      {stats.map((s) => (
        <div key={s.label} className="flex items-center gap-2">
          {s.icon && <span className={light ? 'text-pearl-red' : 'text-cine-cyan'}>{s.icon}</span>}
          <div className="leading-tight">
            <span
              className={`font-display font-black tabular-nums ${valueSize} ${light ? 'text-pearl-red' : 'text-white'}`}
              style={glow}
            >
              {s.value}
            </span>{' '}
            <span className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wide ${light ? 'text-pearl-ink/80' : 'text-slate-100'}`}>{s.label}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
