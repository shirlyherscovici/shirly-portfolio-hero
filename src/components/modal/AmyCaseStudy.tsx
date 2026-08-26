import { Users, TrendingUp, Heart, PenTool, Palette } from 'lucide-react'
import CaseStudyHeader from './CaseStudyHeader'
import StatStrip from '../ui/StatStrip'
import FloatingElement from '../ui/FloatingElement'
import { GoldCoin, HeartIcon, MusicNote, TreasureChest } from '../ui/decor'
import AmyRosterGrid from './AmyRosterGrid'
import AmyBeforeAfterPhone from './AmyBeforeAfterPhone'
import { useCountUp } from '../../lib/useCountUp'
import { asset } from '../../lib/asset'

const ASSETS = {
  figure: asset('/assets/amy/amy-figure-birds-gems.png'),
}

/* -------------------------- Hero figure composition -------------------------- */

function AmyHeroFigure() {
  return (
    <div className="relative h-full overflow-visible">
      {/* h-full, not its own aspect-ratio — this zone's actual proportions
          are now set by the artboard stage's own aspect-ratio (measured
          from the mockup card), not by this component in isolation. */}
      <div className="relative h-full rounded-[24px] overflow-visible bg-gradient-to-b from-[#fdf3e8] to-[#f6ded7] border border-white shadow-pearl-sm flex items-end justify-center px-1 pt-6">
        {/* Real character render — the box, roses, golden swallow, vinyl
            record and music note are all baked into the source artwork.
            Enlarged and allowed to spill past the panel's own edges. */}
        <img
          src={ASSETS.figure}
          alt="AMY — Amy Winehouse tribute character emerging from a gift box, with a golden swallow, roses and a vinyl record"
          className="w-[132%] max-w-none h-full max-h-[124%] object-contain drop-shadow-xl relative z-10"
        />
      </div>
      {/* No separate floating swallow/vinyl/coin here anymore — checked
          the actual source artwork (amy-figure-birds-gems.png) directly
          and it already has the swallow, the vinyl record, AND a music
          note baked in at bottom-left. The earlier floating GoldCoin and
          VinylRecord elements were rendering a second copy of things the
          image already shows, which the mockup doesn't do — it has
          exactly one of each. */}
    </div>
  )
}

/* -------------------------------- Metric badges -------------------------------- */

function ChestBadge() {
  const growth = useCountUp('+74%')
  return (
    <div
      className="relative flex-1 rounded-2xl glass-pearl-soft border border-pearl-gold/40 p-3.5 text-center overflow-hidden"
      style={{ boxShadow: '0 10px 24px -8px rgba(176,42,58,0.28), 0 2px 6px rgba(35,31,44,0.08)' }}
    >
      {/* 3D treasure chest stands in for the old text badge — a synthetic
          pop-art ornament (no real "bonus reward" asset exists yet: a
          3d-treasure-chest.png was requested but isn't in the project, so
          this SVG stays in place with the requested crimson glow until a
          real render is provided), gold/red to match the gift box & roses. */}
      <TreasureChest size={80} className="mx-auto" style={{ filter: 'drop-shadow(0px 8px 16px rgba(208,44,58,0.35))' }} />
      {/* Sized down from text-5xl/6xl — at that size "+74%" was clipping
          against the badge's own edges in the wide-shell layout. */}
      <p
        className="font-display font-black text-4xl sm:text-5xl text-pearl-red leading-none tabular-nums mt-2"
        style={{ textShadow: '0 0 18px rgba(176,42,58,0.45), 0 0 36px rgba(176,42,58,0.22)' }}
      >
        {growth}
      </p>
      <p className="mt-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-pearl-ink">Active User Growth</p>
    </div>
  )
}

function RingBadge() {
  const pct = useCountUp('+40%')
  return (
    <div
      className="relative flex-1 rounded-2xl glass-pearl-soft border border-pearl-gold/40 p-3.5 text-center overflow-hidden"
      style={{ boxShadow: '0 10px 24px -8px rgba(176,42,58,0.28), 0 2px 6px rgba(35,31,44,0.08)' }}
    >
      {/* Real rendered 3D ring badge (gold / crimson / black), replacing
          the earlier hand-built CSS conic-gradient donut — the percentage
          sits in the ring's own transparent center hole (the ring art
          itself is centered in its square canvas, confirmed directly).
          Sized to read as the same visual weight as the chest icon next
          to it (a graphic-design "these two badges are a matched pair"
          balance), not dramatically bigger. */}
      <div className="relative mx-auto mt-0 w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
        <img src={asset('/assets/amy/pie.png')} alt="" className="absolute inset-0 w-full h-full object-contain drop-shadow-lg" />
        <p
          className="relative font-display font-black text-xl sm:text-2xl text-[#c62828] leading-none tabular-nums"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
        >
          {pct}
        </p>
      </div>
      <p className="mt-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wide text-pearl-ink">Increased Engagement</p>
    </div>
  )
}

