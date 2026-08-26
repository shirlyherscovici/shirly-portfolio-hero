import { useEffect, useState, type RefObject } from 'react'
import { Volume2, VolumeX, Gauge, Maximize, Minimize } from 'lucide-react'

const SPEEDS = [0.5, 1, 2]

/** A small control row — mute/unmute, cycle playback speed (0.5x → 1x →
 *  2x), and fullscreen toggle — shared by every case study video so none
 *  of them ship with only a bare play/pause. Deliberately its own row
 *  (not folded into the play button) so each control stays a clear,
 *  separate hit target. */
export default function VideoControlBar({
  videoRef,
  fullscreenRef,
  className = '',
}: {
  videoRef: RefObject<HTMLVideoElement>
  /** The element to actually fullscreen — MUST be an ancestor that also
   *  contains the on-video controls (play/pause, this bar), not the bare
   *  `<video>` itself. Fullscreening the video element directly puts the
   *  browser in native video fullscreen, which only shows the video pixels
   *  — every sibling overlay (our play button, this bar) is a DOM sibling,
   *  not a descendant of the fullscreened element, so it's simply not
   *  there anymore: no way to pause without backing out of fullscreen
   *  first. Falls back to the video element only if no wrapper is passed. */
  fullscreenRef?: RefObject<HTMLElement>
  className?: string
}) {
  // Matches the <video> element's own real default (no `muted` attribute
  // set on any of these players, so it starts unmuted) — an initial state
  // of true here would make the icon lie about the actual audio state
  // until the button was pressed once.
  const [muted, setMuted] = useState(false)
  const [speedIdx, setSpeedIdx] = useState(1)
  const [fullscreen, setFullscreen] = useState(false)

  // The state above only reflects OUR button's own click — it goes stale
  // the moment the viewer exits fullscreen any other way (Escape key,
  // browser chrome, swipe on mobile). Listening to the real event keeps
  // the icon (and any layout that depends on `fullscreen`) honest.
  useEffect(() => {
    const onChange = () => setFullscreen(!!document.fullscreenElement)
    document.addEventListener('fullscreenchange', onChange)
    return () => document.removeEventListener('fullscreenchange', onChange)
  }, [])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  const cycleSpeed = () => {
    const v = videoRef.current
    if (!v) return
    const next = (speedIdx + 1) % SPEEDS.length
    v.playbackRate = SPEEDS[next]
    setSpeedIdx(next)
  }

  const toggleFullscreen = () => {
    const target = fullscreenRef?.current ?? videoRef.current
    if (!target) return
    if (!document.fullscreenElement) {
      target.requestFullscreen?.().catch(() => {})
    } else {
      document.exitFullscreen?.().catch(() => {})
    }
  }

  const btn = 'flex items-center justify-center gap-1 h-7 px-2 rounded-md bg-black/50 backdrop-blur-sm border border-white/20 text-white/85 hover:text-white hover:bg-black/70 transition-colors text-[9px] font-bold'

  return (
    <div className={`flex items-center gap-1.5 ${className}`}>
      <button type="button" onClick={toggleMute} aria-label={muted ? 'Unmute' : 'Mute'} aria-pressed={!muted} className={btn}>
        {muted ? <VolumeX size={12} /> : <Volume2 size={12} />}
      </button>
      <button type="button" onClick={cycleSpeed} aria-label={`Playback speed: ${SPEEDS[speedIdx]}x — tap to change`} className={btn}>
        <Gauge size={12} /> {SPEEDS[speedIdx]}x
      </button>
      <button type="button" onClick={toggleFullscreen} aria-label={fullscreen ? 'Exit fullscreen' : 'Fullscreen'} aria-pressed={fullscreen} className={btn}>
        {fullscreen ? <Minimize size={12} /> : <Maximize size={12} />}
      </button>
    </div>
  )
}
