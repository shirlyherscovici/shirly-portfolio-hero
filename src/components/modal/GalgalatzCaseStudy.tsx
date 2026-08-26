import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Menu, ChevronDown, ChevronLeft, ChevronRight, Home, Search, Heart, User, Trophy } from 'lucide-react'
import CaseStudyHeader from './CaseStudyHeader'
import FloatingElement from '../ui/FloatingElement'
import { GoldCoin, MusicNote } from '../ui/decor'
import { asset } from '../../lib/asset'

const ASSETS = {
  keyArt: asset('/assets/galgalatz/banner-cover.jpg'),
  rank1: asset('/assets/galgalatz/rank-01.png'),
  rank2: asset('/assets/galgalatz/rank-02.png'),
  rank3: asset('/assets/galgalatz/rank-03.png'),
  top50: asset('/assets/galgalatz/rank-31-50.jpg'),
  neonBox: asset('/assets/galgalatz/neon-box-tight.png'),
}

const FRAMES = [
  { key: 'key-art', label: 'Key Art', sub: '3D Neon Logo', thumb: ASSETS.keyArt },
  { key: 'voting', label: 'User-Centered', sub: 'Voting Flow', thumb: ASSETS.rank1 },
  { key: 'star-born', label: 'Victory Story', sub: 'A Star Is Born (#1)', thumb: ASSETS.rank1 },
  { key: 'titanic', label: 'Victory Story', sub: 'Titanic (#2)', thumb: ASSETS.rank2 },
  { key: 'rocky', label: 'Victory Story', sub: 'Rocky III (#3)', thumb: ASSETS.rank3 },
  { key: 'top50', label: 'Full Top 50', sub: 'Leaderboard', thumb: ASSETS.top50 },
] as const

/* ------------------------------- Glass display case ------------------------------- */

function GlassDisplayCase({ highlighted }: { highlighted: boolean }) {
  return (
    <div className="relative h-full">
      {/* h-full, not its own vh-based height — this zone's proportions are
          now set by the parent artboard stage's fixed aspect ratio
          (measured from the mockup), not by this component sizing itself
          independently of the phone next to it. */}
      <motion.div
        animate={{
          filter: highlighted
            ? 'drop-shadow(0 0 26px rgba(255,95,160,0.55)) drop-shadow(0 0 46px rgba(79,216,255,0.35))'
            : 'drop-shadow(0 0 18px rgba(79,216,255,0.18))',
        }}
        transition={{ duration: 0.4 }}
        className="relative flex items-center justify-center h-full"
      >
        {/* Real 3D glass display case render — neon "Music From The Screen"
            key art, popcorn, film strip & clapperboard already baked in. */}
        <img
          src={ASSETS.neonBox}
          alt="Galgalatz × N12 — 3D glass display case with the neon 'Music From The Screen' key art, popcorn, film strip and clapperboard"
          className="w-full h-full object-contain"
        />
        <span className="absolute top-2 left-1/2 -translate-x-1/2 text-[9px] font-bold uppercase tracking-widest text-cine-cyan bg-black/50 px-2 py-1 rounded-full border border-cine-cyan/30">
          3D Display Case
        </span>
      </motion.div>
      {/* No floating note pinned to the case itself anymore — checked the
          mockup directly, and nothing sits immediately beside the
          cabinet. The two coins that actually appear near it live in the
          gap between cabinet and phone, positioned by the parent stage
          (see the "2 coins in the gap" comment below). */}
    </div>
  )
}

/* ------------------------------------ Phone UI ------------------------------------ */

