import { useState } from 'react'
import CompareSlider from '../CompareSlider'

/** The banner design's own evolution — an early black-and-white concept
 *  draft (OLD3 / concept-3.png) against the final full-color key art
 *  (hero-banner.png), two genuinely different files. This is the one
 *  comparison the dashboard shows (matching the approved mockup, which
 *  presents a single fixed Before/After panel, not a cycling carousel). */
const BEFORE_SRC = '/assets/amy/concept-3.png'
const AFTER_SRC = '/assets/amy/hero-banner.png'

/** A static Before/After comparison panel — still interactively
 *  draggable (the split itself is real), but no longer a multi-pair
 *  carousel with nav arrows. The dashboard mockup shows one fixed
 *  comparison, so that's what this renders. */
export default function AmyBeforeAfterPhone() {
  const [pos, setPos] = useState(50)

  return (
    <div className="w-full h-full flex flex-col">
      <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-pearl-sub">Before / After Restoration Pipeline</p>

      <div className="relative mt-2 flex-1">
        <div className="relative w-full h-full min-h-[140px] rounded-2xl border border-white shadow-pearl-sm overflow-hidden bg-black">
          <CompareSlider
            className="w-full h-full !rounded-none"
            accentClass="bg-pearl-gold"
            beforeLabel="Before"
            afterLabel="After"
            value={pos}
            onChange={setPos}
            before={<img src={BEFORE_SRC} alt="Early black-and-white concept draft" className="absolute inset-0 w-full h-full object-cover" />}
            after={<img src={AFTER_SRC} alt="Final full-color key art" className="absolute inset-0 w-full h-full object-cover" />}
          />
        </div>
      </div>

      <p className="text-center mt-2 text-[9.5px] text-pearl-sub/80 italic">From raw archive to iconic game-ready art.</p>
    </div>
  )
}
