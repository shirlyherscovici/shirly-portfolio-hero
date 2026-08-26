import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { Gamepad2, ArrowUpRight } from 'lucide-react'
import { GoldCoin, MusicNote, HeartIcon } from '../ui/decor'
import { useParticleBurst } from '../ui/ParticleBurst'
import { playGuitarPluck, playArcadeBlip } from '../../lib/sfx'
import { asset } from '../../lib/asset'
import ComputerMonitorFrame from '../ui/ComputerMonitorFrame'

const tilt = { stiffness: 260, damping: 22 }

function useTiltRef() {
  const ref = useRef<HTMLButtonElement>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), tilt)
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), tilt)
  const onMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  const onMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }
  // Raw normalized (0–1) cursor position within the card — exposed for
  // effects that need actual cursor coordinates rather than the derived
  // tilt springs (e.g. Card 04's coin-repulsion physics).
  return { ref, rotateX, rotateY, mx, my, onMouseMove, onMouseLeave }
}

/* ---------------------------------------------------------------------- */
/* Module 01 — AMY / Graphic Design                                       */
/* ---------------------------------------------------------------------- */

export function AmyModule({ onClick, hidden = false }: { onClick: () => void; hidden?: boolean }) {
  const t = useTiltRef()
  const { spawn, field } = useParticleBurst(6)

  const trigger = () => {
    spawn()
    playGuitarPluck()
  }

  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-amy"
      onClick={() => {
        trigger()
        onClick()
      }}
      onMouseMove={t.onMouseMove}
      onMouseEnter={trigger}
      onMouseLeave={t.onMouseLeave}
      whileHover={hidden ? undefined : { y: -8, scale: 1.035 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className="group relative text-left w-full h-full min-h-[220px] sm:min-h-[240px]"
      aria-label="Open case study 01 — Graphic Design (Amy)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[26px] overflow-visible glass-pearl glass-sheen border-2 border-white/70 shadow-2xl transition-all duration-300 group-hover:shadow-glow-gold group-hover:border-white"
      >
        <div className="absolute inset-0 rounded-[26px] overflow-hidden bg-gradient-to-br from-stone-100 via-[#F9F6F0] to-amber-50" />

        {/* Amy figure — large enough to break out of the card's own top/right
            edges (parent is overflow-visible), sitting on the right so the
            badge/title column on the left stays fully clear. Never nears
            the sticky header above, which stays z-50 regardless. On hover it
            pops further out and up — a real breakout reaction, not a
            barely-there nudge. */}
        <img
          src={asset('/assets/amy/amy-figure-birds-gems.png')}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-8 -right-4 w-[58%] max-w-[186px] h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-110"
        />

        {/* Continuous floating ruby/sparkles — always animating, independent
            of hover, distinct from the interaction particle burst below.
            A red ruby (not the stock blue 💎) to match the gift box & roses. */}
        <motion.span
          aria-hidden
          className="absolute top-[38%] right-[8%] text-base pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute top-[58%] right-[26%] text-sm pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        >
          ✨
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute top-[10%] right-[32%] text-sm pointer-events-none"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 1.1 }}
        >
          ✨
        </motion.span>

        {field}

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5" style={{ transform: 'translateZ(24px)' }}>
          <div className="flex items-center gap-1.5 self-start">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg border border-pearl-ink/15 bg-white/60 text-[10px] font-bold text-pearl-ink">01</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-pearl-sub bg-white/60 border border-pearl-ink/10 px-2.5 py-1 rounded-full">Original Character &amp; Rigging</span>
          </div>
          <h3 className="mt-3 font-display font-extrabold text-xl sm:text-[22px] leading-[1.05] text-pearl-ink">
            GRAPHIC
            <br />
            DESIGN
          </h3>
          <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-pearl-sub max-w-[9.5rem]">
            Character Design · 3D Pop-Art Figure
          </p>

          <div className="mt-auto flex items-end justify-between">
            <div>
              <p
                className="font-display font-black text-4xl sm:text-5xl text-pearl-red leading-none"
                style={{ textShadow: '0 0 20px rgba(176,42,58,0.45), 0 0 40px rgba(176,42,58,0.25)' }}
              >
                +74%
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-pearl-ink/80 mt-1.5">Active User Growth</p>
              {/* Tertiary metadata — kept (per the mockup) but dialed back
                  to a quiet, borderless label so the metric above stays the
                  clear visual anchor rather than competing with it. */}
              <span className="block mt-1 text-[8px] font-semibold uppercase tracking-wide text-pearl-gold2/70">Award-Winning Craft</span>
            </div>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/80 text-pearl-red opacity-0 group-hover:opacity-100 transition-opacity shadow-pearl-sm">
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        <GoldCoin size={26} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow" />
      </motion.div>
    </motion.button>
  )
}

/* ---------------------------------------------------------------------- */
/* Module 02 — GALGALATZ / Game UI UX                                     */
/* ---------------------------------------------------------------------- */

const EQ_BARS = [0.3, 0.55, 0.8, 1, 0.7, 0.9, 0.5, 0.75, 0.4, 0.6, 0.35]
const EQ_COLORS = ['#ff5f7a', '#ff9852', '#ffc93c', '#7cf29c', '#4fd8ff', '#7c9bff', '#b98cff', '#ff5fa0', '#4fd8ff', '#ffc93c', '#7cf29c']

/** Colorful equalizer bars that animate on card hover, layered directly over
 *  the cabinet's own screen area. Bars grow from a shared baseline (like a
 *  real audio visualizer, not a floating block cluster) and blend via
 *  `mix-blend-mode: screen` so their glow reads as native light coming off
 *  the dark screen rather than a flat sticker on top of it. At rest they
 *  sit almost flat, barely visible against the console's own baked-in
 *  waveform art — hover is what makes them pop. */
function EqualizerBars({ active }: { active: boolean }) {
  return (
    <div className="absolute top-[10%] left-[31%] w-[54%] h-[30%] flex items-end justify-center gap-[3.5%] pointer-events-none" style={{ mixBlendMode: 'screen' }}>
      {EQ_BARS.map((h, i) => (
        <motion.span
          key={i}
          className="w-[5%] rounded-full"
          style={{ background: EQ_COLORS[i], boxShadow: active ? `0 0 6px ${EQ_COLORS[i]}` : 'none' }}
          animate={
            active
              ? { height: [`${h * 15}%`, `${h * 100}%`, `${h * 35}%`, `${h * 80}%`, `${h * 20}%`], opacity: [0.7, 1, 0.85, 1, 0.7] }
              : { height: `${h * 10}%`, opacity: 0.35 }
          }
          transition={active ? { duration: 0.9 + i * 0.05, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.4 }}
        />
      ))}
    </div>
  )
}

export function GalgalatzModule({ onClick, hidden = false }: { onClick: () => void; hidden?: boolean }) {
  const t = useTiltRef()
  const [cardHover, setCardHover] = useState(false)
  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-galgalatz"
      onClick={onClick}
      onMouseMove={t.onMouseMove}
      onMouseEnter={() => {
        playArcadeBlip()
        setCardHover(true)
      }}
      onMouseLeave={() => {
        t.onMouseLeave()
        setCardHover(false)
      }}
      whileHover={hidden ? undefined : { y: -8, scale: 1.035 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className="group relative text-left w-full h-full min-h-[220px] sm:min-h-[240px]"
      aria-label="Open case study 02 — Game UI UX Prototyping (Galgalatz)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[26px] overflow-visible bg-[#171426] border-2 border-white/10 shadow-2xl transition-all duration-300 group-hover:shadow-glow-magenta group-hover:border-cine-magenta/60"
      >
        <div className="absolute inset-0 rounded-[26px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0c1a] via-[#171426]/70 to-[#2a1f4d]/40" />
          <div className="absolute inset-0 opacity-40" style={{ background: 'radial-gradient(circle at 75% 20%, rgba(79,216,255,0.35), transparent 55%)' }} />
        </div>

        {/* Real Galgalatz arcade console render — sits on the RIGHT so it
            never obscures the left-aligned text column, enlarged (and
            tight-cropped to its real content bounds, trimming the PNG's own
            huge transparent margins) to match the reference scale, breaking
            the card's bottom/right edges for depth (parent is
            overflow-visible), with a slow idle float plus an intense neon
            pulse on hover. Wrapped together with the equalizer overlay so
            the bars can be positioned as percentages of the console image's
            own box, over its screen area. */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -bottom-4 -right-3 w-[78%] max-w-[230px] aspect-[1002/1133] transition-transform duration-300 group-hover:scale-[1.04]"
        >
          <img
            src={asset('/assets/galgalatz/game-uiux-tight.png')}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_18px_rgba(168,85,247,0.8))_drop-shadow(0_0_32px_rgba(79,216,255,0.45))]"
          />
          <EqualizerBars active={cardHover} />
        </motion.div>

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5 max-w-[47%]" style={{ transform: 'translateZ(24px)' }}>
          <div className="flex items-center gap-1.5 self-start">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg border border-cine-cyan/30 bg-black/40 text-[10px] font-bold text-cine-cyan">02</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-cine-sub bg-black/40 border border-white/10 px-2.5 py-1 rounded-full">UI Architecture &amp; Prototyping</span>
          </div>
          <h3 className="mt-3 font-display font-extrabold text-xl sm:text-[22px] leading-[1.05] text-white">
            GAME UI UX
            <br />
            PROTOTYPING
          </h3>
          <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-cine-sub">Tap. Play. Engage.</p>

          <div className="mt-auto flex items-end justify-between">
            <div>
              <p
                className="font-display font-black text-4xl sm:text-5xl text-gradient-cine leading-none"
                style={{ filter: 'drop-shadow(0 0 16px rgba(79,216,255,0.55)) drop-shadow(0 0 32px rgba(255,95,160,0.3))' }}
              >
                +700%
              </p>
              <p className="text-[10px] font-bold uppercase tracking-wide text-white/90 mt-1.5">Mobile Engagement</p>
              <span className="inline-flex items-center gap-1 mt-1 text-[8px] font-semibold uppercase tracking-wide text-cine-cyan/70">
                <Gamepad2 size={8} /> Interactive Console
              </span>
            </div>
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity border border-white/20">
              <ArrowUpRight size={14} />
            </span>
          </div>
        </div>

        <MusicNote size={18} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" color="#4fd8ff" />
      </motion.div>
    </motion.button>
  )
}

/* ---------------------------------------------------------------------- */
/* Module 03 — AI RESCUE / Generative Pipeline (tall centerpiece)         */
/* ---------------------------------------------------------------------- */

export function AiModule({ onClick, hidden = false }: { onClick: () => void; hidden?: boolean }) {
  const t = useTiltRef()
  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-ai-rescue"
      onClick={onClick}
      onMouseMove={t.onMouseMove}
      onMouseLeave={t.onMouseLeave}
      whileHover={hidden ? undefined : { y: -8, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className="group relative text-left w-full h-full min-h-[380px] sm:min-h-[420px] row-span-2"
      aria-label="Open case study 03 — AI Generative Pipeline"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[26px] overflow-visible bg-black border-2 border-white/10 shadow-2xl transition-all duration-300 group-hover:shadow-glow-cyan group-hover:border-cine-cyan/60"
      >
        {/* Static poster (no autoplaying video on the hub — the real film
            plays inside the case study). Card art already carries the
            "AI GENERATIVE PIPELINE / CINEMATIC SIMULATION" lockup, so the
            heading below is kept for assistive tech only.

            The source poster-ai-homepage.png is a 3840×2160 canvas with its
            actual artwork living in only a ~1626×2144 region — everywhere
            else is transparent-over-black matting. object-position tricks
            on the full canvas could (and did) land the crop window in that
            black margin depending on the card's real aspect ratio. This
            pre-cropped asset (mountain/beacon side only, poster's own
            baked-in pilot excluded so it can't double up with the real
            cutout below) contains nothing but real artwork, so any
            object-cover crop of it is safe. */}
        <div className="absolute inset-0 rounded-[26px] overflow-hidden">
          <img
            src={asset('/assets/navigator/poster-ai-homepage-card.png')}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/35" />
        </div>

        {/* Depth shadow beneath the pilot's boots — deepens on hover to sell
            the tactical "step forward" parallax below. */}
        <motion.div
          aria-hidden
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[42%] max-w-[130px] h-4 rounded-[50%] bg-black/60 blur-md"
          animate={{ opacity: 0.5, scaleX: 1 }}
          whileHover={{ opacity: 0.85, scaleX: 1.15 }}
          transition={{ duration: 0.4 }}
        />

        {/* Pilot figure — tight-cropped to his real silhouette (the source
            PNG's canvas was ~77% empty transparent padding, which made even
            a large percentage-based width render him tiny/faint-looking).
            Bottom-anchored (not vertically centered) — checked against the
            mockup directly: only his boots cross the card's bottom edge,
            his head stays well clear of the top edge/title text instead of
            also breaking out there. z-20 keeps him above the poster/
            gradient but below the headline text. A subtle x/rotate
            parallax on hover reads as a tactical step forward. */}
        <motion.img
          src={asset('/assets/navigator/pilot-cutout-tight.png')}
          alt=""
          aria-hidden
          initial={{ x: '-50%', rotate: 0, opacity: 1 }}
          whileHover={{ x: '-53%', rotate: -3 }}
          transition={{ type: 'spring', stiffness: 220, damping: 16 }}
          className="absolute left-1/2 bottom-[-3%] z-20 h-[92%] w-auto max-w-none object-contain opacity-100"
          style={{
            filter:
              'contrast(1.15) brightness(1.08) drop-shadow(0 12px 20px rgba(0,0,0,0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))',
          }}
        />

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-6" style={{ transform: 'translateZ(24px)' }}>
          {/* "AI / Generative Pipeline / Cinematic Simulation" — the mockup's
              own 3-line hierarchy (big label, big label, smaller caption)
              rather than a single collapsed headline. */}
          <div className="flex items-center gap-1.5 self-start">
            <span className="flex items-center justify-center w-6 h-6 rounded-lg border border-white/25 bg-black/40 text-[10px] font-bold text-white">03</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-white/80 bg-black/40 border border-white/15 px-2.5 py-1 rounded-full">Generative Pipeline &amp; Compositing</span>
          </div>
          <h3
            className="mt-3 font-display font-extrabold text-lg sm:text-xl leading-[1.05] text-white tracking-tight"
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}
          >
            AI
            <br />
            GENERATIVE PIPELINE
          </h3>
          <p
            className="mt-1 text-[10.5px] font-semibold uppercase tracking-wide text-white/80"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            Cinematic Simulation
          </p>

        </div>
      </motion.div>
    </motion.button>
  )
}

/* ---------------------------------------------------------------------- */
/* Module 04 — PEOPLE IN MOTION / After Effects (tall)                    */
/* ---------------------------------------------------------------------- */

const TETRIS_BLOCKS = [
  { left: '6%', color: '#4fd8ff', delay: 0 },
  { left: '22%', color: '#ffc93c', delay: 0.08 },
  { left: '38%', color: '#ff5fa0', delay: 0.16 },
  { left: '54%', color: '#7cf29c', delay: 0.24 },
  { left: '70%', color: '#b98cff', delay: 0.32 },
  { left: '86%', color: '#ff9852', delay: 0.4 },
]

/** Colorful translucent blocks that drop in from the top and stack along
 *  the card's own bottom border — mounted only while the card is hovered. */
function TetrisRain({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 rounded-[26px] overflow-hidden pointer-events-none" aria-hidden>
      {TETRIS_BLOCKS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute bottom-2 w-5 h-5 sm:w-6 sm:h-6 rounded-[4px] border border-black/10 shadow-sm"
          style={{ left: b.left, backgroundColor: b.color, opacity: 0.8 }}
          initial={{ y: -160, opacity: 0, rotate: -8 }}
          animate={{ y: 0, opacity: 0.85, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 15, delay: b.delay }}
        />
      ))}
    </div>
  )
}