function VotingScreen() {
  // No painted background — the phone's own photographed screen (a
  // solid indigo) already supplies one, same fix as Amy's 27 Club grid:
  // a second, different-toned fill on top just looked like a patch.
  return (
    <div className="w-full h-full text-white flex flex-col">
      <div className="flex items-center justify-between px-3 pt-8 pb-2">
        <Menu size={14} />
        <span className="font-display font-black text-[11px] tracking-wide">N12</span>
      </div>
      <p className="px-3 text-[13px] font-display font-bold leading-tight mt-1">Production Voting</p>
      <div className="mx-3 mt-2 flex items-center justify-between text-[9px] bg-white/10 rounded-lg px-2 py-1.5">
        <span className="text-white/60">Category</span>
        <span className="flex items-center gap-1 text-white">Select <ChevronDown size={10} /></span>
      </div>
      <div className="grid grid-cols-3 gap-2 px-3 mt-2.5">
        {[
          { img: ASSETS.rank1, title: 'A Star Is Born' },
          { img: ASSETS.rank2, title: 'Titanic' },
          { img: ASSETS.rank3, title: 'Rocky III' },
        ].map((m) => (
          <div key={m.title} className="rounded-lg overflow-hidden bg-black/30 border border-white/10">
            <img src={m.img} alt={m.title} className="block w-full aspect-[3/4] object-cover" />
            <p className="text-[7px] font-semibold px-1 py-1 truncate">{m.title}</p>
          </div>
        ))}
      </div>
      <div className="mt-2 mx-3 flex items-center gap-1.5 text-[9px] text-white/70">
        <span className="w-4 h-4 rounded-full bg-cine-magenta/80 flex items-center justify-center text-[8px] font-bold">0</span>
        Votes cast
      </div>
      <div className="mt-auto flex items-center justify-around py-2.5 border-t border-white/10 bg-black/20">
        {[Home, Search, Heart, User].map((Icon, i) => (
          <Icon key={i} size={14} className={i === 0 ? 'text-cine-cyan' : 'text-white/40'} />
        ))}
      </div>
    </div>
  )
}

function VictoryScreen({ img, rank, title, song }: { img: string; rank: string; title: string; song: string }) {
  return (
    <div className="relative w-full h-full">
      {/* object-contain — the poster art was cropping at the top/bottom
          edges under object-cover inside the 9:19 phone screen; contain
          shows the full artwork, letterboxed against the phone's own
          screen color (no painted bg-black) rather than cut or patched
          with a mismatched fill. */}
      <img src={img} alt={`${title} — ${song}`} className="absolute inset-0 w-full h-full object-contain" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/40" />
      <span className="absolute top-8 left-1/2 -translate-x-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-cine-gold text-[#4a2d0f] text-[9px] font-black uppercase">
        <Trophy size={10} /> #{rank}
      </span>
      <div className="absolute bottom-3 inset-x-3 text-white">
        <p className="font-display font-bold text-xs">{title}</p>
        <p className="text-[9px] text-white/70">{song}</p>
      </div>
    </div>
  )
}

function LeaderboardScreen() {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <img src={ASSETS.top50} alt="Full Top 50 leaderboard, ranks 31–50" className="absolute inset-0 w-full h-full object-contain" />
    </div>
  )
}

function KeyArtScreen() {
  return (
    <div className="relative w-full h-full">
      <img src={ASSETS.keyArt} alt="Galgalatz key art neon logo" className="absolute inset-0 w-full h-full object-contain" />
    </div>
  )
}

/** One screen at a time, guaranteed: a plain lookup keyed by the active
 *  frame (rather than a chain of `frame === x &&` checks) so there is no
 *  ambiguity about more than one screen ever being selected, and `key`
 *  forces React to fully unmount the previous screen — including its
 *  <img> — before the next one mounts, rather than patching over it. */
function PhoneScreen({ frame }: { frame: (typeof FRAMES)[number]['key'] }) {
  const SCREENS: Record<(typeof FRAMES)[number]['key'], ReactNode> = {
    'key-art': <KeyArtScreen />,
    voting: <VotingScreen />,
    'star-born': <VictoryScreen img={ASSETS.rank1} rank="1" title="A Star Is Born" song="Shallow — Lady Gaga, Bradley Cooper" />,
    titanic: <VictoryScreen img={ASSETS.rank2} rank="2" title="Titanic" song="My Heart Will Go On — Céline Dion" />,
    rocky: <VictoryScreen img={ASSETS.rank3} rank="3" title="Rocky III" song="Eye Of The Tiger — Survivor" />,
    top50: <LeaderboardScreen />,
  }

  return (
    <motion.div key={frame} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className="w-full h-full">
      {SCREENS[frame]}
    </motion.div>
  )
}

/* -------------------------------------- Film strip -------------------------------------- */

