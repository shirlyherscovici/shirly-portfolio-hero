import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/** A small isometric game-level diorama — tiles, a winding path, a gem, a
 *  coin, a pawn marker and a checkpoint flag — standing in for the hero's
 *  old "fake dashboard" mockups. It's deliberately generic (no project
 *  branding) so it reads as "this designer builds game worlds", not as a
 *  fifth, invented case study. Pure SVG (an isometric grid is just
 *  parallelogram tiles at fixed angles — no 3D engine needed), floats
 *  gently at rest, and tilts toward the cursor on hover like a real
 *  physical object on a shelf. Respects prefers-reduced-motion: the idle
 *  float and hover tilt both drop out, leaving the static board. */
export default function HeroDiorama() {
  const prefersReduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [10, -10]), { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-12, 12]), { stiffness: 200, damping: 20 })

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
    <div className="relative select-none" style={{ perspective: 1200 }}>
      {/* "Tap to explore" cue, curling toward the board */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="absolute -top-2 right-2 sm:-top-4 sm:right-4 z-10 flex flex-col items-end text-white/70"
      >
        <span className="font-hand text-sm sm:text-base italic" style={{ fontFamily: 'Georgia, serif' }}>
          Tap to explore
        </span>
        <motion.svg
          width="34"
          height="26"
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
        animate={prefersReduced ? undefined : { y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.div style={{ rotateX: prefersReduced ? 0 : rotateX, rotateY: prefersReduced ? 0 : rotateY, transformStyle: 'preserve-3d' }}>
          <svg width="340" height="280" viewBox="0 0 340 280" className="w-[240px] h-[198px] sm:w-[320px] sm:h-[264px] lg:w-[360px] lg:h-[297px]" style={{ filter: 'drop-shadow(0 30px 40px rgba(0,0,0,0.45))' }}>
            <defs>
              <linearGradient id="platformTop" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#3a2e63" />
                <stop offset="100%" stopColor="#241a45" />
              </linearGradient>
              <linearGradient id="platformSideL" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1c1438" />
                <stop offset="100%" stopColor="#120d28" />
              </linearGradient>
              <linearGradient id="platformSideR" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#251b47" />
                <stop offset="100%" stopColor="#170f30" />
              </linearGradient>
              <linearGradient id="tileFace" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#e8d9b8" />
                <stop offset="100%" stopColor="#cdb989" />
              </linearGradient>
              <radialGradient id="glowPurple" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#b98cff" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#b98cff" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="glowGold" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#ffc93c" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ffc93c" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="gemGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e4d1ff" />
                <stop offset="55%" stopColor="#b98cff" />
                <stop offset="100%" stopColor="#7c4fd6" />
              </linearGradient>
              <linearGradient id="coinGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffe59a" />
                <stop offset="100%" stopColor="#e0a72e" />
              </linearGradient>
            </defs>

            {/* Ambient glow beneath the whole board */}
            <ellipse cx="170" cy="200" rx="150" ry="60" fill="url(#glowPurple)" opacity="0.35" />

            {/* Isometric platform slab — top rhombus + two shaded side faces */}
            <polygon points="170,60 268,112 170,164 72,112" fill="url(#platformTop)" stroke="#4a3a7a" strokeWidth="1.5" />
            <polygon points="72,112 170,164 170,196 72,144" fill="url(#platformSideL)" />
            <polygon points="268,112 170,164 170,196 268,144" fill="url(#platformSideR)" />
            {/* Base rim glow */}
            <polygon points="72,144 170,196 268,144 268,150 170,202 72,150" fill="none" stroke="#b98cff" strokeOpacity="0.5" strokeWidth="1.5" />

            {/* Winding path of tiles across the platform top face */}
            {[
              [130, 96],
              [156, 110],
              [182, 96],
              [208, 110],
              [182, 124],
            ].map(([cx, cy], i) => (
              <g key={i} transform={`translate(${cx} ${cy})`}>
                <polygon points="0,-11 19,0 0,11 -19,0" fill="url(#tileFace)" stroke="#8a7550" strokeWidth="1" opacity={0.95} />
              </g>
            ))}

            {/* Checkpoint flag — end of the path */}
            <g transform="translate(208 96)">
              <line x1="0" y1="0" x2="0" y2="-34" stroke="#e8d9b8" strokeWidth="2" strokeLinecap="round" />
              <path d="M0,-34 L16,-27 L0,-20 Z" fill="#ff5f7a" />
              <ellipse cx="0" cy="2" rx="7" ry="3" fill="#000" opacity="0.25" />
            </g>

            {/* Gold coin, floating above a path tile */}
            <motion.g
              transform="translate(156 74)"
              animate={prefersReduced ? undefined : { y: [0, -6, 0], rotate: [0, 8, 0] }}
              transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <circle r="20" fill="url(#glowGold)" />
              <circle r="9" fill="url(#coinGrad)" stroke="#8f6a15" strokeWidth="1.2" />
              <path d="M-3,-3 L0,-6 L3,-3 L3,3 L0,6 L-3,3 Z" fill="#8f6a15" opacity="0.5" />
            </motion.g>

            {/* Purple crystal/gem, floating above another tile */}
            <motion.g
              transform="translate(130 82)"
              animate={prefersReduced ? undefined : { y: [0, -8, 0] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            >
              <circle r="22" fill="url(#glowPurple)" />
              <polygon points="0,-16 9,-4 5,14 -5,14 -9,-4" fill="url(#gemGrad)" stroke="#5a2fae" strokeWidth="1" />
              <polygon points="0,-16 9,-4 0,-2 -9,-4" fill="#f1e6ff" opacity="0.7" />
            </motion.g>

            {/* Player pawn — the marker sitting on the current tile */}
            <g transform="translate(156 110)">
              <ellipse cx="0" cy="6" rx="10" ry="3.5" fill="#000" opacity="0.3" />
              <circle r="12" fill="url(#glowGold)" opacity="0.6" />
              <path d="M0,-14 C7,-14 9,-6 5,0 L9,7 L-9,7 L-5,0 C-9,-6 -7,-14 0,-14 Z" fill="#ff5fa0" stroke="#a33a68" strokeWidth="1" />
              <circle cy="-8" r="3.5" fill="#ffd8ea" />
            </g>

            {/* Small "LEVEL 01" tag hanging under the platform */}
            <g transform="translate(170 220)">
              <rect x="-38" y="-11" width="76" height="22" rx="11" fill="#0e0a1f" stroke="#4a3a7a" strokeWidth="1.2" />
              <text x="0" y="4" textAnchor="middle" fontSize="10" fontWeight="700" letterSpacing="1.5" fill="#e8d9b8" fontFamily="inherit">
                LEVEL 01
              </text>
            </g>

            {/* Scattered ambient stars/particles around the board */}
            <circle cx="48" cy="60" r="1.6" fill="#fff" opacity="0.5" />
            <circle cx="296" cy="80" r="1.4" fill="#fff" opacity="0.4" />
            <circle cx="60" cy="180" r="1.3" fill="#fff" opacity="0.35" />
            <circle cx="284" cy="190" r="1.6" fill="#fff" opacity="0.45" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