// Base positions sit slightly OUTSIDE the 0–1 card box (negative / >1
// fractions) so the coins & hearts rest astride the card's own border at
// all times — not just when the repulsion physics pushes them there.
const COINS = [
  { base: { x: -0.04, y: 0.12 }, size: 22, delay: 0, glyph: 'coin' as const },
  { base: { x: 1.03, y: 0.08 }, size: 20, delay: 0.4, glyph: 'heart' as const },
  { base: { x: -0.05, y: 0.82 }, size: 20, delay: 0.8, glyph: 'coin' as const },
  { base: { x: 1.04, y: 0.78 }, size: 24, delay: 1.2, glyph: 'coin' as const },
  { base: { x: 0.5, y: -0.05 }, size: 18, delay: 1.6, glyph: 'heart' as const },
]

/** A gold coin (or heart) that idly bobs in place, and springs further away
 *  from the cursor whenever it gets close — cheap vector-repulsion physics
 *  driven by the card's own normalized (0–1) mouse-position motion values. */
function FleeingCoin({
  mx,
  my,
  base,
  size,
  delay,
  glyph = 'coin',
}: {
  mx: MotionValue<number>
  my: MotionValue<number>
  base: { x: number; y: number }
  size: number
  delay: number
  glyph?: 'coin' | 'heart'
}) {
  const offsetX = useTransform([mx, my], (latest) => {
    const [cx, cy] = latest as number[]
    const dx = base.x - cx
    const dy = base.y - cy
    const dist = Math.hypot(dx, dy) || 0.0001
    const force = Math.max(0, 1 - dist / 0.32)
    return (dx / dist) * force * 46
  })
  const offsetY = useTransform([mx, my], (latest) => {
    const [cx, cy] = latest as number[]
    const dx = base.x - cx
    const dy = base.y - cy
    const dist = Math.hypot(dx, dy) || 0.0001
    const force = Math.max(0, 1 - dist / 0.32)
    return (dy / dist) * force * 46
  })
  const springX = useSpring(offsetX, { stiffness: 260, damping: 18 })
  const springY = useSpring(offsetY, { stiffness: 260, damping: 18 })

  return (
    <motion.div
      aria-hidden
      className="absolute z-50 pointer-events-none"
      style={{ left: `${base.x * 100}%`, top: `${base.y * 100}%`, x: springX, y: springY }}
    >
      <motion.div animate={{ y: [0, -7, 0], rotate: [0, 6, -6, 0] }} transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}>
        {glyph === 'coin' ? <GoldCoin size={size} /> : <HeartIcon size={size} color="#ff9db0" />}
      </motion.div>
    </motion.div>
  )
}

