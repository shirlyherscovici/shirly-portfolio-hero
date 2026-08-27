import type { ReactNode, CSSProperties } from 'react'
import { motion } from 'framer-motion'

interface FloatingElementProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
  duration?: number
  distance?: number
  rotate?: number
  /** When set, hovering the element springs it away along this vector
   *  (e.g. { x: -30 } to flee left) instead of just sitting there —
   *  "coins that dodge the cursor" for Amy/Galgalatz/After Effects'
   *  floating decor, matching the homepage's own FleeingCoin mechanic.
   *  Requires pointer-events (auto instead of the default none) to even
   *  receive the hover in the first place. */
  fleeTo?: { x?: number; y?: number }
}

/** A slow, subtle vertical float — used for coins, music notes, tactical
 *  chips and every other foreground object that breaks a panel's bounds.
 *  Optionally also flees the cursor on hover (see `fleeTo`). */
export default function FloatingElement({ children, className = '', style, delay = 0, duration = 5, distance = 12, rotate = 4, fleeTo }: FloatingElementProps) {
  return (
    <motion.div
      className={`select-none ${fleeTo ? 'pointer-events-auto cursor-default' : 'pointer-events-none'} ${className}`}
      style={style}
      animate={{ y: [0, -distance, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
      {...(fleeTo
        ? {
            whileHover: { x: fleeTo.x ?? 0, y: fleeTo.y ?? 0, scale: 1.1, transition: { type: 'spring', stiffness: 300, damping: 15 } },
          }
        : {})}
    >
      {children}
    </motion.div>
  )
}
