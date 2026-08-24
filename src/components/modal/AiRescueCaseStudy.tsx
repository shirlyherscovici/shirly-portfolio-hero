import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, Crosshair, Zap, Eye, Users2, Captions, Joystick, Cpu, Network } from 'lucide-react'
import CaseStudyHeader from './CaseStudyHeader'
import FloatingElement from '../ui/FloatingElement'
import { asset } from '../../lib/asset'

const VIDEO_SRC = asset('/assets/navigator/main-film.mp4')
const AIRPLANE_SRC = asset('/assets/navigator/c13-airplane-tight.png')
const PILOT_SRC = asset('/assets/navigator/pilot-cutout-tight.png')

/** Caps the video panel's rendered width so a 16:9 box never exceeds 52% of
 *  the viewport's height — applied via an explicit calc() (not an
 *  inline-block shrink-wrap) so it can't create a circular width
 *  dependency between a `w-full` child and a shrink-to-fit parent. Shared
 *  with the wrapper below so the tactical map / badge, positioned relative
 *  to that wrapper, always align to the video's true edges. */
const VIDEO_MAX_WIDTH = { maxWidth: 'calc(52vh * 16 / 9)' }

/* ------------------------------------ Subtitles ------------------------------------ */

/** English transcript, timestamp-synced to the broadcast video. Trimmed to
 *  short, punchy lines (the full narration lives in
 *  /public/assets/navigator/captions-en.vtt, also attached natively below
 *  for screen readers / the browser's own CC menu) — long sentences were
 *  wrapping to 4–6 lines in the compact video frame and visually colliding
 *  with the CC/mute controls above. */
const CUES: { start: number; end: number; text: string }[] = [
  { start: 0, end: 9.9, text: 'F-15E navigator shot down overnight over Iran — parachuted safely and signaled headquarters.' },
  { start: 9.9, end: 17.17, text: 'Central command launched an exceptionally complex, daring rescue operation.' },
  { start: 17.17, end: 24.24, text: 'The injured Colonel moved through steep terrain, evading Iranian forces.' },
  { start: 24.24, end: 30.3, text: 'Air support circled overhead, striking to keep the enemy at bay.' },
  { start: 30.3, end: 38.38, text: 'Elite rescue units reached him, guiding him to an improvised extraction point.' },
  { start: 38.38, end: 44.44, text: 'Two Hercules aircraft waited — but mechanical issues grounded them after boarding.' },
  { start: 44.44, end: 50.5, text: 'Three replacement aircraft launched, retrieved all forces, and took off safely.' },
  { start: 50.5, end: 58, text: 'The disabled aircraft were destroyed on-site to keep them from enemy hands.' },
]

function SubtitleOverlay({ time, visible }: { time: number; visible: boolean }) {
  if (!visible) return null
  const cue = CUES.find((c) => time >= c.start && time < c.end)
  if (!cue) return null
  return (
    <div className="absolute inset-x-0 bottom-16 sm:bottom-20 flex justify-center px-4 sm:px-10 pointer-events-none">
      {/* line-clamp-2 is a hard cap, and bottom-14/16 keeps it clear of the
          single play/pause control pinned at the very bottom edge. */}
      <p className="max-w-md sm:max-w-lg text-center text-[10px] sm:text-xs font-semibold text-white leading-snug bg-black/75 backdrop-blur-sm px-3 py-1.5 rounded-lg line-clamp-2">
        {cue.text}
      </p>
    </div>
  )
}

/* -------------------------------- Tactical map panel -------------------------------- */

function TacticalMap({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`rounded-xl bg-black/60 backdrop-blur-md border border-cine-cyan/30 shadow-cine-lg ${compact ? 'px-2.5 py-2 w-[124px]' : 'px-3.5 py-3 w-[168px]'}`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <Crosshair size={compact ? 9 : 11} className="text-cine-cyan" />
        <span className={`font-bold uppercase tracking-widest text-cine-cyan ${compact ? 'text-[7px]' : 'text-[8.5px]'}`}>Landing Coords</span>
      </div>
      <div className="relative w-full aspect-square rounded-lg bg-[#0a1a1f] overflow-hidden border border-cine-cyan/20">
        <div
          className="absolute inset-0 opacity-50"
          style={{ backgroundImage: 'repeating-linear-gradient(0deg, rgba(79,216,255,0.15) 0 1px, transparent 1px 12px), repeating-linear-gradient(90deg, rgba(79,216,255,0.15) 0 1px, transparent 1px 12px)' }}
        />
        <motion.div
          className="absolute inset-0 origin-center radar-sweep"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
        <span className="absolute top-1/2 left-1/2 w-1.5 h-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cine-magenta shadow-glow-magenta" />
      </div>
      {!compact && (
        <p className="mt-2 text-[8.5px] font-mono text-cine-sub leading-snug">
          34.02°N 118.45°W
          <br />
          ALT 1,240FT · HDG 074°
        </p>
      )}
    </div>
  )
}

/* ------------------------------------ Video panel ------------------------------------ */

