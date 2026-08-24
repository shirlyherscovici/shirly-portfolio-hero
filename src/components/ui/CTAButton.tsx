import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

interface CTAButtonProps {
  children: ReactNode
  onClick?: () => void
  href?: string
  variant?: 'gold' | 'red' | 'cine' | 'ghost-light' | 'ghost-dark'
  icon?: boolean
  className?: string
  as?: 'button' | 'a'
}

// A solid-color "lip" beneath each gradient button — like a physical arcade
// button's stage — plus the existing colored glow further out. whileTap
// below presses the button down into that lip (translateY + shadow shrink
// via a separate class swap isn't animatable through Tailwind alone, so the
// lip itself stays a fixed visual anchor while the button's own y-motion
// sells the press).
const VARIANTS: Record<string, string> = {
  gold: 'bg-gradient-to-b from-[#f0d29a] to-[#b8863b] text-[#2c2010] shadow-[0_4px_0_#8a641f,0_4px_0_#8a641f,0_10px_22px_-4px_rgba(184,134,59,0.55)] border border-white/40',
  red: 'bg-gradient-to-b from-[#d34f4f] to-[#8f1f2d] text-white shadow-[0_4px_0_#5e1319,0_10px_22px_-4px_rgba(143,31,45,0.55)] border border-white/20',
  cine: 'bg-gradient-to-b from-[#6a4dc4] to-[#2c2159] text-white shadow-[0_4px_0_#1a1538,0_10px_22px_-4px_rgba(90,63,174,0.55)] border border-white/15',
  'ghost-light': 'bg-white/70 text-pearl-ink border border-white/80 hover:bg-white',
  'ghost-dark': 'bg-white/10 text-white border border-white/20 hover:bg-white/15',
}

/** The primary tactile CTA used homepage-wide and inside every case study —
 *  "Let's Create Magic", "Watch Prime-Time Broadcast", "Watch Playable Demo".
 *  The gold/red/cine variants read as physical arcade buttons: a solid
 *  bottom "lip" they visually press into on tap. */
export default function CTAButton({ children, onClick, href, variant = 'gold', icon = true, className = '' }: CTAButtonProps) {
  const cls = `group inline-flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full font-display font-bold text-xs sm:text-sm tracking-wide uppercase transition-shadow ${VARIANTS[variant]} ${className}`
  const content = (
    <>
      {children}
      {icon && <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />}
    </>
  )
  if (href) {
    return (
      <motion.a href={href} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97, y: 2 }} className={cls}>
        {content}
      </motion.a>
    )
  }
  return (
    <motion.button type="button" onClick={onClick} whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97, y: 2 }} className={cls}>
      {content}
    </motion.button>
  )
}
