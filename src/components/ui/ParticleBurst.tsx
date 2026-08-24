import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

interface Particle {
  id: number
  glyph: string
  x: number
  delay: number
  duration: number
  drift: number
}

const GLYPHS = ['✨', '🎵', '⭐', '🎶']

/** Floating glyph particles that spawn upward from behind a figure and fade
 *  out — used for the Amy card's hover/click flourish. Call `spawn()`
 *  (returned by `useParticleBurst`) from any interaction handler. */
export function useParticleBurst(count = 6) {
  const [particles, setParticles] = useState<Particle[]>([])
  const nextId = useRef(0)

  const spawn = () => {
    const batch: Particle[] = Array.from({ length: count }, () => ({
      id: nextId.current++,
      glyph: GLYPHS[Math.floor(Math.random() * GLYPHS.length)],
      x: Math.random() * 100,
      delay: Math.random() * 0.25,
      duration: 1.3 + Math.random() * 0.7,
      drift: (Math.random() - 0.5) * 40,
    }))
    setParticles((p) => [...p, ...batch])
  }

  const remove = (id: number) => setParticles((p) => p.filter((particle) => particle.id !== id))

  const field = (
    <div className="pointer-events-none absolute inset-0 overflow-visible" aria-hidden>
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute bottom-[15%] text-base sm:text-lg select-none"
            style={{ left: `${p.x}%` }}
            initial={{ opacity: 0, y: 0, x: 0, scale: 0.6 }}
            animate={{ opacity: [0, 1, 1, 0], y: -110, x: p.drift, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
            onAnimationComplete={() => remove(p.id)}
          >
            {p.glyph}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )

  return { spawn, field }
}
