import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { GoldCoin, MusicNote, HeartIcon } from '../ui/decor'
import FloatingElement from '../ui/FloatingElement'
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

/** Big colored digit badge — matches the approved mockup's per-project
 *  numbering exactly (large, bold, tinted to that project's own color),
 *  replacing the old tiny gray "01"-style label. */
function NumberBadge({ n, color, glow }: { n: string; color: string; glow: string }) {
  return (
    <span
      className="block font-display font-black leading-none text-3xl sm:text-4xl"
      style={{ color, textShadow: `0 0 22px ${glow}` }}
    >
      {n}
    </span>
  )
}

/** Common "Explore Project" pill — always visible (not hover-gated) per the
 *  approved mockup, which shows every card's CTA at rest; touch devices
 *  never hover, so a hover-only reveal effectively hid it from them too. */
function ExploreButton({ label = 'Explore Project', tone }: { label?: string; tone: string }) {
  return (
    <span
      className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-[10px] font-display font-bold uppercase tracking-wide border transition-colors"
      style={{ color: tone, borderColor: `${tone}55`, background: `${tone}14` }}
    >
      {label} <ArrowUpRight size={12} />
    </span>
  )
}

/** Shared "which world is the hero diorama's pawn standing in" hooks — each
 *  module fires onActivate on hover/focus (the pawn slides to that card's
 *  own tile) and onDeactivate on mouse-leave (the pawn returns to its
 *  resting tile, project 1). Optional so every module still works stand-
 *  alone without a parent wired up to receive them. */
interface ActivationProps {
  onActivate?: () => void
  onDeactivate?: () => void
}

/* ---------------------------------------------------------------------- */
/* Module 01 — AMY / Graphic Design                                       */
/* ---------------------------------------------------------------------- */

