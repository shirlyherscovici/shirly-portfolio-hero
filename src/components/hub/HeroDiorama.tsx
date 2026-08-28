import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { asset } from '../../lib/asset'

const DIORAMA_SRC = asset('/assets/hub/hero-game-diorama.png')

/** The hero's real game-board illustration (supplied art, not a CSS/SVG
 *  recreation) — a floating isometric mini level with tiles, a path, a
 *  crystal, a coin, a pawn and a checkpoint flag. It has no card or
 *  rectangular container of its own: it just floats directly in the hero's
 *  environment, tilting gently toward the cursor (max ~3deg) and drifting
 *  in a slow idle bob, with a soft glow that blooms in on hover. Respects
 *  prefers-reduced-motion — both the idle float and the hover tilt drop
 *  out, leaving the static image with just the ambient glow. */
export default function HeroDiorama() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [3, -3]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-3.5, 3.5]), { stiffness: 200, damping: 20 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced) return
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div className="relative select-none w-full max-w-[560px]" style={{ perspective: 1200 }}>
      {/* "Tap to explore" cue — kept secondary/small, floating near the
          board rather than competing with it. */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.6 }}
        className="absolute -top-1 right-2 sm:top-2 sm:right-4 z-10 flex flex-col items-end text-white/60"
      >
        <span className="italic text-[13px] sm:text-sm" style={{ fontFamily: 'Georgia, serif' }}>
          Tap to explore
        </span>
        <motion.svg
          width="30"
          height="22"
          viewBox="0 0 34 26"
          fill="none"
          animate={prefersReduced ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M30 3C22 4 10 9 4 19M4 19L11 17M4 19L6 12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </motion.svg>
      </motion.div>

      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        animate={prefersReduced ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="relative"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Soft ambient glow beneath the board, blooms on hover */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[58%] -translate-x-1/2 -translate-y-1/2 w-[80%] h-[55%] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(closest-side, rgba(185,140,255,0.35), transparent 75%)', filter: 'blur(30px)' }}
          animate={{ opacity: 0.6 }}
          whileHover={{ opacity: 1, scale: 1.08 }}
          transition={{ duration: 0.4 }}
        />

        <motion.div
          style={{ rotateX: prefersReduced ? 0 : rotateX, rotateY: prefersReduced ? 0 : rotateY, transformStyle: 'preserve-3d' }}
          whileHover={prefersReduced ? undefined : { scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          <img
            src={DIORAMA_SRC}
            alt="An isometric mini game level — a winding tile path, a floating crystal, a gold coin and a pawn marker on a purple floating platform"
            className="relative z-[1] w-full h-auto object-contain"
            style={{ filter: 'drop-shadow(0 30px 45px rgba(0,0,0,0.55))' }}
            draggable={false}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
