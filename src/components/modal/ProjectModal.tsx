import { useEffect, type ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { asset } from '../../lib/asset'

interface ProjectModalProps {
  open: boolean
  onClose: () => void
  theme: 'light' | 'dark'
  children: ReactNode
  labelledBy: string
  /** Optional foreground layer rendered as a sibling of the scrollable
   *  content, inside the (non-clipping) outer panel — for elements that must
   *  visually break the modal's boundary (e.g. the AI Rescue transport
   *  plane) without being cut off by the scroll container's overflow. */
  breakout?: ReactNode
  /** Swaps the plain glass close control for a retro arcade-cabinet look
   *  (solid red square button with a white X) and adds a black joystick
   *  badge in the top-left corner, matching the approved Amy mockup
   *  exactly (checked against the actual reference file, not memory).
   *  Amy only. */
  arcadeChrome?: boolean
  /** A second, smaller joystick badge next to the close button (top-right)
   *  — the approved Galgalatz mockup has its own joystick icon there,
   *  dark/metallic rather than Amy's red-topped one, and doesn't swap the
   *  close button style. */
  joystickBadgeSrc?: string
  /** Swaps the glass pill for a plain outlined square button (border only,
   *  no fill, small centered X) — matches the approved Galgalatz mockup's
   *  close control, distinct from both the default glass pill and Amy's
   *  solid red arcade square. Galgalatz only. */
  outlineClose?: boolean
  /** Shared with the originating homepage card's own `layoutId` — Framer
   *  Motion animates the FLIP between the card's last known rect and this
   *  panel's rect, so opening a project reads as "the card expands into
   *  the case study" rather than a dialog popping up disconnected from
   *  whatever was clicked. */
  layoutId?: string
  /** Overrides the panel's default max-w-[1180px] — for a case study whose
   *  approved composition is a narrower, portrait-cinematic scene (e.g.
   *  Galgalatz) rather than the shared wide landscape shell. */
  maxWidthClass?: string
}

/** The shared cinematic modal shell every case study opens inside — glass
 *  chrome, backdrop blur, Escape-to-close, scroll lock, and a premium
 *  "game event panel" entrance/exit rather than a flat dialog fade. */
export default function ProjectModal({
  open,
  onClose,
  theme,
  children,
  labelledBy,
  breakout,
  arcadeChrome = false,
  joystickBadgeSrc,
  outlineClose = false,
  layoutId,
  maxWidthClass = 'max-w-[1180px]',
}: ProjectModalProps) {
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 lg:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* Backdrop — a rich, unified dark frosted glass regardless of the
              case study's own theme, so the homepage always reads as
              pushed convincingly behind the panel rather than lightly
              tinted. */}
          <motion.div className="absolute inset-0 bg-slate-900/60 backdrop-blur-2xl" onClick={onClose} aria-hidden />

          {/* Panel — shares `layoutId` with the card that opened it, so its
              entrance is a genuine shared-layout morph (position, size and
              border-radius all interpolate from the card's own rect) rather
              than a fixed scale/translate animation with no relationship to
              where the click came from. A large ambient shadow underneath
              gives it real physical presence above the backdrop. */}
          <motion.div
            layoutId={layoutId}
            role="dialog"
            aria-modal="true"
            aria-labelledby={labelledBy}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ layout: { type: 'spring', stiffness: 300, damping: 32 }, opacity: { duration: 0.2 } }}
            className={`relative w-full ${maxWidthClass} max-h-[90vh] rounded-[28px] sm:rounded-[32px] border ${
              theme === 'light' ? 'bg-white/40 backdrop-blur-2xl border-white/60' : 'bg-slate-900/60 backdrop-blur-2xl border-white/15'
            }`}
            style={{ isolation: 'isolate', boxShadow: '0 0 50px rgba(0,0,0,0.5), 0 40px 90px -20px rgba(0,0,0,0.6)' }}
          >
            {/* Retro joystick accent — black badge, top-left, Amy only.
                Checked directly against the mockup file: the badge itself
                is black, not the light/white one this used to be. */}
            {arcadeChrome && (
              <div
                aria-hidden
                className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[90] w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-black/90 border border-black/60 shadow-lg flex items-center justify-center overflow-hidden p-1"
              >
                <img src={asset('/assets/amy/joystick-amy.png')} alt="" className="w-full h-full object-contain" />
              </div>
            )}

            {/* Galgalatz's own joystick badge — smaller, sits directly next
                to the close button (both top-right) rather than opposite
                corners like Amy's arrangement. */}
            {joystickBadgeSrc && (
              <div
                aria-hidden
                className="absolute -top-3 right-14 sm:-top-4 sm:right-16 z-[90] w-9 h-9 sm:w-11 sm:h-11 flex items-center justify-center overflow-visible drop-shadow-[0_6px_10px_rgba(0,0,0,0.5)]"
              >
                <img src={joystickBadgeSrc} alt="" className="w-full h-full object-contain" />
              </div>
            )}

            {/* Close control. Amy (arcadeChrome) uses a solid red square
                with a white X, matching the mockup's arcade-button style
                exactly. Every other case study keeps the restrained glass
                pill that expands to a "CLOSE" label on hover. */}
            {arcadeChrome ? (
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[100] pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-b from-[#d34f4f] to-[#8f1f2d] border border-white/20 shadow-[0_3px_0_#5e1319,0_6px_14px_-2px_rgba(143,31,45,0.55)] flex items-center justify-center text-white"
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            ) : outlineClose ? (
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 z-[100] pointer-events-auto w-9 h-9 sm:w-10 sm:h-10 rounded-lg border-2 border-white/40 hover:border-white/70 hover:bg-white/10 transition-colors flex items-center justify-center text-white"
              >
                <X size={16} strokeWidth={2.5} />
              </motion.button>
            ) : (
              <motion.button
                type="button"
                onClick={onClose}
                aria-label="Close case study"
                whileHover="hover"
                initial="rest"
                whileTap={{ scale: 0.94 }}
                className={`group absolute top-3 right-3 sm:top-4 sm:right-4 z-[100] pointer-events-auto flex items-center gap-1.5 h-9 sm:h-10 pl-2.5 pr-2.5 rounded-full border backdrop-blur-md transition-colors ${
                  theme === 'light'
                    ? 'bg-white/70 border-white/80 text-pearl-ink hover:bg-white/90 shadow-pearl-sm'
                    : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
                }`}
              >
                <X size={15} strokeWidth={2.25} />
                <motion.span
                  variants={{ rest: { width: 0, opacity: 0, marginRight: -2 }, hover: { width: 'auto', opacity: 1, marginRight: 0 } }}
                  transition={{ duration: 0.18 }}
                  className="overflow-hidden whitespace-nowrap text-[10px] font-bold uppercase tracking-wide"
                >
                  Close
                </motion.span>
              </motion.button>
            )}

            <div className="relative max-h-[90vh] overflow-y-auto overflow-x-clip no-scrollbar rounded-[28px] sm:rounded-[32px]">
              {children}
            </div>

            {breakout}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