export function AmyModule({
  onClick,
  hidden = false,
  compact = false,
  onActivate,
  onDeactivate,
}: {
  onClick: () => void
  hidden?: boolean
  compact?: boolean
} & ActivationProps) {
  const t = useTiltRef()
  const { spawn, field } = useParticleBurst(6)

  const trigger = () => {
    spawn()
    playGuitarPluck()
    onActivate?.()
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
      onMouseLeave={() => {
        t.onMouseLeave()
        onDeactivate?.()
      }}
      whileHover={hidden ? undefined : { y: -8, scale: 1.035 }}
      transition={{ type: 'spring', stiffness: 300, damping: 22 }}
      animate={{ opacity: hidden ? 0 : 1 }}
      style={{ perspective: 1000, pointerEvents: hidden ? 'none' : 'auto' }}
      className={`group relative text-left w-full h-full ${compact ? 'min-h-[240px] sm:min-h-[280px]' : 'min-h-[220px] sm:min-h-[240px]'}`}
      aria-label="Open case study 01 — Graphic Design (Amy)"
      aria-hidden={hidden}
      tabIndex={hidden ? -1 : 0}
    >
      {/* Fixed light/pastel identity regardless of the site-wide dark
          toggle — matches the approved mockup, which keeps this card's own
          gift-box world pale and warm no matter the page theme (same
          treatment as Motion's card below). */}
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className="relative w-full h-full rounded-[26px] overflow-visible glass-sheen border-2 border-pearl-red/15 shadow-2xl transition-all duration-300 group-hover:shadow-glow-red group-hover:border-pearl-red/40"
      >
        <div className="absolute inset-0 rounded-[26px] overflow-hidden bg-gradient-to-br from-stone-100 via-[#F9F6F0] to-rose-50" />

        {/* Amy figure — enlarged so she reads as the dominant visual (per
            explicit "more prominent, like the mockup" feedback), breaking
            out of the card's own top/right edges (parent is
            overflow-visible). Never nears the sticky header above, which
            stays z-50 regardless. On hover she pops further out and up. */}
        <img
          src={asset('/assets/amy/amy-figure-birds-gems.png')}
          alt=""
          aria-hidden
          className="pointer-events-none absolute -top-10 -right-5 h-auto object-contain drop-shadow-xl transition-transform duration-300 group-hover:-translate-y-3 group-hover:scale-110 w-[72%] max-w-[220px]"
        />

        {/* Two real rose petals (the same supplied asset used in her case
            study, not a hand-drawn stand-in) floating with a slow bob —
            "the roses should float like in the mockup". */}
        <FloatingElement delay={0.2} distance={9} duration={4.2} fleeTo={{ x: -14, y: -10 }} className="absolute top-[8%] left-[4%] z-0">
          <img src={asset('/assets/amy/rose-1.png')} alt="" aria-hidden className="w-9 sm:w-11 h-auto opacity-90 drop-shadow" />
        </FloatingElement>
        <FloatingElement delay={1.1} distance={7} duration={5} fleeTo={{ x: 14, y: 10 }} className="absolute bottom-[10%] left-[8%] z-0">
          <img src={asset('/assets/amy/rose-1.png')} alt="" aria-hidden className="w-7 sm:w-9 h-auto opacity-80 drop-shadow rotate-[24deg]" />
        </FloatingElement>

        {field}

        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5" style={{ transform: 'translateZ(24px)' }}>
          <NumberBadge n="04" color="#ff5f7a" glow="rgba(255,95,122,0.5)" />
          <h3 className={`mt-1 font-display font-extrabold leading-[1.05] text-pearl-ink ${compact ? 'text-lg sm:text-xl' : 'text-xl sm:text-[22px]'}`}>
            VISUAL SYSTEMS
            <br />& ART DIRECTION
          </h3>
          <p className={`mt-1.5 text-pearl-sub ${compact ? 'text-[10px] max-w-[10.5rem]' : 'text-[10.5px] font-semibold uppercase tracking-wide'}`}>
            {compact
              ? 'Crafting bold visual identities and cohesive art direction that bring worlds and brands to life.'
              : 'Character Design · 3D Pop-Art Figure'}
          </p>

          <div className="mt-auto">
            <ExploreButton tone="#b02a3a" />
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

/** The real cabinet + phone scene, reusing the exact pixel-measured
 *  percentages from the Galgalatz case study itself (glass display case on
 *  the left half, the real photographed phone on the right, its screen
 *  overlaid with the real key-art banner) — same assets, same coordinates,
 *  just without the case study's interactive chrome (nav arrows, active
 *  highlight). This replaces the old arcade-console render as the card's
 *  dominant visual: "the phone big and breaking out", per explicit
 *  feedback, matching the approved mockup's own card 01 art. */
function GalgalatzArt() {
  return (
    <div className="relative w-full" style={{ aspectRatio: '765 / 680' }}>
      <div className="absolute inset-y-0 left-0" style={{ width: '50%' }}>
        <img
          src={asset('/assets/galgalatz/neon-box-tight.png')}
          alt=""
          aria-hidden
          className="w-full h-full object-contain drop-shadow-2xl"
        />
      </div>
      <div className="absolute" style={{ left: '60%', right: '0%', top: '0%', bottom: '0%' }}>
        <div className="relative h-full">
          <div className="relative w-full" style={{ aspectRatio: '617 / 1326' }}>
            <img
              src={asset('/assets/galgalatz/glaglatz-phones.png')}
              alt="A phone showing the Galgalatz key art, next to its real 3D glass display case with the same neon 'Music From The Screen' branding, popcorn, film strip and clapperboard"
              className="absolute pointer-events-none select-none drop-shadow-2xl"
              style={{ width: '176.1%', maxWidth: 'none', left: '-40%', top: '-1%' }}
            />
            <div
              className="absolute overflow-hidden rounded-[8px]"
              style={{ left: '11.5%', top: '6%', width: '78.5%', height: '87%', transform: 'rotate(-0.5deg)' }}
            >
              <img src={asset('/assets/galgalatz/banner-cover.jpg')} alt="" aria-hidden className="absolute inset-0 w-full h-full object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function GalgalatzModule({
  onClick,
  hidden = false,
  featured = false,
  onActivate,
  onDeactivate,
}: {
  onClick: () => void
  hidden?: boolean
  featured?: boolean
} & ActivationProps) {
  const t = useTiltRef()
  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-galgalatz"
      onClick={onClick}
      onMouseMove={t.onMouseMove}
      onMouseEnter={() => {
        playArcadeBlip()
        onActivate?.()
      }}
      onMouseLeave={() => {
        t.onMouseLeave()
        onDeactivate?.()
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

        {/* Real cabinet + phone scene — sits on the RIGHT so it never
            obscures the left-aligned text column, breaking the card's
            bottom/right edges for depth (parent is overflow-visible), with
            a slow idle float. Scaled up further when featured (the big
            bento card) so it still reads as the dominant visual. */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          className={`pointer-events-none absolute -bottom-3 -right-2 transition-transform duration-300 group-hover:scale-[1.03] ${
            featured ? 'w-[86%] max-w-[420px]' : 'w-[80%] max-w-[250px]'
          }`}
        >
          <GalgalatzArt />
        </motion.div>

        <div className={`relative z-10 flex flex-col h-full p-4 sm:p-5 ${featured ? 'lg:p-7 max-w-[60%] sm:max-w-[50%]' : 'max-w-[47%]'}`} style={{ transform: 'translateZ(24px)' }}>
          <NumberBadge n="01" color="#ff5fa0" glow="rgba(255,95,160,0.55)" />
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

            <ExploreButton tone="#ff8fc0" />
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

export function AiModule({
  onClick,
  hidden = false,
  compact = false,
  onActivate,
  onDeactivate,
}: {
  onClick: () => void
  hidden?: boolean
  compact?: boolean
} & ActivationProps) {
  const t = useTiltRef()
  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-ai-rescue"
      onClick={onClick}
      onMouseMove={t.onMouseMove}
      onMouseEnter={() => onActivate?.()}
      onMouseLeave={() => {
        t.onMouseLeave()
        onDeactivate?.()
      }}
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
            plays inside the case study). */}
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

        {/* Pilot figure — enlarged and dropped further below the card's
            bottom edge (per explicit "the navigator needs to be outside,
            like in the mockup" feedback) so his legs clearly break past the
            boundary instead of just grazing it. z-20 keeps him above the
            poster/gradient but below the headline text. */}
        <motion.img
          src={asset('/assets/navigator/pilot-cutout-tight.png')}
          alt=""
          aria-hidden
          initial={{ x: '-50%', rotate: 0, opacity: 1 }}
          animate={{ x: '-50%', y: [0, -5, 0] }}
          whileHover={{ x: '-53%', rotate: -3, y: 0 }}
          transition={{ y: { duration: 2.6, repeat: Infinity, ease: 'easeInOut' }, x: { type: 'spring', stiffness: 220, damping: 16 }, rotate: { type: 'spring', stiffness: 220, damping: 16 } }}
          className={`absolute left-1/2 z-20 w-auto max-w-none object-contain opacity-100 ${compact ? 'h-[88%] bottom-[-9%]' : 'h-[72%] bottom-[-3%]'}`}
          style={{
            filter:
              'contrast(1.15) brightness(1.08) drop-shadow(0 12px 20px rgba(0,0,0,0.65)) drop-shadow(0 2px 6px rgba(0,0,0,0.8))',
          }}
        />

        <div className={`relative z-10 flex flex-col h-full ${compact ? 'p-4' : 'p-4 sm:p-6'}`} style={{ transform: 'translateZ(24px)' }}>
          <NumberBadge n="03" color="#4fd8ff" glow="rgba(79,216,255,0.5)" />
          <h3
            className={`mt-1 font-display font-extrabold leading-[1.05] text-white tracking-tight ${compact ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}
            style={{ textShadow: '0 2px 10px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9)' }}
          >
            CINEMATIC AI
            <br />
            PROTOTYPING
          </h3>
          <p
            className={`mt-1.5 text-white/75 ${compact ? 'text-[10px] max-w-[12rem]' : 'text-[10px] max-w-[13rem]'}`}
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.8)' }}
          >
            AI-powered cinematic prototypes with story, realism and emotional impact at scale.
          </p>

          <div className="mt-auto">
            <ExploreButton label="Explore" tone="#4fd8ff" />
          </div>
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
  wide = false,
  onActivate,
  onDeactivate,
}: {
  onClick: () => void
  hidden?: boolean
  wide?: boolean
} & ActivationProps) {
  const t = useTiltRef()
  const [cardHover, setCardHover] = useState(false)
  return (
    <motion.button
      ref={t.ref}
      type="button"
      layoutId="card-people-motion"
      onClick={onClick}
      onMouseMove={t.onMouseMove}
      onMouseEnter={() => {
        setCardHover(true)
        onActivate?.()
      }}
      onMouseLeave={() => {
        t.onMouseLeave()
        setCardHover(false)
        onDeactivate?.()
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
      {/* Fixed warm gold/orange identity regardless of the site-wide dark
          toggle — matches the approved mockup, which keeps this card's own
          desert world warm and light no matter the page theme (same
          treatment as Amy's card above). */}
      <motion.div
        style={{ rotateX: t.rotateX, rotateY: t.rotateY, transformStyle: 'preserve-3d' }}
        className={`relative w-full h-full rounded-[26px] overflow-visible border-2 shadow-2xl transition-all duration-300 group-hover:shadow-glow-gold border-pearl-gold2/30 group-hover:border-pearl-gold2/60 ${
          wide ? 'flex flex-col sm:flex-row sm:items-center' : 'flex flex-col'
        }`}
      >
        {/* Full-bleed background — the real "ACA ANASHIM" motion piece
            poster fills the ENTIRE card, including underneath the text
            column (not just a panel beside it), with a light cream scrim
            fading the left side for legibility. Matches the approved
            mockup, where the desert scene reads as one continuous
            rectangle rather than a split text-panel + image-panel. */}
        <div className="absolute inset-0 rounded-[26px] overflow-hidden">
          <img
            src={asset('/assets/motion/aca-anashim-poster.jpg')}
            alt=""
            aria-hidden
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {wide && <div className="absolute inset-0 bg-gradient-to-r from-[#FDE9C8] via-[#FDE9C8]/72 to-transparent" />}
          {!wide && <div className="absolute inset-0 bg-gradient-to-b from-[#FDE9C8]/95 via-[#FDE9C8]/35 to-transparent" />}
        </div>

        {/* Fleeing coins & hearts — rest astride the card's own border,
            dodge the cursor, z-50 so they always read above the frame.
            Trimmed to 3 (was 5) for the wide layout — "fewer floating
            elements, clear depth" per explicit request. */}
        {(wide ? COINS.slice(0, 3) : COINS).map((c, i) => (
          <FleeingCoin key={i} mx={t.mx} my={t.my} base={c.base} size={c.size} delay={c.delay} glyph={c.glyph} />
        ))}

        <div className="absolute inset-0 z-20 rounded-[26px] overflow-hidden pointer-events-none">
          <TetrisRain active={cardHover} />
        </div>

        <div className={`relative z-10 ${wide ? 'p-4 sm:p-5 sm:w-[42%] sm:shrink-0' : 'p-4 sm:p-5 pb-2'}`} style={{ transform: 'translateZ(24px)' }}>
          <NumberBadge n="02" color="#ff9f45" glow="rgba(255,159,69,0.5)" />
          <h3 className={`mt-1 font-display font-extrabold leading-[1.05] text-pearl-ink ${wide ? 'text-lg sm:text-xl' : 'text-xl sm:text-[22px]'}`}>
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
          <p className={`mt-1.5 text-pearl-sub ${wide ? 'text-[10px] max-w-[13rem]' : 'text-[10.5px] font-semibold uppercase tracking-wide'}`}>
            {wide ? 'Turning ideas into playable motion experiences that teach, reward and keep players coming back.' : '2D Worlds. Motion Design.'}
          </p>
          {wide && <ExploreButton tone="#b8863b" />}
        </div>

        {!wide && (
          <div className="relative z-10 flex-1 ml-3 mb-3 -mr-1.5 sm:ml-4 sm:mb-4 sm:-mr-2 rounded-2xl overflow-hidden border border-white/50 shadow-lg flex items-center px-3 sm:px-4">
            <ComputerMonitorFrame compact>
              <img src={asset('/assets/motion/aca-anashim-poster.jpg')} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover" />
            </ComputerMonitorFrame>
          </div>
        )}
      </motion.div>
    </motion.button>
  )
}
