import { useRef, useState } from 'react'
import { Play, Pause, Smartphone, Layers, Scissors } from 'lucide-react'
import CaseStudyHeader from './CaseStudyHeader'
import FloatingElement from '../ui/FloatingElement'
import { GoldCoin, HeartIcon, MusicNote } from '../ui/decor'
import ComputerMonitorFrame from '../ui/ComputerMonitorFrame'

const VIDEO_SRC = '/assets/motion/aca-anashim.mp4'
const POSTER_SRC = '/assets/motion/aca-anashim-poster.jpg'

const SPECS = [
  { icon: Smartphone, label: 'Responsive Format: Mobile 9:16 & Desktop 16:9' },
  { icon: Layers, label: 'Spine2D & Rigging Pipeline' },
  { icon: Scissors, label: 'Sprite Sheet Optimization' },
]

/* ------------------------------------- Export ------------------------------------- */

export default function PeopleMotionCaseStudy({ onClose }: { onClose: () => void }) {
  const [playing, setPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(() => {})
      setPlaying(true)
    } else {
      v.pause()
      setPlaying(false)
    }
  }

  return (
    <div>
      <CaseStudyHeader
        id="modal-motion-title"
        stageLabel="04"
        title="People In Motion"
        supportLabel="Playable Ad Concept & Game UI Motion"
        theme="light"
        onClose={onClose}
        meta={[
          { label: 'Role', value: 'Script, Director & Lead Motion Designer' },
          { label: 'Tech Stack', value: 'AE · Illustrator · Rigging' },
        ]}
      />

      <div className="px-5 sm:px-8 pb-6">
        <div className="relative">
          <div style={{ maxWidth: 'calc(52vh * 16 / 9)' }} className="relative mx-auto w-full">
            <ComputerMonitorFrame>
              <video
                ref={videoRef}
                src={VIDEO_SRC}
                poster={POSTER_SRC}
                playsInline
                preload="metadata"
                onEnded={() => setPlaying(false)}
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!playing && <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/5 to-black/40" />}

              {/* Glass play button overlay — the one control that starts or
                  stops playback, matching the light pearl palette. */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? 'Pause the After Effects reel' : 'Play the After Effects reel'}
                className="group absolute inset-0 flex items-center justify-center"
              >
                <span
                  className={`flex items-center justify-center rounded-full bg-white/20 backdrop-blur-md border border-white/40 shadow-pearl-lg transition-all group-hover:scale-110 group-hover:bg-white/30 ${
                    playing ? 'w-12 h-12 opacity-0 group-hover:opacity-100' : 'w-16 h-16 sm:w-20 sm:h-20'
                  }`}
                >
                  {playing ? (
                    <Pause size={20} className="text-white fill-current" />
                  ) : (
                    <Play size={24} className="text-white fill-current translate-x-0.5" />
                  )}
                </span>
              </button>
            </ComputerMonitorFrame>
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={togglePlay}
              className="group inline-flex items-center gap-2 px-6 py-3 rounded-full font-display font-bold text-xs sm:text-sm tracking-wide uppercase bg-gradient-to-b from-[#e2c07f] to-[#b8863b] text-[#2c2010] shadow-glow-gold transition-transform hover:scale-[1.04]"
            >
              {playing ? <Pause size={13} className="fill-current" /> : <Play size={13} className="fill-current" />}
              {playing ? 'Pause Reel' : 'Play Video'} <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
            </button>
          </div>
        </div>

        <div className="mt-7 flex flex-wrap gap-2.5 justify-center">
          {SPECS.map(({ icon: Icon, label }) => (
            <span key={label} className="flex items-center gap-1.5 px-3.5 py-2 rounded-full glass-pearl-soft text-[10.5px] font-semibold text-pearl-ink">
              <Icon size={13} className="text-pearl-red" />
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/** Gold coins and a music note breaking the whole MODAL's left/right edges
 *  — rendered via ProjectModal's `breakout` slot, outside the scroll
 *  container's clipping. */
export function PeopleMotionBreakout() {
  return (
    <>
      <FloatingElement delay={0.2} distance={10} className="absolute top-[18%] -left-7 sm:-left-10 z-30 hidden sm:block">
        <GoldCoin size={30} />
      </FloatingElement>
      <FloatingElement delay={1.1} distance={8} className="absolute top-[46%] -left-6 sm:-left-9 z-30 hidden sm:block">
        <MusicNote size={24} color="#b8863b" />
      </FloatingElement>
      <FloatingElement delay={0.8} distance={9} className="absolute top-[70%] -left-7 sm:-left-10 z-30 hidden sm:block">
        <HeartIcon size={26} color="#c23b3b" />
      </FloatingElement>
      <FloatingElement delay={0.6} distance={9} className="absolute top-[28%] -right-7 sm:-right-10 z-30 hidden sm:block">
        <GoldCoin size={26} />
      </FloatingElement>
      <FloatingElement delay={1.5} distance={10} className="absolute top-[55%] -right-6 sm:-right-9 z-30 hidden sm:block">
        <HeartIcon size={22} color="#c23b3b" />
      </FloatingElement>
      <FloatingElement delay={0.4} distance={8} className="absolute top-[78%] -right-7 sm:-right-10 z-30 hidden sm:block">
        <GoldCoin size={20} />
      </FloatingElement>
    </>
  )
}
