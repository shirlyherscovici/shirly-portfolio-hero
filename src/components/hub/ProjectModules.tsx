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

export function AmyModule({
  onClick,
  hidden = false,
  dark = false,
  compact = false,
}: {
  onClick: () => void
  hidden?: boolean
  dark?: boolean
  compact?: boolean
}) {
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
      className={`group relative text-left w-full h-full ${compact ? 'min-h-[240px] sm:min-h-[280px]' : 'min-h-[220px] sm:min-h-[240px]'}`}
      aria-label="Open case study 01 — Graphic Design (Amy)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className={`relative w-full h-full rounded-[26px] overflow-visible glass-sheen border-2 shadow-2xl transition-all duration-300 group-hover:shadow-glow-red ${
          dark ? 'border-pearl-red/20 group-hover:border-pearl-red/50' : 'glass-pearl border-pearl-red/15 group-hover:border-pearl-red/40'
        }`}
      >
        <div
          className={`absolute inset-0 rounded-[26px] overflow-hidden ${
            dark ? 'bg-gradient-to-br from-[#2a1420] to-[#140a10]' : 'bg-gradient-to-br from-stone-100 via-[#F9F6F0] to-rose-50'
          }`}
        />

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
          className={`pointer-events-none absolute -top-8 -right-4 h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-110 ${
            compact ? 'w-[52%] max-w-[150px]' : 'w-[58%] max-w-[186px]'
          }`}
        />

        {/* One quiet floating ruby (was 3 sparkles+heart) — "fewer floating
            elements, clear depth" per explicit request; this one sits
            behind the figure's own silhouette, low-key rather than busy. */}
        <motion.span
          aria-hidden
          className="absolute top-[42%] right-[10%] text-sm pointer-events-none z-0"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          ❤️
        </motion.span>

        {field}

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5" style={{ transform: 'translateZ(24px)' }}>
          <span className={`text-[9px] font-bold ${dark ? 'text-white/50' : 'text-pearl-sub/70'}`}>04</span>
          <h3 className={`mt-1 font-display font-extrabold leading-[1.05] ${compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-[22px]'} ${dark ? 'text-white' : 'text-pearl-ink'}`}>
            VISUAL SYSTEMS
            <br />& ART DIRECTION
          </h3>
          {!compact && (
            <p className={`mt-1.5 text-[10.5px] font-semibold uppercase tracking-wide max-w-[9.5rem] ${dark ? 'text-white/60' : 'text-pearl-sub'}`}>
              Character Design · 3D Pop-Art Figure
            </p>
          )}
          {compact && (
            <p className={`mt-1.5 text-[10px] max-w-[10rem] ${dark ? 'text-white/60' : 'text-pearl-sub'}`}>
              Crafting bold visual identities and cohesive art direction that bring worlds to life.
            </p>
          )}

          <div className="mt-auto flex items-end justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-display font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all border border-pearl-red/30 text-pearl-red">
              Explore <ArrowUpRight size={11} />
            </span>
            <span
              className={`flex items-center justify-center w-8 h-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-pearl-sm ${
                dark ? 'bg-white/10 text-white' : 'bg-white/80 text-pearl-red'
              }`}
            >
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

export function GalgalatzModule({ onClick, hidden = false, featured = false }: { onClick: () => void; hidden?: boolean; featured?: boolean }) {
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
      whileHover={hidden ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className={`group relative text-left w-full h-full ${featured ? 'min-h-[420px] sm:min-h-[480px]' : 'min-h-[220px] sm:min-h-[240px]'}`}
      aria-label="Open case study 02 — Game UI UX Prototyping (Galgalatz)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[26px] overflow-visible bg-[#171426] border-2 border-[#6d4fc9]/35 shadow-2xl transition-all duration-300 group-hover:shadow-glow-magenta group-hover:border-cine-magenta/60"
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
            own box, over its screen area. Scaled up further when featured
            (the big bento card) so it still reads as the dominant visual
            at that size, not a small icon lost in extra space. */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className={`pointer-events-none absolute -bottom-4 -right-3 aspect-[1002/1133] transition-transform duration-300 group-hover:scale-[1.04] ${
            featured ? 'w-[86%] max-w-[380px]' : 'w-[78%] max-w-[230px]'
          }`}
        >
          <img
            src={asset('/assets/galgalatz/game-uiux-tight.png')}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-contain drop-shadow-2xl transition-[filter] duration-300 group-hover:[filter:drop-shadow(0_0_18px_rgba(168,85,247,0.8))_drop-shadow(0_0_32px_rgba(79,216,255,0.45))]"
          />
          <EqualizerBars active={cardHover} />
        </motion.div>

        <div className={`relative z-10 flex flex-col h-full p-4 sm:p-5 ${featured ? 'lg:p-7 max-w-[62%] sm:max-w-[52%]' : 'max-w-[47%]'}`} style={{ transform: 'translateZ(24px)' }}>
          <span className="inline-flex items-center gap-1.5 self-start text-[9px] font-bold text-cine-cyan/80">
            <Gamepad2 size={11} /> 01
          </span>
          <h3 className={`mt-1.5 font-display font-extrabold leading-[1.05] text-white ${featured ? 'text-2xl sm:text-3xl lg:text-[2.1rem]' : 'text-xl sm:text-[22px]'}`}>
            GAME UI &amp; UX
            <br />
            PROTOTYPING
          </h3>
          <p className={`mt-1.5 text-cine-sub ${featured ? 'text-[11px] sm:text-xs max-w-[15rem]' : 'text-[10.5px] font-semibold uppercase tracking-wide'}`}>
            {featured
              ? 'Designing intuitive, delightful and data-driven game interfaces that drive engagement and retention.'
              : 'Tap. Play. Engage.'}
          </p>

          <div className="mt-auto">
            <p
              className={`font-display font-black text-gradient-cine leading-none ${featured ? 'text-5xl sm:text-6xl' : 'text-4xl sm:text-5xl'}`}
              style={{ filter: 'drop-shadow(0 0 16px rgba(79,216,255,0.55)) drop-shadow(0 0 32px rgba(255,95,160,0.3))' }}
            >
              +700%
            </p>
            <p className="text-[10px] font-bold uppercase tracking-wide text-white/90 mt-1.5">Mobile Engagement Boost</p>

            <span className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-display font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 group-hover:bg-white/15 transition-all">
              Explore Project <ArrowUpRight size={12} />
            </span>
          </div>
        </div>

        <MusicNote size={featured ? 22 : 18} className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" color="#4fd8ff" />
      </motion.div>
    </motion.button>
  )
}

/* ---------------------------------------------------------------------- */
/* Module 03 — AI RESCUE / Generative Pipeline (tall centerpiece)         */
/* ---------------------------------------------------------------------- */

export function AiModule({ onClick, hidden = false, compact = false }: { onClick: () => void; hidden?: boolean; compact?: boolean }) {
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
      className={`group relative text-left w-full h-full ${compact ? 'min-h-[240px] sm:min-h-[280px]' : 'min-h-[380px] sm:min-h-[420px] row-span-2'}`}
      aria-label="Open case study 03 — AI Generative Pipeline"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[26px] overflow-visible bg-black border-2 border-cine-cyan/25 shadow-2xl transition-all duration-300 group-hover:shadow-glow-cyan group-hover:border-cine-cyan/60"
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
            also breaking out there (shortened further so there's real
            clearance under the headline). z-20 keeps him above the poster/
            gradient but below the headline text. A slow idle bob reads as
            a soft footstep cadence (a real walk-cycle isn't possible from
            one static cutout); a subtle x/rotate parallax on hover reads
            as a tactical step forward. */}
        <motion.img
          src={asset('/assets/navigator/pilot-cutout-tight.png')}
          alt=""
          aria-hidden
          initial={{ x: '-50%', rotate: 0, opacity: 1 }}
          animate={{ x: '-50%', y: [0, -5, 0] }}
          whileHover={{ x: '-53%', rotate: -3, y: 0 }}
          transition={{ y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, x: { type: 'spring', stiffness: 220, damping: 16 }, rotate: { type: 'spring', stiffness: 220, damping: 16 } }}
          className={`absolute left-1/2 bottom-[-3%] z-20 w-auto max-w-none object-contain opacity-100 ${compact ? 'h-[58%]' : 'h-[72%]'}`}
          style={{
            filter:
              'contrast(1.15) brightness(1.08) drop-shadow(0 12px 20px rgba(0,0,0,0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))',
          }}
        />

        <div className={`relative z-10 flex flex-col h-full ${compact ? 'p-4' : 'p-4 sm:p-6'}`} style={{ transform: 'translateZ(24px)' }}>
          <span className="inline-flex items-center gap-1.5 self-start text-[9px] font-bold text-cine-cyan/80">03</span>
          <h3
            className={`mt-1 font-display font-extrabold leading-[1.05] text-white tracking-tight ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}
          >
            CINEMATIC AI
            <br />
            PROTOTYPING
          </h3>
          {!compact && (
            <p
              className="mt-1.5 text-[10px] text-white/75 max-w-[13rem]"
              style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
            >
              AI-powered cinematic prototypes with story, realism and emotional impact at scale.
            </p>
          )}

          <span className="mt-auto self-start inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 border border-white/20 text-white text-[9px] font-display font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 group-hover:bg-white/15 transition-all">
            Explore <ArrowUpRight size={11} />
          </span>
        </div>
      </motion.div>
    </motion.button>
  )
}

/* ---------------------------------------------------------------------- */
/* Module 04 — PEOPLE IN MOTION / After Effects (tall)                    */
/* ---------------------------------------------------------------------- */

// Keyframe diamonds read as "small colored squares" to anyone who hasn't
// used After Effects — squash-and-stretch is the one animation principle
// that reads as "motion design" to literally everyone at a glance: a ball
// flattening on impact and stretching mid-air is the textbook demo every
// animation course opens with.
const BALLS = [
  { left: '18%', color: '#ffc93c', delay: 0 },
  { left: '48%', color: '#ff5f7a', delay: 0.35 },
  { left: '78%', color: '#4fd8ff', delay: 0.7 },
]

/** Three balls squash-and-stretch bouncing along the card's own bottom
 *  border — mounted only while the card is hovered. */
function TetrisRain({ active }: { active: boolean }) {
  if (!active) return null
  return (
    <div className="absolute inset-0 rounded-[26px] overflow-hidden pointer-events-none" aria-hidden>
      <span className="absolute bottom-3 left-[10%] right-[10%] h-px bg-white/20" />
      {BALLS.map((b, i) => (
        <motion.span
          key={i}
          className="absolute bottom-3 w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm"
          style={{ left: b.left, backgroundColor: b.color }}
          initial={{ y: -70 }}
          animate={{
            y: [-70, 0, -30, 0, -12, 0],
            scaleX: [1, 1.5, 1, 1.3, 1, 1.15],
            scaleY: [1, 0.6, 1, 0.75, 1, 0.88],
          }}
          transition={{ duration: 1.4, times: [0, 0.35, 0.5, 0.72, 0.83, 1], delay: b.delay, ease: 'easeIn' }}
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

export function MotionModule({
  onClick,
  hidden = false,
  dark = false,
  wide = false,
}: {
  onClick: () => void
  hidden?: boolean
  dark?: boolean
  wide?: boolean
}) {
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
      whileHover={hidden ? undefined : { y: -8, scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className={`group relative text-left w-full h-full ${wide ? 'min-h-[200px] sm:min-h-[220px]' : 'min-h-[420px] sm:min-h-[480px] row-span-2'}`}
      aria-label="Open case study 04 — After Effects & Animation (People in Motion)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      <motion.div
        style={{
          rotateX: t.rotateX,
          rotateY: t.rotateY,
          transformStyle: 'preserve-3d',
          background: wide
            ? dark
              ? 'linear-gradient(135deg, #2b1d10, #1a1108)'
              : 'linear-gradient(135deg, #FFF3E0, #FDE9C8)'
            : dark
              ? 'linear-gradient(135deg, #241522, #150c17)'
              : 'linear-gradient(135deg, #FFF0EB, #FCE7F3)',
        }}
        className={`relative w-full h-full rounded-[26px] overflow-visible glass-sheen backdrop-blur-xl border-2 shadow-2xl transition-all duration-300 group-hover:shadow-glow-gold ${
          wide ? 'flex flex-col sm:flex-row sm:items-center' : 'flex flex-col'
        } ${
          wide
            ? dark
              ? 'border-pearl-gold2/30 group-hover:border-pearl-gold2/60'
              : 'border-pearl-gold/40 group-hover:border-pearl-gold2/70'
            : dark
              ? 'border-white/10 group-hover:border-white/30'
              : 'border-white/70 group-hover:border-white'
        }`}
      >
        {/* Fleeing coins & hearts — rest astride the card's own border,
            dodge the cursor, z-50 so they always read above the frame.
            Trimmed to 3 (was 5) for the wide layout — "fewer floating
            elements, clear depth" per explicit request. */}
        {(wide ? COINS.slice(0, 3) : COINS).map((c, i) => (
          <FleeingCoin key={i} mx={t.mx} my={t.my} base={c.base} size={c.size} delay={c.delay} glyph={c.glyph} />
        ))}

        {/* z-20 — explicitly above the monitor "Bottom stage" panel (z-10)
            below, so the falling blocks land ON TOP OF and around the
            screen container instead of painting underneath it. */}
        <div className="absolute inset-0 z-20 rounded-[26px] overflow-hidden pointer-events-none">
          <TetrisRain active={cardHover} />
        </div>

        <div className={`relative z-10 ${wide ? 'p-4 sm:p-5 sm:w-[34%] sm:shrink-0' : 'p-4 sm:p-5 pb-2'}`} style={{ transform: 'translateZ(24px)' }}>
          <span className={`text-[9px] font-bold ${dark ? 'text-white/50' : 'text-pearl-sub/70'}`}>02</span>
          <h3 className={`mt-1 font-display font-extrabold leading-[1.05] ${wide ? 'text-lg sm:text-xl' : 'text-xl sm:text-[22px]'} ${dark ? 'text-white' : 'text-pearl-ink'}`}>
            {wide ? (
              <>
                PLAYABLE MOTION
                <br />& GAMIFICATION
              </>
            ) : (
              <>
                AFTER EFFECTS
                <br />& ANIMATION
              </>
            )}
          </h3>
          <p className={`mt-1.5 ${wide ? 'text-[10px] max-w-[13rem]' : 'text-[10.5px] font-semibold uppercase tracking-wide'} ${dark ? 'text-white/60' : 'text-pearl-sub'}`}>
            {wide ? 'Turning ideas into playable motion experiences that teach, reward and keep players coming back.' : '2D Worlds. Motion Design.'}
          </p>
          {wide && (
            <span className="hidden sm:inline-flex mt-3 items-center gap-1.5 px-3 py-1.5 rounded-full text-[9px] font-display font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-all border border-pearl-gold2/40 text-pearl-gold2">
              Explore Project <ArrowUpRight size={11} />
            </span>
          )}
        </div>

        {/* The real "ACA ANASHIM" motion piece poster — full-bleed banner
            filling the rest of the wide card (was a small inset monitor
            mockup in the tall layout; here it IS the dominant visual,
            matching the mockup's own full-width desert/brand-logos scene). */}
        <div
          className={
            wide
              ? 'relative z-10 flex-1 h-full min-h-[140px] sm:min-h-0 mx-3 mb-3 sm:mx-0 sm:my-3 sm:mr-3 rounded-2xl overflow-hidden border border-white/50 shadow-lg'
              : 'relative z-10 flex-1 ml-3 mb-3 -mr-1.5 sm:ml-4 sm:mb-4 sm:-mr-2 rounded-2xl overflow-hidden bg-gradient-to-b from-[#e88a9a] to-[#c9576b] border border-white/50 shadow-lg flex items-center px-3 sm:px-4'
          }
        >
          {wide ? (
            <img
              src={asset('/assets/motion/aca-anashim-poster.jpg')}
              alt=""
              aria-hidden
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <ComputerMonitorFrame compact>
              <img src={asset('/assets/motion/aca-anashim-poster.jpg')} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
            </ComputerMonitorFrame>
          )}
        </div>
      </motion.div>
    </motion.button>
  )
}