/* ---------------------------------- Export ---------------------------------- */

export default function AmyCaseStudy({ onClose }: { onClose: () => void }) {
  const engaged = useCountUp('+60K')
  const impressions = useCountUp('+2.3M')
  const feedback = useCountUp('+85%')

  return (
    // Warm, semi-transparent pink-tinted glass — matches the approved
    // mockup's tint exactly (the internal sections below keep their own
    // px-5 sm:px-8 rhythm rather than an outer p-8, since CaseStudyHeader
    // already manages its own edge padding and doubling both would blow
    // out the spacing).
    <div className="bg-[#EFE3DD]/40 backdrop-blur-xl rounded-[32px] border border-white/80 shadow-2xl">
      <CaseStudyHeader
        id="modal-amy-title"
        stageLabel="01"
        title="Graphic Design"
        supportLabel="Character Design & 3D Pop-Art Figure"
        theme="light"
        onClose={onClose}
        arcadeChrome
        variant="minimal"
        meta={[
          { label: 'Role', value: 'Art Direction, Visual Design' },
          { label: 'Tech', value: 'Midjourney · 3D Printing Pipeline · Illustrator' },
        ]}
      />

      {/* Campaign Impact + My Role — moved from the footer to the TOP,
          collapsed into one row, per explicit request: the metrics were
          only visible after scrolling past the whole artboard below, and
          they're the numbers that matter most to a reviewer, not an
          afterthought. The "Play Case Study" CTA that used to close the
          modal here was redundant with the close button and dropped. */}
      <div className="px-5 sm:px-8 pb-3 flex flex-wrap items-center gap-x-6 gap-y-2.5 border-b border-pearl-ink/10 mb-3">
        <div className="flex items-center gap-2">
          <img src={asset('/assets/amy/arrow-amy.png')} alt="" className="w-6 h-6 object-contain shrink-0" />
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-pearl-sub whitespace-nowrap">Campaign Impact</span>
        </div>
        <StatStrip
          theme="light"
          stats={[
            { icon: <Users size={13} />, value: engaged, label: 'Engaged Users' },
            { icon: <TrendingUp size={13} />, value: impressions, label: 'Impressions' },
            { icon: <Heart size={13} />, value: feedback, label: 'Positive Feedback' },
          ]}
        />
        <div className="w-px h-6 bg-pearl-ink/15 hidden sm:block" />
        <div className="flex items-center gap-3">
          <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-pearl-sub whitespace-nowrap">My Role</span>
          <div className="flex items-center gap-3 text-pearl-sub">
            <span className="flex items-center gap-1">
              <PenTool size={14} />
              <span className="text-[9px] font-bold uppercase tracking-wide text-pearl-sub/80">Art Direction</span>
            </span>
            <span className="flex items-center gap-1">
              <Palette size={14} />
              <span className="text-[9px] font-bold uppercase tracking-wide text-pearl-sub/80">Visual Design</span>
            </span>
            <span className="flex items-center gap-1">
              <img src={asset('/assets/amy/arrow-amy.png')} alt="" className="w-3.5 h-3.5 object-contain" />
              <span className="text-[9px] font-bold uppercase tracking-wide text-pearl-sub/80">Campaign Strategy</span>
            </span>
          </div>
        </div>
      </div>

      {/* Fixed-aspect artboard, not a generic responsive grid — the
          approved mockup is one art-directed scene (card measured at
          1478x872px, ~1.695:1), and Amy/badges+before-after/phone are
          positioned as absolute zones within it at the mockup's own
          proportions (phone screen bounds were pixel-sampled directly
          from the reference file: ~72-100% width, ~9-95% height of the
          card), rather than left to CSS Grid's own column-sizing logic. */}
      <div className="px-5 sm:px-8 pb-5">
        <div className="relative w-full" style={{ aspectRatio: '1478 / 780' }}>
          <div className="absolute inset-y-0 left-0" style={{ width: '37%' }}>
            <AmyHeroFigure />
          </div>

          <div className="absolute inset-y-0 flex flex-col gap-2.5 sm:gap-3" style={{ left: '40%', width: '31%' }}>
            <div className="flex gap-2.5 sm:gap-3.5">
              <ChestBadge />
              <RingBadge />
            </div>
            <div className="flex-1 min-h-0">
              <AmyBeforeAfterPhone />
            </div>
          </div>

          <div className="absolute inset-y-0 flex flex-col items-center justify-center" style={{ left: '73%', right: '-1%' }}>
            {/* The real photographed phone (rose-gold, angled) replaces the
                hand-built PhoneMockup frame. It's one wide asset with a lot
                of transparent padding, so the outer box crops in on just
                the phone (an oversized absolutely-positioned img offset by
                negative %) rather than rendering the whole sparse canvas.
                The 27 Club grid sits in a plain 2D-rotated rectangle
                positioned over the photographed screen — NOT a 3D
                perspective transform, since that broke pointer
                hit-testing on one side last time (see git history). */}
            <div className="relative w-full" style={{ aspectRatio: '600 / 944' }}>
              <img
                src={asset('/assets/amy/amy-phones.png')}
                alt=""
                aria-hidden
                className="absolute pointer-events-none select-none"
                style={{ width: '263%', maxWidth: 'none', left: '-90%', top: '-2%' }}
              />
              {/* Rotated to match the phone's true tilt (measured from the
                  source photo's own screen edges) — this fills much closer
                  to the mockup's edge-to-edge grid than an axis-aligned box
                  can (an unrotated rect inscribed in a tilted screen is
                  geometrically much smaller). An initial hit-testing check
                  here appeared to fail on every card, but that was a false
                  alarm from a collapsed 279x242 test viewport, not the
                  rotation — re-verified clean at a real viewport size (all
                  11 cards hit-test correctly) before shipping this. */}
              {/* Re-measured directly against the source photo via a pixel
                  scan of the actual screen boundary (not the earlier
                  estimate) — the grid was sitting visibly smaller than the
                  real screen, leaving gray screen showing around its edges
                  instead of filling it. */}
              <div
                className="absolute overflow-y-auto no-scrollbar rounded-[10px]"
                style={{ left: '15.5%', top: '10%', width: '67%', height: '78%', transform: 'rotate(4.2deg)' }}
              >
                <AmyRosterGrid />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/** A music note, a gold coin and a heart-coin breaking the modal's RIGHT
 *  edge near the phone — rendered via ProjectModal's `breakout` slot,
 *  which sits outside the scroll container's clipping. There is
 *  deliberately nothing on the left edge: the mockup file was checked
 *  directly, and the only thing breaking the left side is the swallow
 *  already baked into the figure artwork (see AmyHeroFigure) — a
 *  separate floating swallow/coin/heart there would just be a second
 *  copy of decoration the mockup doesn't have. Positions here are
 *  pixel-measured from the reference file (music note ~17%, star coin
 *  ~40%, heart coin ~75% down the card), not evenly-spaced guesses. */
export function AmyCaseStudyBreakout() {
  return (
    <>
      {/* A second music note, breaking the LEFT edge near the figure's own
          baked-in note (bottom-left of the box/roses) — requested so the
          note reads as escaping the frame rather than sitting flat inside
          the artwork, the same treatment the right-edge decor already
          gets. */}
      <FloatingElement delay={0.7} distance={9} className="absolute top-[80%] -left-7 sm:-left-10 z-30 hidden sm:block">
        <MusicNote size={38} />
      </FloatingElement>
      <FloatingElement delay={0.5} distance={9} className="absolute top-[15%] -right-7 sm:-right-10 z-30 hidden sm:block">
        <MusicNote size={42} />
      </FloatingElement>
      <FloatingElement delay={0.9} distance={10} className="absolute top-[38%] -right-10 sm:-right-14 z-30 hidden sm:block">
        <GoldCoin size={60} />
      </FloatingElement>
      <FloatingElement delay={1.2} distance={9} className="absolute top-[73%] -right-10 sm:-right-14 z-30 hidden sm:block">
        <HeartIcon size={64} />
      </FloatingElement>
    </>
  )
}
