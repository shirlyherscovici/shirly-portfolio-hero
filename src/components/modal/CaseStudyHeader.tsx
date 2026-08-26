import { ChevronLeft, type LucideIcon } from 'lucide-react'

interface CaseStudyHeaderProps {
  id: string
  stageLabel: string
  title: string
  supportLabel: string
  meta: { label: string; value: string; icon?: LucideIcon }[]
  theme: 'light' | 'dark'
  onClose: () => void
  /** Extra top-left clearance so the breadcrumb doesn't sit under the
   *  joystick badge ProjectModal renders for the Amy case study. */
  arcadeChrome?: boolean
  /** The approved mockup's header for Amy/Galgalatz is just the breadcrumb
   *  (Amy) or breadcrumb + one compact inline meta line (Galgalatz) — no
   *  separate large H2 title/subtitle block eating vertical space above
   *  the visual composition. 'full' (default) keeps the H2 + subtitle +
   *  bordered meta block for AI Rescue / People In Motion, which the
   *  mockup renders that way. 'minimal' drops the H2/subtitle and meta
   *  entirely (Amy). 'inline-meta' drops the H2/subtitle but keeps meta
   *  as one small line right under the breadcrumb (Galgalatz). The H2 is
   *  always rendered (sr-only when hidden) so aria-labelledby still
   *  resolves to real title text. */
  variant?: 'full' | 'minimal' | 'inline-meta'
  /** AI Rescue and People In Motion's approved mockups skip the
   *  "← Portfolio / Works /" breadcrumb entirely and open straight on the
   *  big "0N / TITLE" heading — checked directly against both reference
   *  files, neither shows a breadcrumb row at all. Defaults to true
   *  (Amy/Galgalatz keep it) so this is opt-out, not opt-in. */
  showBreadcrumb?: boolean
}

/** The breadcrumb + (variant-dependent) title/metadata every case study
 *  opens with — "← Portfolio / Works / 0N TITLE". */
export default function CaseStudyHeader({ id, stageLabel, title, supportLabel, meta, theme, onClose, arcadeChrome = false, variant = 'full', showBreadcrumb = true }: CaseStudyHeaderProps) {
  const light = theme === 'light'
  const showFullTitle = variant === 'full'
  return (
    // relative z-40 — guarantees the breadcrumb/title/meta text always
    // paints above any breakout prop that dramatically pokes into the
    // header's own corner (e.g. the AI Rescue plane), so a prop can break
    // the frame boundary for visual drama without ever making the copy
    // underneath it unreadable.
    <div className={`relative z-40 px-5 sm:px-8 ${showFullTitle ? 'pt-5 sm:pt-6 pb-4' : 'pt-4 sm:pt-5 pb-1.5'} ${arcadeChrome ? 'pl-16 sm:pl-20' : ''}`}>
      {showBreadcrumb && (
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
      )}

      <h2
        id={id}
        className={
          showFullTitle
            ? `${showBreadcrumb ? 'mt-3' : ''} font-display font-extrabold text-2xl sm:text-3xl lg:text-[2.1rem] leading-tight tracking-tight ${light ? 'text-pearl-ink' : 'text-white'}`
            : 'sr-only'
        }
      >
        <span className={light ? 'text-pearl-red' : 'text-gradient-cine'}>{stageLabel} / </span>
        {title}
      </h2>
      {showFullTitle && <p className={`mt-1.5 text-xs sm:text-sm font-semibold uppercase tracking-wide ${light ? 'text-pearl-sub' : 'text-cine-sub'}`}>{supportLabel}</p>}

      {meta.length > 0 && showFullTitle && (
        <div className={`mt-4 flex flex-wrap gap-x-6 gap-y-1.5 text-[11px] sm:text-xs pb-4 border-b ${light ? 'text-pearl-sub border-pearl-ink/10' : 'text-cine-sub border-white/10'}`}>
          {meta.map((m) => (
            <p key={m.label} className="flex items-center gap-1.5">
              {m.icon && <m.icon size={12} className={light ? 'text-pearl-ink/60' : 'text-white/60'} />}
              <span className={`font-bold ${light ? 'text-pearl-ink' : 'text-white'}`}>{m.label}:</span> {m.value}
            </p>
          ))}
        </div>
      )}

      {meta.length > 0 && variant === 'inline-meta' && (
        <div className={`mt-1.5 flex flex-wrap gap-x-4 gap-y-1 text-[10px] sm:text-[11px] ${light ? 'text-pearl-sub' : 'text-cine-sub'}`}>
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
