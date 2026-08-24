import { Users, Eye, ThumbsUp, PenTool, Palette, Target, Joystick } from 'lucide-react'
import CaseStudyHeader from './CaseStudyHeader'
import PhoneMockup from '../ui/PhoneMockup'
import CTAButton from '../ui/CTAButton'
import StatStrip from '../ui/StatStrip'
import FloatingElement from '../ui/FloatingElement'
import { GoldCoin, GoldSwallow, HeartIcon, MusicNote, TreasureChest } from '../ui/decor'
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
    <div className="relative overflow-visible">
      <div className="relative rounded-[24px] overflow-visible bg-gradient-to-b from-[#fdf3e8] to-[#f6ded7] border border-white shadow-pearl-sm aspect-[4/5] sm:aspect-[9/11] flex items-end justify-center px-1 pt-6">
        {/* Real character render — the box, roses, golden swallow, vinyl
            record and music note are all baked into the source artwork.
            Enlarged and allowed to spill past the panel's own edges. */}
        <img
          src={ASSETS.figure}
          alt="AMY — Amy Winehouse tribute character emerging from a gift box, with a golden swallow, roses and a vinyl record"
          className="w-[132%] max-w-none h-full max-h-[124%] object-contain drop-shadow-xl relative z-10"
        />

        {/* "27" badge — the one accent not already in the source render */}
        <div className="absolute right-[2%] bottom-[10%] w-14 h-14 rounded-full bg-gradient-to-br from-[#e2c07f] to-[#b8863b] border-2 border-white shadow-glow-gold flex flex-col items-center justify-center rotate-6 z-10">
          <span className="font-display font-black text-lg text-[#5a3a12] leading-none">27</span>
          <span className="text-[6px] font-bold text-[#5a3a12]/80 uppercase tracking-wide">Forever</span>
        </div>
      </div>

      <FloatingElement delay={1.4} distance={8} className="absolute bottom-[6%] -left-4">
        <GoldCoin size={30} />
      </FloatingElement>
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
          pop-art ornament (no real "bonus reward" asset exists), gold/red
          to match the gift box & roses. */}
      <TreasureChest size={52} className="mx-auto drop-shadow-lg" />
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
      {/* 3D metallic gold + red ring — a thicker track (the inner cutout is
          a smaller % of the outer circle than before) reads as a real
          embossed dial rather than a thin donut, layered with an outer
          drop-shadow for lift, an inset shadow on the track for a grooved
          edge, and a soft top-left specular highlight to sell a polished,
          domed metal surface. */}
      <div
        className="relative mx-auto mt-1.5 w-[4.5rem] h-[4.5rem] rounded-full flex items-center justify-center"
        style={{
          background: 'conic-gradient(from -90deg, #fff3d0 0%, #e2c07f 18%, #a3762f 40deg, #8f1f2d 40% 100%)',
          boxShadow: '0 6px 14px rgba(176,42,58,0.45), 0 2px 4px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.5), inset 0 -2px 3px rgba(0,0,0,0.25)',
        }}
      >
        {/* Specular highlight arc */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle at 32% 26%, rgba(255,255,255,0.55) 0%, transparent 45%)' }}
        />
        <div className="w-[76%] h-[76%] rounded-full bg-gradient-to-br from-[#fdf9f4] to-[#f3e8da] flex items-center justify-center shadow-inner">
          <p
            className="font-display font-black text-xl text-pearl-red leading-none tabular-nums"
            style={{ textShadow: '0 0 12px rgba(176,42,58,0.35)' }}
          >
            {pct}
          </p>
        </div>
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
    // Translucent glass panel — a soft cream tint over a real
    // backdrop-blur so the page behind genuinely shows through, matching
    // the approved dashboard mockup's glassy read rather than a flat
    // opaque card.
    <div className="bg-gradient-to-br from-[#fdfaf7]/55 via-[#faf3ee]/45 to-[#f3ecf5]/55 backdrop-blur-2xl border border-white/70 shadow-2xl rounded-[28px] sm:rounded-[32px]">
      <CaseStudyHeader
        id="modal-amy-title"
        stageLabel="01"
        title="Graphic Design"
        supportLabel="Character Design & 3D Pop-Art Figure"
        theme="light"
        onClose={onClose}
        arcadeChrome
        meta={[
          { label: 'Role', value: 'Art Direction, Visual Design' },
          { label: 'Tech', value: 'Midjourney · 3D Printing Pipeline · Illustrator' },
        ]}
      />

      {/* Dashboard grid — two main columns (left: Amy's box graphic, right:
          everything else), the right column itself split into a top row
          (the two stat circles) and a bottom row (Before/After + the 27
          Club phone, side by side) via CSS Grid rows, matching the
          approved mockup's structure exactly rather than the previous
          3-column layout. */}
      <div className="px-5 sm:px-8 pb-6">
        <div className="grid lg:grid-cols-[0.9fr_1.5fr] gap-5 sm:gap-7">
          <AmyHeroFigure />

          <div className="grid grid-rows-[auto_1fr] gap-4">
            {/* Top: the two stat circles */}
            <div className="flex gap-3.5">
              <ChestBadge />
              <RingBadge />
            </div>

            {/* Bottom: Before/After (wider) + 27 Club phone (narrower), side by side */}
            <div className="grid grid-cols-1 sm:grid-cols-[1.5fr_1fr] gap-5 items-stretch">
              <AmyBeforeAfterPhone />

              <div className="flex justify-center items-center" style={{ perspective: 1200 }}>
                {/* Tilted in 3D (perspective + rotateY/rotateX) rather than
                    presented flat-on, matching the approved mockup's
                    angled device shot. */}
                <PhoneMockup
                  label="The 27 Club — Hover or tap to flip"
                  className="!max-w-[240px] drop-shadow-2xl"
                  frameClassName="border-[#1a1a1a] [transform:rotateY(-16deg)_rotateX(4deg)] [transform-style:preserve-3d]"
                  wide
                  scroll
                >
                  <AmyRosterGrid />
                </PhoneMockup>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer bar — campaign impact, role, CTA */}
      <div className="px-5 sm:px-8 py-5 border-t border-pearl-ink/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-pearl-sub mb-1.5">Campaign Impact</p>
          <StatStrip
            theme="light"
            size="lg"
            stats={[
              { icon: <Users size={14} />, value: engaged, label: 'Engaged Users' },
              { icon: <Eye size={14} />, value: impressions, label: 'Impressions' },
              { icon: <ThumbsUp size={14} />, value: feedback, label: 'Positive Feedback' },
            ]}
          />
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-pearl-sub mb-1.5">My Role</p>
          <div className="flex items-center gap-3 text-pearl-sub">
            <span title="Art Direction"><PenTool size={16} /></span>
            <span title="Visual Design"><Palette size={16} /></span>
            <span title="Campaign Strategy"><Target size={16} /></span>
          </div>
        </div>

        <CTAButton variant="red" icon onClick={onClose} className="self-center">
          <Joystick size={13} /> Play Case Study
        </CTAButton>
      </div>
    </div>
  )
}

