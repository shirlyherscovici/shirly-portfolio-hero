import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { asset } from '../../lib/asset'

// The real supplied diorama artwork, split into two layers so the pawn can
// actually move: `-board` is the platform/tiles/gem/coin/flag with the
// original baked-in pawn erased (patched over with a same-size sample of
// clean tile, feathered at the edges so there's no visible seam), and
// `-pawn` is that same pawn+ring cut out on its own with a soft alpha-
// feathered edge, free to be repositioned. Both crops were made pixel-exact
// against the source PNG (see git history) — no part of the supplied art
// was redrawn, only rearranged.
const BOARD_SRC = asset('/assets/hub/hero-game-diorama-board.png')
const PAWN_SRC = asset('/assets/hub/hero-game-diorama-pawn.png')

// Native pixel size of the source diorama PNG — the board wrapper is locked
// to this aspect ratio so the pawn's percentage-based waypoints line up
// exactly regardless of the rendered size.
const IMG_W = 1448
const IMG_H = 1086

// The pawn's own crop size within that same pixel space (used to size the
// overlay proportionally to the board beneath it).
const PAWN_W = 250
const PAWN_H = 205

export type ActiveProject = 1 | 2 | 3 | 4

// Four tile positions along the diorama's own path, mapped to the four
// homepage project cards in reading order (01 Game UI, 02 Motion, 03 AI, 04
// Art Direction). Project 1's waypoint is the pawn's original baked-in
// spot, so at rest the board looks completely untouched. Coordinates are
// percentages of the full board image, picked by eye off the source art's
// own path tiles.
const WAYPOINTS: Record<ActiveProject, { x: number; y: number }> = {
  1: { x: 36.95, y: 50.18 },
  2: { x: 34.53, y: 39.59 },
  3: { x: 44.89, y: 27.62 },
  4: { x: 57.32, y: 36.83 },
}

/** The hero's real game-board illustration (supplied art, not a CSS/SVG
 *  recreation) — a floating isometric mini level with tiles, a path, a
 *  crystal, a coin, a pawn marker and a checkpoint flag. It floats free
 *  with no card/container, tilting gently toward the cursor (max ~3deg)
 *  and drifting in a slow idle bob, with a thin purple neon line blooming
 *  around the platform's rim on hover and a soft glow beneath it. The pawn
 *  itself is interactive: it slides to a different tile depending on
 *  `activeProject`, which the homepage drives from whichever project card
 *  is currently hovered — "which world" the piece is standing in. Respects
 *  prefers-reduced-motion: idle float and hover tilt both drop out, and the
 *  pawn's move becomes a quick cut instead of a spring slide. */
export default function HeroDiorama({ activeProject = 1 }: { activeProject?: ActiveProject }) {
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

  const wp = WAYPOINTS[activeProject]
  const pawnWidthPct = (PAWN_W / IMG_W) * 100

  return (
    <div className="relative select-none w-full max-w-[560px] group" style={{ perspective: 1200 }}>
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
          <div className="relative w-full" style={{ aspectRatio: `${IMG_W}/${IMG_H}` }}>
            <img
              src={BOARD_SRC}
              alt="An isometric mini game level — a winding tile path, a floating crystal, a gold coin and a checkpoint flag on a purple floating platform"
              className="absolute inset-0 w-full h-full object-contain"
              style={{ filter: 'drop-shadow(0 30px 45px rgba(0,0,0,0.55))' }}
              draggable={false}
            />

            {/* Thin purple neon rim line — traces the platform's own edge,
                invisible at rest, blooms in on hover of the whole diorama. */}
            <svg
              viewBox={`0 0 ${IMG_W} ${IMG_H}`}
              className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none"
              aria-hidden
            >
              <ellipse
                cx={IMG_W * 0.478}
                cy={IMG_H * 0.565}
                rx={IMG_W * 0.415}
                ry={IMG_H * 0.225}
                fill="none"
                stroke="#c9a6ff"
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0 0 6px #b98cff) drop-shadow(0 0 14px #8b5cf6)' }}
              />
            </svg>

            {/* The interactive pawn — slides between tiles as the hovered
                project card (activeProject) changes. */}
            <motion.img
              src={PAWN_SRC}
              alt=""
              aria-hidden
              className="absolute pointer-events-none"
              style={{ width: `${pawnWidthPct}%`, aspectRatio: `${PAWN_W}/${PAWN_H}`, filter: 'drop-shadow(0 10px 14px rgba(0,0,0,0.5))' }}
              animate={{ left: `${wp.x}%`, top: `${wp.y}%`, x: '-50%', y: '-50%' }}
              transition={prefersReduced ? { duration: 0.15 } : { type: 'spring', stiffness: 130, damping: 15 }}
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
