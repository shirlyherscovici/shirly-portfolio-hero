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
}

/** A slow, subtle vertical float — used for coins, music notes, tactical
 *  chips and every other foreground object that breaks a panel's bounds. */
export default function FloatingElement({ children, className = '', style, delay = 0, duration = 5, distance = 12, rotate = 4 }: FloatingElementProps) {
  return (
    <motion.div
      className={`pointer-events-none select-none ${className}`}
      style={style}
      animate={{ y: [0, -distance, 0], rotate: [0, rotate, 0] }}
      transition={{ duration, repeat: Infinity, ease: 'easeInOut', delay }}
    >
      {children}
    </motion.div>
  )
}