/** Roses, a coin and a music note breaking the whole MODAL's left/right
 *  edges (not just the hero image's) — rendered via ProjectModal's
 *  `breakout` slot, which sits outside the scroll container's clipping. */
export function AmyCaseStudyBreakout() {
  return (
    <>
      {/* Left edge: golden swallow (top), red heart (mid-low) */}
      <FloatingElement delay={0.1} distance={10} className="absolute top-[14%] -left-8 sm:-left-11 z-30 hidden sm:block">
        <GoldSwallow size={48} />
      </FloatingElement>
      <FloatingElement delay={0.9} distance={9} className="absolute top-[52%] -left-6 sm:-left-9 z-30 hidden sm:block">
        <GoldCoin size={28} />
      </FloatingElement>
      <FloatingElement delay={0.7} distance={8} className="absolute top-[72%] -left-7 sm:-left-10 z-30 hidden sm:block">
        <HeartIcon size={26} color="#c23b3b" />
      </FloatingElement>
      {/* Right edge: golden swallow (top), red heart, gold coin */}
      <FloatingElement delay={0.5} distance={11} className="absolute top-[22%] -right-8 sm:-right-11 z-30 hidden sm:block">
        <GoldSwallow size={40} />
      </FloatingElement>
      <FloatingElement delay={1.3} distance={8} className="absolute top-[48%] -right-6 sm:-right-9 z-30 hidden sm:block">
        <MusicNote size={24} color="#c9a15a" />
      </FloatingElement>
      <FloatingElement delay={1.0} distance={9} className="absolute top-[68%] -right-7 sm:-right-10 z-30 hidden sm:block">
        <HeartIcon size={24} color="#c23b3b" />
      </FloatingElement>
    </>
  )
}