function VideoPanel() {
  const ref = useRef<HTMLVideoElement>(null)
  const trackRef = useRef<HTMLTrackElement>(null)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [ccOn, setCcOn] = useState(true)

  // The native <track> below exists for accessibility (screen readers, the
  // browser's own CC menu) — but left at its default mode, browsers also
  // burn its cues directly onto the video, stacking a second, un-styled
  // copy of the captions on top of our own SubtitleOverlay. Forcing it to
  // 'hidden' keeps the cues available without double-rendering them.
  useEffect(() => {
    const t = trackRef.current?.track
    if (t) t.mode = 'hidden'
  }, [])

  const togglePlay = () => {
    const v = ref.current
    if (!v) return
    if (v.paused) {
      v.muted = false
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div style={VIDEO_MAX_WIDTH} className="relative mx-auto w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-cine-lg bg-black">
      <video
        ref={ref}
        src={VIDEO_SRC}
        playsInline
        preload="auto"
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
        className="absolute inset-0 w-full h-full object-contain bg-black"
      >
        <track ref={trackRef} kind="subtitles" src={asset('/assets/navigator/captions-en.vtt')} srcLang="en" label="English" />
      </video>

      {!playing && <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/5 to-black/50" />}

      <SubtitleOverlay time={time} visible={ccOn && playing} />

      <button
        type="button"
        onClick={() => setCcOn((c) => !c)}
        aria-label={ccOn ? 'Turn off English captions' : 'Turn on English captions'}
        aria-pressed={ccOn}
        className={`absolute top-3 right-3 z-10 flex items-center gap-1 px-2 py-1 rounded-md border text-[9px] font-bold tracking-wide transition-colors ${
          ccOn ? 'bg-cine-cyan/20 border-cine-cyan/60 text-cine-cyan' : 'bg-black/50 border-white/20 text-white/60 hover:text-white'
        }`}
      >
        <Captions size={12} /> CC
      </button>

      {/* Single standardized glassmorphic play/pause control — the only way
          to start or stop playback, always pinned bottom-center, well clear
          of the subtitle overlay above it. */}
      <button
        type="button"
        onClick={togglePlay}
        aria-label={playing ? 'Pause the prime-time broadcast' : 'Watch the prime-time broadcast'}
        className="group absolute inset-x-0 bottom-3 sm:bottom-4 mx-auto w-max flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full font-display font-bold text-[11px] sm:text-sm tracking-wide uppercase bg-white/10 backdrop-blur-md border border-white/25 text-white shadow-cine-lg transition-transform hover:scale-[1.04]"
      >
        <span className="w-6 h-6 rounded-full bg-white/15 flex items-center justify-center group-hover:bg-white/25 transition-colors">
          {playing ? <Pause size={11} className="fill-current" /> : <Play size={11} className="fill-current" />}
        </span>
        {playing ? 'Pause Broadcast' : 'Watch Prime-Time Broadcast'}
      </button>
    </div>
  )
}

/* --------------------------------------- Info cards --------------------------------------- */

const INFO_CARDS = [
  { icon: Zap, title: 'Rapid Broadcast Delivery', body: 'Conceived, directed & delivered under live news deadline pressure.' },
  { icon: Eye, title: 'Tactical Visual Accuracy', body: 'Strict adherence to real-world geographic and military assets (F-15E, rocky terrain).' },
  { icon: Users2, title: 'Scene & Character Control', body: 'Maintained visual coherence & pilot anonymity across 20+ generated scenes.' },
]

/* ------------------------------------------ Export ------------------------------------------ */

export default function AiRescueCaseStudy({ onClose }: { onClose: () => void }) {
  return (
    <div className="relative">
      <CaseStudyHeader
        id="modal-ai-title"
        stageLabel="03"
        title="AI CINEMATIC PIPELINE: PILOT RESCUE"
        supportLabel="Prime-Time News Broadcast (High-Pressure Delivery)"
        theme="dark"
        onClose={onClose}
        meta={[
          { label: 'Role', value: 'AI Director, Prompt Engineer, Compositor' },
          { label: 'Tech Stack', value: 'Midjourney · Runway Gen-2 · Luma AI' },
        ]}
      />

      {/* Arcade joystick accent — echoes the Amy case study's chrome without
          swapping this modal's own dark glass close button. */}
      <div
        aria-hidden
        className="absolute top-3 left-3 sm:top-4 sm:left-4 z-40 w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/20 shadow-cine-lg backdrop-blur-md flex items-center justify-center text-cine-cyan"
      >
        <Joystick size={18} />
      </div>

      <div className="px-5 sm:px-8 pb-6 pt-2">
        {/* Shares VIDEO_MAX_WIDTH with the video panel itself (rather than
            an inline-block shrink-wrap, which created a circular width
            dependency and collapsed the video to 0px) so the tactical map
            & badge — deliberately positioned outside the video — always
            align to its true edges. */}
        <div className="flex justify-center">
          <div style={VIDEO_MAX_WIDTH} className="relative w-full">
            <VideoPanel />

            {/* Tactical map — OFF the video surface entirely (not an inset
                overlay on top of the footage), breaking the video's own
                bottom-left corner instead so it reads as an adjacent HUD
                panel rather than something competing with the picture. */}
            <div className="absolute -bottom-8 sm:-bottom-10 left-2 sm:left-4 z-20 hidden sm:block">
              <TacticalMap compact />
            </div>

            {/* Floating AI network/node glyphs — pure glass icon badges, no
                text label, positioned on the LEFT breaking the video's own
                top edge, clear of the CC toggle (the only control left at
                top-right) so nothing ever overlaps. */}
            <FloatingElement delay={0.4} distance={10} className="absolute -top-3 left-8 hidden md:block">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-black/45 backdrop-blur-md border border-cine-cyan/30 text-cine-cyan">
                <Cpu size={13} />
              </span>
            </FloatingElement>
            <FloatingElement delay={1.1} distance={8} className="absolute -top-3 left-20 hidden lg:block">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-black/45 backdrop-blur-md border border-cine-magenta/30 text-cine-magenta">
                <Network size={12} />
              </span>
            </FloatingElement>
          </div>
        </div>

        {/* Tactical map — mobile only (the breakout desktop version lives
            beside the video itself, hidden below sm:). */}
        <div className="sm:hidden mt-4 flex justify-center">
          <TacticalMap />
        </div>

        {/* The creative pipeline — proves this was directed AI production
            (concept → generation → motion → final), not "typed a prompt,
            got a cool video." */}
        <div className="mt-9 sm:mt-8 flex items-center justify-center gap-1.5 sm:gap-2.5 flex-wrap">
          {['Concept', 'Generation', 'Motion', 'Final'].map((step, i, arr) => (
            <div key={step} className="flex items-center gap-1.5 sm:gap-2.5">
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-cine-soft text-[10px] font-display font-bold uppercase tracking-wide text-white">
                <span className="w-4 h-4 rounded-full bg-cine-cyan/20 border border-cine-cyan/40 text-cine-cyan text-[8px] font-mono flex items-center justify-center">
                  {i + 1}
                </span>
                {step}
              </span>
              {i < arr.length - 1 && <span className="text-cine-cyan/40 text-xs">→</span>}
            </div>
          ))}
        </div>

        <div className="grid sm:grid-cols-3 gap-3.5 mt-4">
          {INFO_CARDS.map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl glass-cine-soft p-4">
              <Icon size={16} className="text-cine-cyan mb-2" />
              <p className="font-display font-bold text-sm text-white">{title}</p>
              <p className="text-[11px] text-cine-sub mt-1 leading-snug">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/** The C-130 and the pilot, both breaking the modal's own frame — rendered
 *  via ProjectModal's `breakout` slot (outside the scroll container's
 *  clipping), both z-40 so the close button (z-[100]) always wins. */
export function AiRescueBreakout() {
  return (
    <>
      {/* Anchored at the panel's own top-right corner, breaking the frame
          boundary exactly as the mockup shows. The offset at each
          breakpoint is capped to that breakpoint's own ProjectModal
          wrapper padding (p-3/p-6/p-10, one step less at lg so there's
          always a little headroom) so the plane's top edge can never be
          pushed past the actual viewport edge and clipped, regardless of
          how tall the modal itself renders. A single continuous easeInOut
          loop (no held pauses between keyframes) drifts it along a wide
          diagonal for constant, non-stuttering motion — it never fully
          stops. Sits at z-30, one level below CaseStudyHeader's z-40:
          this lets it visually cross behind the breadcrumb/title/meta
          text exactly at the corner where the two would otherwise overlap,
          so the frame-breaking pose stays dramatic without ever making
          that copy unreadable. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ x: [0, -26, 0], y: [0, 16, 0], rotate: [-4, -9, -4], opacity: 1 }}
        transition={{
          x: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          y: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          rotate: { duration: 7, repeat: Infinity, ease: 'easeInOut' },
          opacity: { duration: 0.6 },
        }}
        className="absolute -top-3 sm:-top-6 lg:-top-8 -right-3 sm:-right-6 lg:-right-8 z-30 w-40 sm:w-52 lg:w-64 pointer-events-none drop-shadow-2xl"
      >
        <img
          src={AIRPLANE_SRC}
          alt="A C-130 Hercules transport aircraft, breaking out of the case-study frame's top-right corner"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Pilot — fully opaque, foregrounded (z-20, comfortably below the
          header's z-40 joystick badge and the z-[100] close button), and
          anchored to the LEFT side at a height that clears the info cards
          further down so he never masks their text. */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85, x: -16, y: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.35 }}
        className="absolute top-[38%] -left-6 sm:-left-10 z-20 w-32 sm:w-44 opacity-100 hidden sm:block"
        style={{ filter: 'drop-shadow(0 10px 18px rgba(0,0,0,0.55)) drop-shadow(0 2px 5px rgba(0,0,0,0.7))' }}
      >
        <img src={PILOT_SRC} alt="The rescued F-15E navigator, breaking out of the case-study frame" className="w-full h-auto object-contain opacity-100" />
      </motion.div>
    </>
  )
}