/** A row of 35mm-style film-strip sprocket holes. */
function SprocketRow() {
  return (
    <div className="flex justify-between px-3 shrink-0" aria-hidden>
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-[2px] bg-black/50 border border-white/15" />
      ))}
    </div>
  )
}

function FilmStrip({ active, onSelect }: { active: number; onSelect: (i: number) => void }) {
  return (
    <div className="relative rounded-2xl bg-black/40 backdrop-blur-xl border-2 border-white/20 shadow-cine-lg py-2.5 overflow-hidden">
      {/* Transparent 35mm film-strip border — perforation rows top & bottom */}
      <SprocketRow />
      {/* Grid, not a horizontal-scroll row — in the wide shell's two-column
          layout this strip lives in a narrower side column, where 6 items
          in one scrolling row would just hide most of them off-screen.
          A 2-column grid keeps every chapter visible without scrolling. */}
      <div className="my-2.5 px-3">
        <div className="grid grid-cols-2 gap-2.5">
          {FRAMES.map((f, i) => (
            <button
              key={f.key}
              type="button"
              onClick={() => onSelect(i)}
              className={`relative w-full rounded-xl overflow-hidden border-2 transition-all text-left ${
                active === i
                  ? 'border-cine-cyan shadow-glow-cyan scale-[1.06] ring-2 ring-cine-cyan/40 ring-offset-2 ring-offset-black/60'
                  : 'border-white/15 hover:border-white/40 opacity-70 hover:opacity-100'
              }`}
            >
              <img src={f.thumb} alt="" aria-hidden className="w-full aspect-[4/3] object-cover" />
              <div className={`absolute inset-0 transition-opacity ${active === i ? 'bg-gradient-to-t from-black/75 to-transparent' : 'bg-gradient-to-t from-black/90 to-black/20'}`} />
              <div className="absolute bottom-1 left-1.5 right-1.5">
                <p className={`text-[8.5px] font-bold leading-tight ${active === i ? 'text-cine-cyan' : 'text-white'}`}>{f.label}</p>
                <p className="text-[7.5px] text-white/60 leading-tight truncate">{f.sub}</p>
              </div>
              <span className="absolute top-1 left-1.5 text-[7px] font-mono text-white/50">{String(i + 1).padStart(2, '0')}</span>
            </button>
          ))}
        </div>
      </div>
      <SprocketRow />
    </div>
  )
}

/* ---------------------------------------- Export ---------------------------------------- */

