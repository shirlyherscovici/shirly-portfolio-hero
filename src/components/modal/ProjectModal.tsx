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
   *  (red square button) and adds a joystick icon in the top-left corner —
   *  used by the Amy case study only. */
  arcadeChrome?: boolean
  /** Shared with the originating homepage card's own `layoutId` — Framer
   *  Motion animates the FLIP between the card's last known rect and this
   *  panel's rect, so opening a project reads as "the card expands into
   *  the case study" rather than a dialog popping up disconnected from
   *  whatever was clicked. */
  layoutId?: string
}

/** The shared cinematic modal shell every case study opens inside — glass
 *  chrome, backdrop blur, Escape-to-close, scroll lock, and a premium
 *  "game event panel" entrance/exit rather than a flat dialog fade. */
export default function ProjectModal({ open, onClose, theme, children, labelledBy, breakout, arcadeChrome = false, layoutId }: ProjectModalProps) {
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
            className={`relative w-full max-w-[1180px] max-h-[90vh] rounded-[28px] sm:rounded-[32px] border ${
              theme === 'light' ? 'bg-white/40 backdrop-blur-2xl border-white/60' : 'bg-slate-900/60 backdrop-blur-2xl border-white/15'
            }`}
            style={{ isolation: 'isolate', boxShadow: '0 0 50px rgba(0,0,0,0.5), 0 40px 90px -20px rgba(0,0,0,0.6)' }}
          >
            {/* Retro joystick accent — Amy case study only */}
            {arcadeChrome && (
              <div
                aria-hidden
                className="absolute top-3 left-3 sm:top-4 sm:left-4 z-[90] w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/80 border border-white shadow-pearl-sm flex items-center justify-center overflow-hidden p-1"
              >
                <img src={asset('/assets/amy/joystick-amy.png')} alt="" className="w-full h-full object-contain" />
              </div>
            )}

            {/* Close control — a restrained glass pill for every case study
                (including Amy), fixed top-right, z-[100] so no breakout
                content can ever render above it or block clicks. Expands
                to reveal a "CLOSE" label on hover rather than reading as an
                alert/error button. */}
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
