import { Users, TrendingUp, Heart, PenTool, Palette, Joystick, Target } from 'lucide-react'
import CaseStudyHeader from './CaseStudyHeader'
import CTAButton from '../ui/CTAButton'
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
      {/* Bonus-reward pill, matching the mockup's bold gold tag above the
          chest — makes the badge read as a callout, not a plain stat. */}
      <span
        className="inline-block px-2.5 py-0.5 rounded-full text-[7px] font-black uppercase tracking-widest text-white mb-1"
        style={{ background: 'linear-gradient(135deg, #c9576b, #8f1f2d)' }}
      >
        Bonus Reward
      </span>
      {/* 3D treasure chest stands in for the old text badge — a synthetic
          pop-art ornament (no real "bonus reward" asset exists yet: a
          3d-treasure-chest.png was requested but isn't in the project, so
          this SVG stays in place with the requested crimson glow until a
          real render is provided), gold/red to match the gift box & roses. */}
      <TreasureChest size={52} className="mx-auto" style={{ filter: 'drop-shadow(0px 8px 16px rgba(208,44,58,0.35))' }} />
      <p
        className="font-display font-black text-4xl text-pearl-red leading-none tabular-nums mt-1.5"
        style={{ textShadow: '0 0 18px rgba(176,42,58,0.45), 0 0 36px rgba(176,42,58,0.22)' }}
      >
        {growth}
      </p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-pearl-ink">Active User Growth</p>
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
      <span className="text-[8px] font-bold uppercase tracking-widest text-pearl-gold2">Engagement Boost</span>
      {/* Real rendered 3D ring badge (gold / crimson / black), replacing
          the earlier hand-built CSS conic-gradient donut — the percentage
          sits in the ring's own transparent center hole. */}
      <div className="relative mx-auto mt-1.5 w-[4.5rem] h-[4.5rem] flex items-center justify-center">
        <img src={asset('/assets/amy/pie.png')} alt="" className="absolute inset-0 w-full h-full object-contain drop-shadow-lg" />
        <p
          className="relative font-display font-black text-xl text-[#c62828] leading-none tabular-nums"
          style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}
        >
          {pct}
        </p>
      </div>
      <p className="mt-1.5 text-[10px] font-bold uppercase tracking-wide text-pearl-ink">Increased Engagement</p>
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
    <div className="bg-[#EFE3DD]/60 backdrop-blur-2xl rounded-[32px] border border-white/80 shadow-2xl">
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

      {/* Fixed-aspect artboard, not a generic responsive grid — the
          approved mockup is one art-directed scene (card measured at
          1478x872px, ~1.695:1), and Amy/badges+before-after/phone are
          positioned as absolute zones within it at the mockup's own
          proportions (phone screen bounds were pixel-sampled directly
          from the reference file: ~72-100% width, ~9-95% height of the
          card), rather than left to CSS Grid's own column-sizing logic. */}
      <div className="px-5 sm:px-8 pb-6">
        <div className="relative w-full" style={{ aspectRatio: '1478 / 780' }}>
          <div className="absolute inset-y-0 left-0" style={{ width: '37%' }}>
            <AmyHeroFigure />
          </div>

          <div className="absolute inset-y-0 flex flex-col gap-3 sm:gap-4" style={{ left: '40%', width: '31%' }}>
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
              <div
                className="absolute overflow-y-auto no-scrollbar rounded-[10px]"
                style={{ left: '17.2%', top: '15%', width: '61.9%', height: '72.7%', transform: 'rotate(4.1deg)' }}
              >
                <AmyRosterGrid />
              </div>
            </div>
            <p className="text-center mt-2 text-[9px] sm:text-[10px] font-semibold uppercase tracking-wide opacity-60">The 27 Club</p>
          </div>
        </div>
      </div>

      {/* Footer bar — campaign impact / my role / CTA, matching the
          approved mockup's three-part footer exactly. Icons corrected
          against the mockup: Impressions uses a trend-up chart glyph
          (was an eye), Positive Feedback uses a heart (was a thumbs-up)
          — both checked directly against the reference file. */}
      <div className="px-5 sm:px-8 py-5 border-t border-pearl-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div className="flex items-center gap-2.5">
          <Target size={18} className="text-pearl-red shrink-0" />
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-pearl-sub mb-1.5">Campaign Impact</p>
            <StatStrip
              theme="light"
              size="lg"
              stats={[
                { icon: <Users size={14} />, value: engaged, label: 'Engaged Users' },
                { icon: <TrendingUp size={14} />, value: impressions, label: 'Impressions' },
                { icon: <Heart size={14} />, value: feedback, label: 'Positive Feedback' },
              ]}
            />
          </div>
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-pearl-sub mb-1.5">My Role</p>
          {/* Each icon gets its own small caption below it, matching the
              mockup — a title-attribute tooltip alone (the previous
              version) isn't visible without hovering. */}
          <div className="flex items-start gap-4 text-pearl-sub">
            <span className="flex flex-col items-center gap-1">
              <PenTool size={16} />
              <span className="text-[7px] font-bold uppercase tracking-wide text-pearl-sub/80">Art Direction</span>
            </span>
            <span className="flex flex-col items-center gap-1">
              <Palette size={16} />
              <span className="text-[7px] font-bold uppercase tracking-wide text-pearl-sub/80">Visual Design</span>
            </span>
            <span className="flex flex-col items-center gap-1">
              <img src={asset('/assets/amy/arrow-amy.png')} alt="" className="w-4 h-4 object-contain" />
              <span className="text-[7px] font-bold uppercase tracking-wide text-pearl-sub/80 text-center">Campaign Strategy</span>
            </span>
          </div>
        </div>

        <CTAButton variant="red" icon onClick={onClose} className="self-center">
          <Joystick size={13} /> Play Case Study
        </CTAButton>
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
      <FloatingElement delay={0.5} distance={9} className="absolute top-[15%] -right-6 sm:-right-8 z-30 hidden sm:block">
        <MusicNote size={30} />
      </FloatingElement>
      <FloatingElement delay={0.9} distance={10} className="absolute top-[38%] -right-8 sm:-right-11 z-30 hidden sm:block">
        <GoldCoin size={44} />
      </FloatingElement>
      <FloatingElement delay={1.2} distance={9} className="absolute top-[73%] -right-8 sm:-right-11 z-30 hidden sm:block">
        <HeartIcon size={48} />
      </FloatingElement>
    </>
  )
}