export function MotionModule({ onClick, hidden = false }: { onClick: () => void; hidden?: boolean }) {
  const t = useTiltRef()
  const [cardHover, setCardHover] = useState(false)
  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-people-motion"
      onClick={onClick}
      onMouseMove={t.onMouseMove}
      onMouseEnter={() => setCardHover(true)}
      onMouseLeave={() => {
        t.onMouseLeave()
        setCardHover(false)
      }}
      whileHover={hidden ? undefined : { y: -8, scale: 1.025 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className="group relative text-left w-full h-full min-h-[420px] sm:min-h-[480px] row-span-2"
      aria-label="Open case study 04 — After Effects & Animation (People in Motion)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d', background: 'linear-gradient(135deg, #FFF0EB, #FCE7F3)' }}
        className="relative w-full h-full rounded-[26px] overflow-visible glass-sheen backdrop-blur-xl border-2 border-white/70 shadow-2xl flex flex-col transition-all duration-300 group-hover:shadow-glow-gold group-hover:border-white"
      >
        {/* Fleeing coins & hearts — rest astride the card's own border,
            dodge the cursor, z-50 so they always read above the frame */}
        {COINS.map((c, i) => (
          <FleeingCoin key={i} mx={t.mx} my={t.my} base={c.base} size={c.size} delay={c.delay} glyph={c.glyph} />
        ))}

        {/* z-20 — explicitly above the monitor "Bottom stage" panel (z-10)
            below, so the falling blocks land ON TOP OF and around the
            screen container instead of painting underneath it. */}
        <div className="absolute inset-0 z-20 rounded-[26px] overflow-hidden pointer-events-none">
          <TetrisRain active={cardHover} />
        </div>

        <div className="relative z-10 p-4 sm:p-5 pb-2" style={{ transform: 'translateZ(24px)' }}>
          <div className="flex items-center gap-1.5 self-start">
            <span className="flex items-center justify-center h-6 px-1.5 rounded-lg border border-pearl-ink/15 bg-white/60 text-[9px] font-bold text-pearl-ink">STAGE 04</span>
            <span className="text-[9px] font-semibold uppercase tracking-wide text-pearl-sub bg-white/60 border border-pearl-ink/10 px-2.5 py-1 rounded-full">Original Art &amp; Rigging</span>
          </div>
          <h3 className="mt-3 font-display font-extrabold text-xl sm:text-[22px] leading-[1.05] text-pearl-ink">
            AFTER EFFECTS
            <br />& ANIMATION
          </h3>
          <p className="mt-1.5 text-[10.5px] font-semibold uppercase tracking-wide text-pearl-sub">2D Worlds. Motion Design.</p>
        </div>

        {/* Bottom stage — a small computer-monitor mockup showing a static
            preview frame from the real "ACA ANASHIM" motion piece (the same
            video the case study plays), whose top-right corner deliberately
            pokes past the card's own edge (negative margins here, parent is
            overflow-visible) rather than sitting fully inset like a normal
            panel. */}
        <div className="relative z-10 flex-1 ml-3 mb-3 -mr-1.5 sm:ml-4 sm:mb-4 sm:-mr-2 rounded-2xl overflow-hidden bg-gradient-to-b from-[#e88a9a] to-[#c9576b] border border-white/50 shadow-lg flex items-center px-3 sm:px-4">
          <ComputerMonitorFrame compact>
            <img src={asset('/assets/motion/aca-anashim-poster.jpg')} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
          </ComputerMonitorFrame>
        </div>
      </motion.div>
    </motion.button>
  )
}
