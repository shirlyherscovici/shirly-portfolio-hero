import { forwardRef, type ReactNode } from 'react'

interface ComputerMonitorFrameProps {
  children: ReactNode
  className?: string
  /** Shrinks the bezel/stand proportions for homepage-card scale. */
  compact?: boolean
}

/** A clean desktop-monitor bezel — screen (16:9), thin frame, neck & base —
 *  wraps a static poster image or a real <video> for the After Effects /
 *  Animation case study and its homepage card. Forwards its ref to the
 *  SCREEN element specifically (not the outer bezel+neck+base wrapper) —
 *  callers that need to fullscreen just the video (see the People In
 *  Motion case study) must fullscreen this, not the whole decorative
 *  monitor, or the bezel/neck/base fill the screen alongside the footage. */
const ComputerMonitorFrame = forwardRef<HTMLDivElement, ComputerMonitorFrameProps>(function ComputerMonitorFrame(
  { children, className = '', compact = false },
  ref,
) {
  return (
    <div className={`relative w-full ${className}`}>
      {/* Screen + bezel */}
      <div
        ref={ref}
        className={`relative w-full aspect-video rounded-lg sm:rounded-xl bg-[#0c0c10] shadow-cine-lg overflow-hidden ${
          compact ? 'border-[3px] sm:border-[5px]' : 'border-[6px] sm:border-[9px]'
        } border-[#1a1a1f]`}
      >
        {/* Camera dot */}
        <span
          aria-hidden
          className={`absolute left-1/2 -translate-x-1/2 rounded-full bg-black/60 ${compact ? '-top-[3px] sm:-top-[5px] w-1 h-1' : '-top-[5px] sm:-top-[7px] w-1.5 h-1.5'}`}
        />
        <div className="absolute inset-0">{children}</div>
        {/* Glass sheen */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.02) 22%, transparent 45%)' }}
        />
      </div>
      {/* Neck */}
      <div className={`mx-auto bg-gradient-to-b from-[#26262c] to-[#18181c] ${compact ? 'w-[10%] h-2 sm:h-2.5' : 'w-[8%] h-3 sm:h-4'}`} />
      {/* Base */}
      <div className={`mx-auto rounded-full bg-gradient-to-b from-[#2c2c33] to-[#111114] shadow-md ${compact ? 'w-[34%] h-1.5' : 'w-[28%] h-2 sm:h-2.5'}`} />
    </div>
  )
})

export default ComputerMonitorFrame