export default function GalgalatzCaseStudy({ onClose }: { onClose: () => void }) {
  const [active, setActive] = useState(0)

  return (
    <div className="relative">
      <CaseStudyHeader
        id="modal-galgalatz-title"
        stageLabel="02"
        title="Game UI UX Prototyping"
        supportLabel="Production Voting Flow & 3D Neon Integration"
        theme="dark"
        onClose={onClose}
        variant="inline-meta"
        meta={[
          { label: 'Role', value: 'Lead Graphic & UI/UX Designer' },
          { label: 'Crafted', value: 'Early 2022' },
          { label: 'Branding', value: 'N12 × Galgalatz Fusion' },
        ]}
      />

      {/* The joystick badge for this case study is rendered once, by
          ProjectModal (joystickBadgeSrc prop) — this used to ALSO render
          its own lucide-icon joystick here, so the real asset badge was
          stacking on top of a leftover placeholder instead of replacing
          it. Removed. */}

      {/* UX storytelling strip — moved ABOVE the cabinet/phone scene and
          given real visual weight (was small text sitting right against
          the phone's own edge below, easy to miss and hard to read there).
          This is the fast, recruiter-scannable problem → idea → build →
          result summary — important enough that it shouldn't be an
          afterthought under the visuals. */}
      <div className="px-5 sm:px-8 pb-4">
        <div className="rounded-2xl glass-cine-soft px-4 py-3 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 text-[12px] sm:text-[13px]">
          {[
            { k: 'Challenge', v: 'A cluttered, low-engagement voting flow.' },
            { k: 'UX Idea', v: 'Guide users discover → listen → vote.' },
            { k: 'Execution', v: 'iPhone-first voting UI, real content.' },
            { k: 'Outcome', v: '+8.5K voters, +700% mobile boost.' },
          ].map((s, i, arr) => (
            <span key={s.k} className="flex items-baseline gap-2">
              <span>
                <span className="font-display font-bold uppercase tracking-wide text-cine-cyan">{s.k}</span>{' '}
                <span className="text-white/90 font-medium">{s.v}</span>
              </span>
              {i < arr.length - 1 && <span className="text-cine-cyan/40">→</span>}
            </span>
          ))}
        </div>
      </div>

      <div className="px-5 sm:px-8 pb-6">
        {/* The modal now opens at the shared wide shell width (not a
            narrow portrait panel) so the page never needs to scroll to see
            the whole case study — the cabinet/phone scene and the film
            strip sit side by side on a real desktop viewport instead of
            stacking the strip below a scene that would otherwise stretch
            to the full wide width. Below lg, there's no room for two
            columns, so it falls back to the original stacked layout. */}
        <div className="lg:grid lg:grid-cols-[1.3fr_1fr] lg:gap-6 lg:items-start">
        <div>
        {/* Fixed-aspect artboard (not flex-driven sizing) — cabinet and
            phone zones positioned at percentages pixel-measured directly
            from the reference file (cabinet's neon glow bounds ~9-49% of
            the card width; the phone's own screen color bounds ~63-92%),
            converted to this scene's own coordinate space. Aspect ratio
            765/680 approximates the measured cabinet+phone scene's own
            bounding box within the card (excluding header/filmstrip/
            metrics, which stay in normal flow above/below). Capped to a
            max width so the extra room the wide shell provides goes to the
            film strip column instead of just blowing this scene up bigger
            (and taller). */}
        <div className="relative w-full max-w-[520px] mx-auto lg:mx-0" style={{ aspectRatio: '765 / 680' }}>
          <div className="absolute inset-y-0 left-0" style={{ width: '50%' }}>
            <GlassDisplayCase highlighted={active === 0} />
          </div>

          {/* Two coins in the cabinet-phone gap — nudged left to stay in
              the (now narrower) gap after the phone was enlarged to reach
              the cabinet's own full height. */}
          <FloatingElement delay={0.3} distance={8} className="absolute z-20" style={{ left: '51%', top: '22%' }}>
            <GoldCoin size={34} />
          </FloatingElement>
          <FloatingElement delay={0.9} distance={9} className="absolute z-20" style={{ left: '55%', top: '51%' }}>
            <GoldCoin size={40} />
          </FloatingElement>

          {/* Widened from 69%→60% (left) and given the cabinet's own full
              inset-y-0 span (was top/bottom 4%) — the phone's aspect-ratio
              is fixed, so it only grows by growing WIDTH; this now reaches
              close to the cabinet's own full height instead of visibly
              stopping short of it. */}
          <div className="absolute" style={{ left: '60%', right: '0%', top: '0%', bottom: '0%' }}>
            {/* Plain block wrapper, NOT flex — a flex row + an
                aspect-ratio child with width:100% was resolving the
                child to roughly half the intended size (a real
                flexbox+aspect-ratio sizing interaction, confirmed via
                DOM measurement: 112px rendered vs 221px available). */}
            <div className="relative h-full">
              {/* The real photographed phone replaces the hand-built
                  PhoneMockup frame — same technique as the Amy case study's
                  27 Club phone: the asset is one wide canvas with a lot of
                  transparent padding, so this crops in on just the phone
                  (an oversized absolutely-positioned img offset by negative
                  %) and overlays PhoneScreen in a plain (non-rotated,
                  non-3D) rectangle positioned over the photographed screen.
                  A tiny hover "breathe" (scale + near-zero rotate) stands
                  in for straightening the phone's own baked-in camera
                  angle — a true front-on view isn't possible from a single
                  photographed asset, so this is the closest a CSS hover
                  can get to "feels alive" without a second photo. */}
              <motion.div
                className="relative w-full"
                style={{ aspectRatio: '617 / 1326' }}
                whileHover={{ scale: 1.015, rotate: 0.4 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              >
                <img
                  src={asset('/assets/galgalatz/glaglatz-phones.png')}
                  alt=""
                  aria-hidden
                  className="absolute pointer-events-none select-none"
                  style={{ width: '176.1%', maxWidth: 'none', left: '-40%', top: '-1%' }}
                />
                {/* Re-measured directly against the source photo via a
                    tight color-based pixel scan of the actual screen
                    boundary (the previous top:21.3%/height:69.5% estimate
                    was well short of the real screen, which actually
                    starts almost right below the notch and runs almost to
                    the home-bar — leaving screen content cut off/floating
                    wrong against the bezel instead of filling the glass). */}
                <div
                  className="absolute overflow-hidden rounded-[8px]"
                  style={{ left: '11.5%', top: '6%', width: '78.5%', height: '87%', transform: 'rotate(-0.5deg)' }}
                >
                  <PhoneScreen frame={FRAMES[active].key} />
                </div>
              </motion.div>

              {/* Screen nav arrows — cycle through the same FRAMES the
                  filmstrip below controls, so the phone can be browsed
                  directly without reaching for the thumbnails. */}
              <button
                type="button"
                onClick={() => setActive((n) => (n - 1 + FRAMES.length) % FRAMES.length)}
                aria-label="Previous screen"
                className="absolute top-[42%] -left-5 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={() => setActive((n) => (n + 1) % FRAMES.length)}
                aria-label="Next screen"
                className="absolute top-[42%] -right-5 -translate-y-1/2 z-30 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/25 flex items-center justify-center text-white hover:bg-black/80 hover:scale-110 transition-all"
              >
                <ChevronRight size={16} />
              </button>
              <p className="text-center mt-2.5 text-[10px] font-semibold uppercase tracking-wide opacity-60">N12 × Galgalatz — Production Voting</p>
            </div>
          </div>
        </div>
        </div>

        <div className="mt-5 lg:mt-0">
          <p className="text-[11px] font-display font-bold uppercase tracking-[0.18em] text-cine-cyan mb-1.5">Campaign Chapters <span className="text-cine-sub font-semibold tracking-wide">— Tap to explore</span></p>
          <FilmStrip active={active} onSelect={setActive} />
        </div>
        </div>
      </div>

      {/* Mockup's bottom bar is plain "LABEL: value" text triplets in one
          bordered pill — not the icon+big-number StatStrip used elsewhere.
          Matched exactly (down to reusing the same label/value type scale
          as the header's own inline meta line) rather than the generic
          stat-block component. */}
      <div className="px-5 sm:px-8 py-4 border-t border-white/10">
        <div className="rounded-2xl glass-cine-soft px-4 py-3.5 flex flex-wrap justify-center gap-x-6 gap-y-1.5 text-[11px] sm:text-xs text-cine-sub">
          {[
            { label: 'Impact', value: '+8.5K Voters' },
            { label: 'Engagement', value: '700% Mobile Boost' },
            { label: 'Visuals', value: '100% Custom Craft' },
          ].map((m) => (
            <p key={m.label}>
              <span className="font-bold text-white">{m.label}:</span> {m.value}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Gold coins and music notes breaking the whole MODAL's left/right edges
 *  — rendered via ProjectModal's `breakout` slot, outside the scroll
 *  container's clipping, matching the same outer-frame prop language used
 *  on the other three case studies. */
/** Checked the mockup file directly: nothing breaks the LEFT edge at
 *  all (the cabinet's own side has no floating objects) — every
 *  floating object sits in the gap between the cabinet and phone, or
 *  breaks the phone's own right edge. The two coins in the gap are
 *  positioned inside the artboard stage itself (see the stage JSX
 *  above), not here; this breakout is just the two notes that spill
 *  past the phone's right edge, at their pixel-measured heights
 *  (~26% and ~51% down the card). */
export function GalgalatzBreakout() {
  return (
    <>
      <FloatingElement delay={0.5} distance={9} className="absolute top-[24%] -right-8 sm:-right-12 z-30 hidden sm:block">
        <MusicNote size={36} />
      </FloatingElement>
      <FloatingElement delay={1.2} distance={9} className="absolute top-[49%] -right-7 sm:-right-11 z-30 hidden sm:block">
        <MusicNote size={30} />
      </FloatingElement>
    </>
  )
}
