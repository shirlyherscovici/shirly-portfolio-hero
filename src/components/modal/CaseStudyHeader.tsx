import { ChevronLeft } from 'lucide-react'

interface CaseStudyHeaderProps {
  id: string
  stageLabel: string
  title: string
  supportLabel: string
  meta: { label: string; value: string }[]
  theme: 'light' | 'dark'
  onClose: () => void
  /** Extra top-left clearance so the breadcrumb doesn't sit under the
   *  joystick badge ProjectModal renders for the Amy case study. */
  arcadeChrome?: boolean
}

/** The consistent breadcrumb + title + metadata row every case study opens
 *  with — "← Portfolio / Works / 0N TITLE", role/crafted/tech metadata. */
export default function CaseStudyHeader({ id, stageLabel, title, supportLabel, meta, theme, onClose, arcadeChrome = false }: CaseStudyHeaderProps) {
  const light = theme === 'light'
  return (
    // relative z-40 — guarantees the breadcrumb/title/meta text always
    // paints above any breakout prop that dramatically pokes into the
    // header's own corner (e.g. the AI Rescue plane), so a prop can break
    // the frame boundary for visual drama without ever making the copy
    // underneath it unreadable.
    <div className={`relative z-40 px-5 sm:px-8 pt-5 sm:pt-6 pb-4 ${arcadeChrome ? 'pl-16 sm:pl-20' : ''}`}>
      <button
        type="button"
        onClick={onClose}
        className={`flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-wide transition-colors ${
          light ? 'text-pearl-sub hover:text-pearl-ink' : 'text-cine-sub hover:text-white'
        }`}
      >
        <ChevronLeft size={13} />
        <span>
          Portfolio / Works / <span className={light ? 'text-pearl-ink' : 'text-white'}>{stageLabel} {title}</span>
        </span>
      </button>

      <h2 id={id} className={`mt-3 font-display font-extrabold text-2xl sm:text-3xl lg:text-[2.1rem] leading-tight tracking-tight ${light ? 'text-pearl-ink' : 'text-white'}`}>
        <span className={light ? 'text-pearl-red' : 'text-gradient-cine'}>{stageLabel} / </span>
        {title}
      </h2>
      <p className={`mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wide ${light ? 'text-pearl-sub' : 'text-cine-sub'}`}>{supportLabel}</p>

      {meta.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] sm:text-xs pb-4 border-b ${light ? 'text-pearl-sub border-pearl-ink/10' : 'text-cine-sub border-white/10'}`}>
          {meta.map((m) => (
            <p key={m.label}>
              <span className={`font-bold ${light ? 'text-pearl-ink' : 'text-white'}`}>{m.label}:</span> {m.value}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}
